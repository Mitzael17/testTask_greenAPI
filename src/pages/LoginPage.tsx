import {FormEvent, useContext, useEffect, useState} from 'react';
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Checkbox from "../components/UI/Checkbox";
import {setCookie} from "../utils/cookie";
import {UserDataChangeContext} from "../contexts/UserDataContext";
import {$getStatusAccount} from "../API";
import Loading from "../components/Loading";
import InputOnlyNumbers from "../components/UI/InputOnlyNumbers";

const LoginPage = () => {

    const setUserData = useContext(UserDataChangeContext);

    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const [saveUser, setSaveUser] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isAvailableToSubmit = idInstance.length > 0 && apiTokenInstance.length > 0 && !isLoading;

    useEffect(() => {

        if(error.length > 0) setError('');

    }, [idInstance, apiTokenInstance]);

    return (
        <form className='authForm' onSubmit={handlerSubmit}>
            <div className="authForm__title">
                <h1>Авторизация</h1>
            </div>
            <div className='authForm__main'>
                <InputOnlyNumbers
                    placeholder='Введите ваш IdInstance'
                    value={idInstance}
                    setValue={setIdInstance}
                />
                <Input
                    value={apiTokenInstance}
                    setValue={setApiTokenInstance}
                    placeholder='Введите ваш ApiTokenInstance'
                />
                { error.length > 0 &&
                    <div className='error'>{error}</div>
                }
                <div className='flex flex-a-c flex-j-sb gap-10px flex-wrap'>
                    <div className="flex flex-a-c gap-15px">
                        <Button disabled={!isAvailableToSubmit} type='submit'>
                            {isLoading ? <Loading /> : 'Войти'}
                        </Button>
                        <a className='link' href='https://green-api.com/' target='_blank'>Нету аккаунта?</a>
                    </div>
                    <Checkbox setValue={setSaveUser} placeholder='Запомнить меня' />
                </div>
            </div>
        </form>
    );

    async function handlerSubmit(event: FormEvent) {

        event.preventDefault();

        setIsLoading(true);

        const result = await $getStatusAccount({idInstance: +idInstance, apiTokenInstance});

        setIsLoading(false);

        if(result === false) {

            setError('Аккаунт не был найден!');
            return;

        }

        if(result.stateInstance === 'notAuthorized') {

            setError('Данный аккаунт не авторизирован!');
            return false;

        }

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