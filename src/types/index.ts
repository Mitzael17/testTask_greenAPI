import {SendMessageResponse} from "./API";

export interface Chat {

    id: string,
    messages: Message[]

}


export interface Message {

    id: SendMessageResponse['idMessage'],
    text: string,
    areYouSender: boolean,
    date: string

}