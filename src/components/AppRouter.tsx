import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import RoomPage from "../pages/RoomPage";
import LoginPage from "../pages/LoginPage";
import {UserDataContext} from "../contexts/UserDataContext";
import classes from "../styles/modules/Messanger.module.scss";
import {CHATROOM_ROUTE, MAIN_ROUTE} from "../data/routes";
import ChatsDataProvider from "./Providers/ChatsDataProvider";
import Panel from "./Panel";

const AppRouter = () => {

    const userData = useContext(UserDataContext);

    return (
        <>
            { Object.keys(userData).length > 0 ?
                    <BrowserRouter>
                        <ChatsDataProvider>
                            <div className={classes.messenger}>
                                <Panel />
                                <div className={classes.content}>
                                    <Routes>
                                        <Route index element={<HomePage />} />
                                        <Route path={`${CHATROOM_ROUTE}:id`} element={<RoomPage />} />
                                        <Route
                                            path="*"
                                            element={<Navigate to={MAIN_ROUTE} />}
                                        />
                                    </Routes>
                                </div>
                            </div>
                        </ChatsDataProvider>
                    </BrowserRouter>
                :
                <BrowserRouter>
                    <Routes>
                        <Route index element={<LoginPage />} />
                        <Route
                            path="*"
                            element={<Navigate to={MAIN_ROUTE} />}
                        />
                    </Routes>
                </BrowserRouter>

            }
        </>

    );
};

export default AppRouter;