import {Chat, Message} from "../types";
import {UserData} from "../types/contexts";

export function getChats(idInstance: UserData['idInstance']): Chat[] {

    return JSON.parse(localStorage.getItem(`chats_${idInstance}`) || '[]');

}

export function addMessage(idInstance: UserData['idInstance'], id: Chat['id'], message: Message) {

    const chats = getChats(idInstance);

    let indexChat = chats.findIndex( (chat) => chat.id === id);

    // Создаем новый чат
    if(indexChat === -1) {

        chats.unshift({id, messages: []});
        indexChat = 0;

    }

    // Не добавляем сообщение, если сообщение с таким же id уже существует
    if( chats[indexChat].messages.find( ({id}) => id === message.id ) !== undefined ) return false;

    chats[indexChat].messages.push(message);

    rewriteChats(idInstance, [chats[indexChat], ...chats.filter( (_, index) => index !== indexChat)]);

    return true;

}

export function deleteChat(idInstance: UserData['idInstance'], id: Chat['id']): void {

    const chats = getChats(idInstance);

    rewriteChats(idInstance, chats.filter( chat => chat.id !== id));

}

export function rewriteChats(idInstance: UserData['idInstance'], chats: Chat[]): void {

    localStorage.setItem(`chats_${idInstance}`, JSON.stringify(chats));

}
