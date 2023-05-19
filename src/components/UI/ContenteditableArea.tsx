import React, {FormEvent, ForwardedRef, forwardRef, useEffect, useRef, useState} from 'react';
import classes from '../../styles/modules/UI/ContenteditableArea.module.scss'
import {ContenteditableAreaProps} from "../../types/components/UI";

const ContenteditableArea = forwardRef(({placeholder, value, setValue, className = ''}: ContenteditableAreaProps, ref: ForwardedRef<HTMLDivElement>) => {

    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const shiftIsPressed = useRef(false);

    useEffect(() => {

        if(value.length > 0 && showPlaceholder) {

            setShowPlaceholder(false);
            return;

        }

        if(value.length === 0 && !showPlaceholder) {

            setShowPlaceholder(true);
            return;

        }

    }, [value]);

    return (
        <div className={classes.container}>
            <div onKeyDown={handlerKeyDown} onKeyUp={handlerKeyUp} onInput={handlerInput} ref={ref} contentEditable={true} className={`${classes.area} ${className}`}></div>
            {showPlaceholder && <div className={classes.placeholder}>{placeholder}</div>}
        </div>
    );

    function handlerInput(event: FormEvent<HTMLDivElement>) {

        setValue(event.currentTarget.innerHTML);

    }


    function handlerKeyDown(event) {

        if(shiftIsPressed.current) return;

        if(event.code === 'ShiftLeft') {

            shiftIsPressed.current = true;
            return;

        }

        if(event.code !== 'Enter') return;

        event.preventDefault();

        const form = event.currentTarget.closest('form');

        if(form) form.dispatchEvent(new Event('submit', {bubbles: true}));

    }

    function handlerKeyUp(event) {

        if(event.code === 'ShiftLeft') shiftIsPressed.current = false;

    }

});

export default ContenteditableArea;