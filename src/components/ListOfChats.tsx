import {memo, useContext, useMemo, useState} from 'react';
import classes from '../styles/modules/ListOfChats.module.scss'
import ChatLink from "./ChatLink";
import {ChatsDataContext} from "../contexts/ChatsDataContext";
import InputOnlyNumbers from "./UI/InputOnlyNumbers";

const ListOfChats = memo(() => {

    const chats = useContext(ChatsDataContext);

    const [search, setSearch] = useState('');

    const filteredChats = useMemo(() => {

        return chats.filter( chat => chat.id.match(search.trim()));

    }, [search, chats]);


    return (
        <div className={classes.container}>
            <div className={classes.searchContainer}>
                <InputOnlyNumbers className='background-third' value={search} setValue={setSearch} placeholder='Поиск чата' />
                { search.length > 0 &&
                    <div onClick={() => setSearch('')} className={` ${classes.deleteIcon} deleteIcon`}>
                        <span></span>
                    </div>
                }
            </div>
            <div className={classes.list}>
                {filteredChats.map(chat => (
                    <ChatLink chat={chat} key={chat.id} />
                ))}
            </div>
        </div>
    );

});

export default ListOfChats;