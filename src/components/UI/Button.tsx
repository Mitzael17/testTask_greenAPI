import {memo} from 'react';
import classes from '../../styles/modules/UI/Button.module.scss'
import {ButtonProps} from "../../types/components/UI";

const Button = memo(({children, className, type = 'button', color = 'white', ...props}: ButtonProps) => {

    const classesColor = {
        white: classes.white,
        green: classes.green,
        grey: classes.grey,
    }

    return (
        <button className={`${className} ${classes.button} ${classesColor[color]}`} type={type}{...props}>
            {children}
        </button>
    );
});

export default Button;