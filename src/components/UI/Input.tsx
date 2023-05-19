import {memo} from 'react';
import classes from '../../styles/modules/UI/Input.module.scss'
import {InputProps} from "../../types/components/UI";

const Input = memo(({setValue, className, type = 'text', ...props}: InputProps) => {
    return (
        <input
            {...props}
            type={type}
            className={`${className} ${classes.input}`}
            onChange={(event) => setValue(event.target.value)}
        />
    );
});

export default Input;