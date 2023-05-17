import {createContext, Dispatch, SetStateAction} from "react";
import {UserData} from "../types/contexts";

export const UserDataContext = createContext({} as UserData);

export const UserDataChangeContext = createContext({} as Dispatch<SetStateAction<UserData>>);