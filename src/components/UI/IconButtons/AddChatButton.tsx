import {memo} from 'react';
import classes from '../../../styles/modules/UI/IconButton.module.scss'
import {AddNewInterlocutorMenuProps} from "../../../types/components";
import UserAddIcon from "../../Icons/UserAddIcon";

const AddChatButton = memo(({setIsOpen}: Pick<AddNewInterlocutorMenuProps, 'setIsOpen'>) => {

    return (
        <div
            title='Добавить собеседника'
            onClick={() => setIsOpen(true)}
            className={classes.icon}
        >
            <UserAddIcon />
        </div>
    );

});

export default AddChatButton;