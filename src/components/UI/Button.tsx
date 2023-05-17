import React, {ButtonHTMLAttributes, memo} from 'react';
import classes from '../../styles/modules/UI/Button.module.scss'

const Button = memo(({children, type = 'button', className, ...props}: ButtonHTMLAttributes<string>) => {
    return (
        <button
            className={`${className} ${classes.button}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;