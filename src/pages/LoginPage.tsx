import React, {useContext, useState} from 'react';
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Checkbox from "../components/UI/Checkbox";
import {setCookie} from "../utils/cookie";
import {UserDataChangeContext} from "../contexts/UserDataContext";

const LoginPage = () => {

    const setUserData = useContext(UserDataChangeContext);

    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [saveUser, setSaveUser] = useState(false);

    const isAvailableToSubmit = idInstance.length > 0 && apiTokenInstance.length > 0;

    return (
        <form className='authForm' action="#" onSubmit={handlerSubmit}>
            <div className="authForm__title">
                <h1>Авторизация</h1>
            </div>
            <div className='authForm__main'>
                <Input
                    placeholder='Введите ваш IdInstance'
                    onInput={event => (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.replace(/\D/g, '')}
                    value={idInstance} setValue={setIdInstance}
                />
                <Input
                    value={apiTokenInstance}
                    setValue={setApiTokenInstance}
                    placeholder='Введите ваш ApiTokenInstance'
                />
                <div className='flex flex-a-c flex-j-sb gap-10px flex-wrap'>
                    <div className="flex flex-a-c gap-15px">
                        <Button disabled={!isAvailableToSubmit} type='submit'>Войти</Button>
                        <a className='link' href='https://green-api.com/' target='_blank'>Нету аккаунта?</a>
                    </div>
                    <Checkbox setValue={setSaveUser} placeholder='Запомнить меня' />
                </div>
            </div>
        </form>
    );

    function handlerSubmit(event) {

        event.preventDefault();

        if(saveUser) {

            const cookieValue = JSON.stringify({
                idInstance,
                apiTokenInstance
            });

            setCookie('userData', cookieValue, {"max-age": 31536000});

        }

        setUserData({
            idInstance: +idInstance,
            apiTokenInstance
        });

    }

};

export default LoginPage;