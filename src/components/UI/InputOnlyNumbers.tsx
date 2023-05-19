import React, {useCallback} from 'react';
import Input from "./Input";
import {InputProps} from "../../types/components/UI";

const InputOnlyNumbers = (props: InputProps) => {

    const handlerInput = useCallback((event) => {

        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');

    }, []);

    return (
        <Input {...props} onInput={handlerInput} />
    );
};

export default InputOnlyNumbers;