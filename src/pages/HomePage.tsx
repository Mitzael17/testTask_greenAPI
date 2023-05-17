import React, {useContext} from 'react';
import {UserDataContext} from "../contexts/UserDataContext";

const HomePage = () => {

    const userData = useContext(UserDataContext);

    return (
        <div>
            <div>
                id: {userData.idInstance}
            </div>
            <div>
                token: {userData.apiTokenInstance}
            </div>
        </div>
    );
};

export default HomePage;