import {FormEvent, ForwardedRef, KeyboardEvent, forwardRef, useEffect, useRef, useState} from 'react';
import classes from '../../styles/modules/UI/ContenteditableArea.module.scss'
import {ContenteditableAreaProps} from "../../types/components/UI";

const ContenteditableArea = forwardRef(({placeholder, value, setValue, className = ''}: ContenteditableAreaProps, ref: ForwardedRef<HTMLDivElement>) => {

    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const isPressedShift = useRef(false);

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
            <div
                onKeyDown={handlerKeyDown}
                onKeyUp={handlerKeyUp}
                onInput={handlerInput}
                ref={ref}
                contentEditable={true}
                className={`${classes.area} ${className}`}
            ></div>
            { showPlaceholder &&
                <div className={classes.placeholder}>{placeholder}</div>
            }
        </div>
    );

    function handlerInput(event: FormEvent<HTMLDivElement>) {

        setValue(event.currentTarget.innerHTML);

    }

    // Shift + Enter = Перенос строки
    // Enter = Отправка формы
    function handlerKeyDown(event: KeyboardEvent) {

        if(isPressedShift.current) return;

        if(event.code === 'ShiftLeft') {

            isPressedShift.current = true;
            return;

        }

        if(event.code !== 'Enter') return;

        event.preventDefault();

        const form = event.currentTarget.closest('form');

        if(form) form.dispatchEvent(new Event('submit', {bubbles: true}));

    }

    function handlerKeyUp(event: KeyboardEvent) {

        if(event.code === 'ShiftLeft') isPressedShift.current = false;

    }

});

export default ContenteditableArea;