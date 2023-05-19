import {createContext} from "react";
import {Chat} from "../types";
import {ChatReducerActions} from "../types/components/Providers";

export const ChatsDataContext = createContext<Chat[]>([]);
export const ChatsDataDispatchContext = createContext({} as (value: ChatReducerActions) => void);
