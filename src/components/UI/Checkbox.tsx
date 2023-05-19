import React, {memo} from 'react';
import {CheckboxProps} from "../../types/components/UI";
import classes from '../../styles/modules/UI/Checkbox.module.scss'

const Checkbox = memo(({setValue, className, placeholder, ...props}: CheckboxProps) => {
    return (
        <label className={`${className} ${classes.checkbox}`}>
            <input
                {...props}
                type="checkbox"
                onChange={(event) => setValue(event.target.checked)}
            />
            <span className={classes.box}>
                <span></span>
            </span>
            {placeholder}
        </label>
    );
});

export default Checkbox;