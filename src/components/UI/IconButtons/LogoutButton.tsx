import React, {memo, useContext} from 'react';
import {UserDataChangeContext} from "../../../contexts/UserDataContext";
import {UserData} from "../../../types/contexts";
import {deleteCookie} from "../../../utils/cookie";
import classes from '../../../styles/modules/UI/IconButton.module.scss'
import DoorIcon from "../../Icons/DoorIcon";



const LogoutButton = memo(() => {

    const setUserData = useContext(UserDataChangeContext);

    return (
        <div
            title='Выйти'
            onClick={handlerClick}
            className={`${classes.icon} ${classes.logout}`}
        >
            <DoorIcon />
        </div>
    );

    function handlerClick() {

        deleteCookie('userData');
        setUserData({} as UserData);

    }

});

export default LogoutButton;