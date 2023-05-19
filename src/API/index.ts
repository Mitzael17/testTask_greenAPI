import {API_URL} from "../data/config";
import {
    ApiData,
    DeleteNotificationResponse,
    Endpoints,
    GetNotificationResponse,
    GetStateAccountResponse,
    Methods,
    SendMessageArguments, SendMessageError,
    SendMessageResponse,
    SetSettingsResponse,
    SettingsAccount
} from "../types/API";
import {UserData} from "../types/contexts";


export async function $API<T>(endpoint: Endpoints, data: ApiData): Promise<T|false> {

    const {userData, body = undefined, method = Methods.get, additionalUrlData = ''} = data;

    try {

        const result = await fetch(`${API_URL}${userData.idInstance}/${endpoint}/${userData.apiTokenInstance}${additionalUrlData}`, {
            method,
            body
        });

        return await result.json();

    } catch(e) {

        console.log(e);
        return false;

    }

}


export async function $getStatusAccount(userData: UserData): Promise<GetStateAccountResponse|false> {

    return await $API<GetStateAccountResponse>(Endpoints.getStatus, {userData})

}


export async function $sendMessage(userData: UserData, args: SendMessageArguments): Promise<SendMessageResponse|false> {

    const result: false | SendMessageResponse | SendMessageError = await $API(Endpoints.sendMessage, {userData, body: JSON.stringify(args), method: Methods.post});

    if('statusCode' in result || !result) return false;

    return result;

}


export async function $getNotification(userData: UserData): Promise<GetNotificationResponse|false> {

    return await $API(Endpoints.getNotification, {userData});

}

export async function $deleteNotification(userData: UserData, receiptId: GetNotificationResponse['receiptId']): Promise<DeleteNotificationResponse|false> {

    return await $API(Endpoints.deleteNotification, {
        additionalUrlData: `/${receiptId}`,
        method: Methods.delete,
        userData
    });

}


export async function $getSettings(userData: UserData): Promise<SettingsAccount|false> {

    return await $API(Endpoints.getSettings, {userData});

}


export async function $setSettings(userData: UserData, data: Partial<SettingsAccount>): Promise<SetSettingsResponse|false> {

    return await $API(Endpoints.setSettings, {
        userData,
        body: JSON.stringify(data),
        method: Methods.post
    })

}