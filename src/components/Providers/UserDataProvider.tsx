import {ProviderProps, useState} from 'react';
import {UserData} from "../../types/contexts";
import {UserDataChangeContext, UserDataContext} from "../../contexts/UserDataContext";
import {getCookie} from "../../utils/cookie";

const UserDataProvider = ({children}: Pick<ProviderProps<UserData>, 'children'>) => {

    const [userData, setUserData] = useState<UserData>(() => {

        const cookie = getCookie('userData');

        if(cookie === undefined) return {} as UserData;

        return JSON.parse(cookie);

    });

    return (
        <UserDataContext.Provider value={userData}>
            <UserDataChangeContext.Provider value={setUserData}>
                {children}
            </UserDataChangeContext.Provider>
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;