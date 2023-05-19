import React, {FormEvent, memo, useContext, useEffect, useRef, useState} from 'react';
import classes from "../styles/modules/AddNewInterlocutorMenu.module.scss";
import {header} from "../styles/modules/Header.module.scss";
import {AddNewInterlocutorMenuProps} from "../types/components";
import BackButton from "./UI/IconButtons/BackButton";
import InputOnlyNumbers from "./UI/InputOnlyNumbers";
import ContenteditableArea from "./UI/ContenteditableArea";
import Button from "./UI/Button";
import Loading from "./Loading";
import {$sendMessage} from "../API";
import {UserDataContext} from "../contexts/UserDataContext";
import {deleteHTMLTags} from "../utils/deleteHTMLTags";
import {dateToFormat} from "../utils/dateToFormat";
import {useNavigate} from "react-router-dom";
import {CHATROOM_ROUTE} from "../data/routes";
import {ChatsDataDispatchContext} from "../contexts/ChatsDataContext";
import {ChatReducerTypes} from "../types/components/Providers";

const AddNewInterlocutorMenu = memo(({isOpen, setIsOpen}: AddNewInterlocutorMenuProps) => {

    const userData = useContext(UserDataContext);
    const dispatchChats = useContext(ChatsDataDispatchContext);

    const [phone, setPhone] = useState('');

    const [messageText, setMessageText] = useState('');
    const areaRef = useRef<HTMLDivElement>(null as HTMLDivElement);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        if(error.length > 0) setError('');

    }, [phone]);

    const navigator = useNavigate();

    const isAvailableToSubmit = phone.length > 0 && messageText.length > 0 && !isLoading;

    return (
        <div className={`${classes.menu} ${isOpen ? classes.active : ''}`}>
            <div className={header}>
                <BackButton setIsOpen={setIsOpen} />
                <div className='font-600'>Новый собеседник</div>
            </div>
            <form className={classes.form} onSubmit={handlerSubmit}>
                <InputOnlyNumbers className='background-third' placeholder='Введите номер собеседника' value={phone} setValue={setPhone} />
                <ContenteditableArea value={messageText} setValue={setMessageText} className='background-third' placeholder='Введите текст сообщения' ref={areaRef} />
                <Button type='submit' disabled={!isAvailableToSubmit} className='w-100' color='grey'>
                    {isLoading ? <Loading /> : 'Отправить сообщение'}
                </Button>
                {error.length > 0 && <div className='error'>{error}</div>}
            </form>
        </div>
    );

    async function handlerSubmit(event: FormEvent) {

        event.preventDefault();

        if(!isAvailableToSubmit) return;

        setIsLoading(true);

        const chatId = `${phone}@c.us`;
        const cleanMessageText = deleteHTMLTags(messageText);

        const result = await $sendMessage(userData, {
            message: cleanMessageText,
            chatId
        })

        setIsLoading(false);

        if(!result) {

            setError('Некорректный номер!')
            return;

        }

        const message = {
            id: result.idMessage,
            text: messageText,
            date: dateToFormat(new Date(), 'Y-m-d h:i:s'),
            areYouSender: true
        };


        dispatchChats({
            type: ChatReducerTypes.addMessage,
            payload: {
                chatId: phone,
                message
            }
        });

        setPhone('');
        setMessageText('');

        areaRef.current.innerHTML = '';

        setIsOpen(false);

        navigator(CHATROOM_ROUTE + phone);


    }

});

export default AddNewInterlocutorMenu;