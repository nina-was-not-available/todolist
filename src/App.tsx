import React, {useEffect} from 'react';
import './App.css';
import TodolistList from "./components/todolist/ui/TodolistList";
import {AppBar, Button, CircularProgress, LinearProgress, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "./hooks";
import {selectStatus} from "./components/common/model/commonSelectors";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./components/login/ui/Login";
import {selectIsInit, selectIsLoggedIn} from "./components/login/model/loginSelectors";
import {loginThunks} from "./components/login/model/loginThunks";
import {ErrorSnackbar} from "./components/helpers/ErrorSnackbar";

function App()   {
    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isInitialized = useAppSelector(selectIsInit)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loginThunks.me())
    }, []);
    const onClickHandler = () => {
            dispatch(loginThunks.logout())
    }
    if (!isInitialized) {
        return <div className={'isInitialized'}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <AppBar color={'secondary'} position={"static"}>
                <Toolbar>
                    <Menu/>
                    {isLoggedIn && <Button onClick={onClickHandler}
                        color={'inherit'} sx={{p: '0 20px'}} size={"small"} >Logout</Button>}
                </Toolbar>
            </AppBar>
            <ErrorSnackbar/>
            {status === 'loading' &&  <LinearProgress color={"secondary"}/> }
            <RouterProvider router={router}/>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <TodolistList/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/404',
        element: <div>Error 404</div>
    },
    {
        path: '/*',
        element: <Navigate to={'/404'}/>
    },
])

export default App;
