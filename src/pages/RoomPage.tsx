import {FormEvent, useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {UserDataContext} from "../contexts/UserDataContext";
import {MAIN_ROUTE} from "../data/routes";
import headerClasses from '../styles/modules/Header.module.scss';
import ContenteditableArea from "../components/UI/ContenteditableArea";
import Button from "../components/UI/Button";
import {deleteHTMLTags} from "../utils/deleteHTMLTags";
import {$sendMessage} from "../API";
import {dateToFormat} from "../utils/dateToFormat";
import {Message as MessageType} from "../types";
import {ChatsDataDispatchContext, ChatsDataContext} from "../contexts/ChatsDataContext";
import {ChatReducerTypes} from "../types/components/Providers";
import Loading from "../components/Loading";
import Message from "../components/Message";
import backgroundImage from "../assets/background-chat.png"

const RoomPage = () => {

    const userData = useContext(UserDataContext);

    const chats = useContext(ChatsDataContext);
    const dispatchChats = useContext(ChatsDataDispatchContext);

    const {id} = useParams();
    const navigator = useNavigate();

    const chat = chats.find( chat => chat.id === id);

    const [messageText, setMessageText] = useState('');

    const areaRef = useRef<HTMLDivElement>({} as HTMLDivElement);
    const chatRef = useRef<HTMLDivElement>({} as HTMLDivElement);

    const [isLoading, setIsLoading] = useState(false);

    const isAvailableToSubmit = messageText.length > 0 && !isLoading;


    useEffect( () => {

        if(!chatRef.current) return;

        chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;

    }, [id]);


    useEffect(() => {

        if(chat === undefined) {

            navigator(MAIN_ROUTE);
            return;

        }

        if(!chatRef.current) return;

        if(chatRef.current.scrollTop > chatRef.current.scrollHeight - chatRef.current.clientHeight - 150) {

            chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;

        }

    }, [chats]);

    return (
        <div className='roomPage' style={{backgroundImage: `url('${backgroundImage}')`}}>
            <div className={`${headerClasses.header} roomPage__header`}>
                Номер собеседника: {id}
            </div>
            <div className='roomPage__content' ref={chatRef}>
                {chat?.messages.map( message => (
                    <Message message={message} key={message.id} />
                ))}
            </div>
            <form onSubmit={handlerSubmit} className='roomPage__form background-third'>
                <ContenteditableArea
                    value={messageText}
                    setValue={setMessageText}
                    placeholder='Введите текст сообщения'
                    ref={areaRef}
                />
                <Button
                    color='green'
                    disabled={!isAvailableToSubmit}
                    type='submit'
                >
                    {isLoading ? <Loading /> : 'Отправить'}
                </Button>
            </form>
        </div>
    );

    async function handlerSubmit(event: FormEvent) {

        event.preventDefault();

        if(!isAvailableToSubmit || id === undefined || chat === undefined) return;

        setIsLoading(true);

        const chatId = `${id}@c.us`;
        const cleanMessageText = deleteHTMLTags(messageText);

        const result = await $sendMessage(userData, {
            message: cleanMessageText,
            chatId
        })

        setIsLoading(false);

        if(result === false) {

            console.log('error');
            return;

        }

        const message: MessageType = {
            id: result.idMessage,
            text: messageText,
            date: dateToFormat(new Date(), 'Y-m-d h:i:s'),
            areYouSender: true
        };

        dispatchChats({
            type: ChatReducerTypes.addMessage,
            payload: {
                chatId: chat.id,
                message
            }
        });

        areaRef.current.innerHTML = '';
        setMessageText('');

    }


};

export default RoomPage;