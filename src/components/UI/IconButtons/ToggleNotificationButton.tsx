import React, {memo, useContext, useEffect, useState} from 'react';
import classes from "../../../styles/modules/UI/IconButton.module.scss";
import BellIcon from "../../Icons/BellIcon";
import {$getSettings, $setSettings} from "../../../API";
import {UserDataContext} from "../../../contexts/UserDataContext";
import Loading from "../../Loading";

const ToggleNotificationButton = memo(() => {

    const userData = useContext(UserDataContext);

    const [isEnableNotifications, setIsEnableNotifications] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let ignore = false;

        (async function() {

            const settings = await $getSettings(userData);

            if(ignore) return;

            setIsLoading(false);

            if(!settings) return;

            if(
                settings.outgoingAPIMessageWebhook === 'yes' &&
                settings.incomingWebhook === 'yes' &&
                settings.outgoingMessageWebhook === 'yes'
            ) {
                setIsEnableNotifications(true);
            }

        })();

        return () => {
            ignore = true
        };

    }, []);

    return (
        <div
            title={isEnableNotifications ? 'Отключить уведомления' : 'Включить уведомления'}
            onClick={handlerClick}
            className={`${classes.icon} ${classes.bell} ${isEnableNotifications ? classes.active : ''}`}
        >
            <BellIcon />
            { isLoading &&
                <div className={classes.loading}>
                    <Loading diameter={24} />
                </div>
            }
            <span className={classes.line}></span>
        </div>
    );

    async function handlerClick() {

        if(isLoading) return;

        setIsLoading(true);

        const value = isEnableNotifications ? 'no' : 'yes';

        const result = await $setSettings(userData, {
            outgoingAPIMessageWebhook: value,
            incomingWebhook: value,
            outgoingMessageWebhook: value
        });

        setIsLoading(false);

        if(!result || !result.saveSettings) return;

        setIsEnableNotifications(prev => !prev);

    }

});

export default ToggleNotificationButton;