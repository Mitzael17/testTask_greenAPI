import {Message} from "../../index";

export const enum ChatReducerTypes {

    addMessage = 'addMessage',
    deleteChat = 'deleteChat'

}

interface ChatReducerAction<T extends ChatReducerTypes, V> {

    type: T,
    payload: V

}

export type ChatReducerActions =
    ChatReducerAction<ChatReducerTypes.addMessage, {chatId: string, message: Message}> |
    ChatReducerAction<ChatReducerTypes.deleteChat, {chatId: string}>;