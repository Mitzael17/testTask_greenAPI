import {memo} from 'react';
import classes from '../../../styles/modules/UI/IconButton.module.scss'
import {AddNewInterlocutorMenuProps} from "../../../types/components";
import ArrowIcon from "../../Icons/ArrowIcon";

const BackButton = memo(({setIsOpen}: Pick<AddNewInterlocutorMenuProps, 'setIsOpen'>) => {

    return (
        <div
            title='Назад'
            onClick={() => setIsOpen(false)}
            className={classes.icon}
        >
            <ArrowIcon />
        </div>
    );
});

export default BackButton;