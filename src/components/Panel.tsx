import React, {useEffect, useState} from 'react';
import classes from "../styles/modules/Messanger.module.scss";
import Header from "./Header";
import ListOfChats from "./ListOfChats";
import ArrowIcon from "./Icons/ArrowIcon";
import {useLocation} from "react-router-dom";

const Panel = () => {

    // Состояние нужно только для мобильных устройств
    const [isOpenPanel, setIsOpenPanel] = useState(false);

    const location = useLocation();

    useEffect(() => {

        setIsOpenPanel(false);

    }, [location]);

    return (
        <div className={`${classes.panel} ${isOpenPanel ? classes.active : ''}`}>
            <Header />
            <ListOfChats />
            <div
                onClick={() => setIsOpenPanel(prev => !prev)}
                className={`${classes.button} ${isOpenPanel ? classes.active : ''}`}
            >
                <ArrowIcon />
            </div>
        </div>
    );
};

export default Panel;