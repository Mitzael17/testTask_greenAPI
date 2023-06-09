import {
    ProviderProps,
    useContext,
    useEffect,
    useReducer
} from 'react';
import {addMessage, deleteChat, getChats} from "../../utils/chats";
import {UserDataContext} from "../../contexts/UserDataContext";
import {ChatsDataDispatchContext, ChatsDataContext} from "../../contexts/ChatsDataContext";
import {Chat, Message} from "../../types";
import {ChatReducerActions, ChatReducerTypes} from "../../types/components/Providers";
import {$deleteNotification, $getNotification} from "../../API";
import {dateToFormat} from "../../utils/dateToFormat";

const ChatsDataProvider = ({children}: Pick<ProviderProps<Chat[]>, 'children'>) => {

    const userData = useContext(UserDataContext);

    const [chats, dispatchChats] = useReducer(chatsReducer, getChats(userData.idInstance));

    useEffect( () => {

        let ignore = false;

        const interval = setInterval(async () => {

            if(ignore) return;

            ignore = true;

            const notification = await $getNotification(userData);

            if(!notification) {

                ignore = false;
                return;

            }

            // Игнорируем все оповещения, кроме текстовых сообщений
            if(!(notification.body?.messageData?.typeMessage === 'textMessage')) {

                await $deleteNotification(userData, notification.receiptId);

                ignore = false;
                return;

            }

            const message: Message = {
                id: notification.body.idMessage,
                areYouSender: false,
                date: dateToFormat(new Date(notification.body.timestamp * 1000), 'Y-m-d h:i:s'),
                text: notification.body.messageData.textMessageData.textMessage.replace(/\n/g, '<br>')
            }

            // Для данного чата, chatId - это только номер
            const chatId = notification.body.senderData.chatId.substring(0, notification.body.senderData.chatId.indexOf('@'));

            dispatchChats({
                type: ChatReducerTypes.addMessage,
                payload: {
                    chatId,
                    message
                }
            })

            await $deleteNotification(userData, notification.receiptId);

            ignore = false;

        },1000);

        return () => clearInterval(interval);

    }, []);


    return (
        <ChatsDataContext.Provider value={chats}>
            <ChatsDataDispatchContext.Provider value={dispatchChats}>
                {children}
            </ChatsDataDispatchContext.Provider>
        </ChatsDataContext.Provider>
    );


    function chatsReducer(state: Chat[], action: ChatReducerActions): Chat[] {

        switch (action.type) {

            case ChatReducerTypes.addMessage: {

                const {chatId, message} = action.payload;
                const indexChat = state.findIndex( chat => chat.id === chatId);

                // Проверяем есть ли данное сообщение в localstorage и текущем state.
                if(
                    !addMessage(userData.idInstance, chatId, message) &&
                    state[indexChat]?.messages.find( ({id}) => message.id === id )
                ) {

                    return state;

                }

                // Создаем новый чат
                if(indexChat === -1) {

                    return [{id: chatId, messages: [message]}, ...state];

                }


                const newState = [...state];

                newState[indexChat] = {
                    ...state[indexChat],
                    messages: [...state[indexChat].messages, message]
                };


                return [newState[indexChat], ...newState.filter( (_, index) => index !== indexChat)];

            }

            case ChatReducerTypes.deleteChat: {

                const {chatId} = action.payload;

                deleteChat(userData.idInstance, chatId);

                return state.filter( chat => chat.id !== chatId);

            }

            default: {

                return state;

            }


        }

    }

};

export default ChatsDataProvider;