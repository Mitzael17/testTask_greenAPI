import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import RoomPage from "../pages/RoomPage";
import LoginPage from "../pages/LoginPage";
import {UserDataContext} from "../contexts/UserDataContext";

const AppRouter = () => {

    const userData = useContext(UserDataContext);

    return (
        <>
            { Object.keys(userData).length > 0 ?
                <>
                    <BrowserRouter>
                        Hello
                        <Routes>
                            <Route index element={<HomePage />} />
                            <Route path='/chat/:id' element={<RoomPage />} />
                            <Route
                                path="*"
                                element={<Navigate to="/" />}
                            />
                        </Routes>
                    </BrowserRouter>
                </>
                :
                <LoginPage />
            }
        </>

    );
};

export default AppRouter;