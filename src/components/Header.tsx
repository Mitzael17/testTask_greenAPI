import {memo, useContext, useState} from 'react';
import {UserDataContext} from "../contexts/UserDataContext";
import classes from '../styles/modules/Header.module.scss'
import LogoutButton from "./UI/IconButtons/LogoutButton";
import AddChatButton from "./UI/IconButtons/AddChatButton";
import AddNewInterlocutorMenu from "./AddNewInterlocutorMenu";
import ToggleNotificationButton from "./UI/IconButtons/ToggleNotificationButton";

const Header = memo(() => {

    const {idInstance} = useContext(UserDataContext);

    const [isOpenAddNewInterlocutorMenu, setIsOpenAddNewInterlocutorMenu] = useState(false);

    return (
        <header className={classes.header}>
            <div>Id: {idInstance}</div>
            <div className={classes.bar}>
                <AddChatButton setIsOpen={setIsOpenAddNewInterlocutorMenu} />
                <ToggleNotificationButton />
                <LogoutButton />
            </div>
            <AddNewInterlocutorMenu isOpen={isOpenAddNewInterlocutorMenu} setIsOpen={setIsOpenAddNewInterlocutorMenu} />
        </header>
    );
});

export default Header;