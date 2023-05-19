import {FormEvent, memo} from 'react';
import Input from "./Input";
import {InputProps} from "../../types/components/UI";

const InputOnlyNumbers = memo((props: InputProps) => {


    return (
        <Input {...props} onInput={handlerInput} />
    );

    function handlerInput(event: FormEvent<HTMLInputElement>) {

        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');

    }

});

export default InputOnlyNumbers;