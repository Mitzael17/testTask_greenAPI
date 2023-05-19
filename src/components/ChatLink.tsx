import React, {memo, useContext} from 'react';
import {NavLink} from "react-router-dom";
import classes from '../styles/modules/ChatLink.module.scss'
import {Chat} from "../types";
import {CHATROOM_ROUTE} from "../data/routes";
import {deleteHTMLTags} from "../utils/deleteHTMLTags";
import {ChatsDataDispatchContext} from "../contexts/ChatsDataContext";
import {ChatReducerTypes} from "../types/components/Providers";

const ChatLink = memo(({chat}: {chat: Chat}) => {

    const dispatchChats = useContext(ChatsDataDispatchContext);

    return (
        <NavLink to={CHATROOM_ROUTE + chat.id} className={`${classes.link} navLink`}>
            <div className={classes.container}>
                <div className={classes.title}>{chat.id}</div>
                <div className={classes.lastMessage}>{deleteHTMLTags(chat.messages.at(-1).text)}</div>
                <div onClick={handlerDeleteChat} className='deleteIcon'>
                    <span></span>
                </div>
            </div>
        </NavLink>
    );


    function handlerDeleteChat(event) {

        event.preventDefault();

        dispatchChats({
            type: ChatReducerTypes.deleteChat,
            payload: {
                chatId: chat.id
            }
        })

    }

});

export default ChatLink;