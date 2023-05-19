import {UserData} from "../contexts";

export const enum Endpoints {

    getStatus = 'getStateInstance',
    sendMessage = 'SendMessage',
    getNotification = 'ReceiveNotification',
    deleteNotification = 'DeleteNotification',
    getSettings = 'GetSettings',
    setSettings = 'SetSettings',

}

export enum Methods {

    post = 'POST',
    get = 'GET',
    delete = 'DELETE'

}

export interface ApiData {

    method?: Methods,
    userData: UserData,
    body?: string,
    url?: string,
    additionalUrlData?: string

}

export interface GetStateAccountResponse {

    stateInstance: 'authorized'|'notAuthorized'

}

export interface SendMessageArguments {

    chatId: string,
    message: string,
    quotedMessageId?: string,
    archiveChat?: boolean,
    linkPreview?: boolean

}


export interface SendMessageResponse {

    idMessage: string

}

export interface SendMessageError {

    message: string,
    path: string,
    statusCode: number,
    timestamp: string

}


export interface GetNotificationResponse {

    receiptId: number,
    body: NotificationBody

}


interface NotificationBody {

    typeWebhook: string,
    instanceData: {
        idInstance: number,
        wid: string,
        typeInstance: string,
    },
    timestamp: number,
    idMessage: string,
    senderData: {
        chatId: string,
        sender: string,
        senderName: string,
    },
    messageData: {
        typeMessage: string,
        textMessageData: {
            textMessage: string
        }
    }

}


export interface DeleteNotificationResponse {

    result: boolean

}


export interface SettingsAccount {

    wid: string,
    countryInstance: string,
    typeAccount: 'trial'|'production'|'vip',
    webhookUrlToken: string,
    delaySendMessagesMillisecond: number,
    markIncomingMessagesReaded: 'yes'|'no',
    markIncomingMessagesReadedOnReply: 'yes'|'no',
    outgoingWebhook: 'yes'|'no',
    outgoingMessageWebhook: 'yes'|'no',
    stateWebhook: 'yes'|'no',
    incomingWebhook: 'yes'|'no',
    deviceWebhook: 'yes'|'no',
    statusInstanceWebhook: 'yes'|'no',
    outgoingAPIMessageWebhook: 'yes'|'no',
    sendFromUTC: string,
    sendToUTC: string,


}


export interface SetSettingsResponse {

    saveSettings: boolean

}