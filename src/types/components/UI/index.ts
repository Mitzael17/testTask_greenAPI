import {Dispatch,InputHTMLAttributes, SetStateAction} from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'|'type'> {

    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    type?: 'text' | 'password'

}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'|'type'> {

    setValue: Dispatch<SetStateAction<boolean>>

}