import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import UserDataProvider from "./components/Providers/UserDataProvider";
import {rewriteChats} from "./utils/chats";

const App = () => {

    // Устанавливает правильный vh, для корректной работы в google mobile
    useEffect(() => {

        const resize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };

    }, []);

    return (
        <UserDataProvider>
            <AppRouter />
        </UserDataProvider>
    );
};

export default App;