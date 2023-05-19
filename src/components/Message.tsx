import React, {memo} from 'react';
import {Message as MessageType} from "../types";
import classes from "../styles/modules/Message.module.scss";


const Message = memo(({message}: {message: MessageType}) => {
    return (
        <div className={`${classes.message} ${message.areYouSender ? classes.my : ''}`}>
            <div dangerouslySetInnerHTML={{__html: message.text}}></div>
            <div className={classes.time}>
                {message.date.slice(-8).replace(/:\d+$/, '')}
            </div>
        </div>
    );
});

export default Message;