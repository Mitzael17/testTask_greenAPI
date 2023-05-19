import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import UserDataProvider from "./components/Providers/UserDataProvider";

const App = () => {

    // Устанавливает правильный vh для корректной работы в google mobile
    useEffect(() => {

        const handlerResize = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        handlerResize();

        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };

    }, []);

    return (
        <UserDataProvider>
            <AppRouter />
        </UserDataProvider>
    );
};

export default App;