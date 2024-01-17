import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectTodolists} from "../model/todolistSelectors";
import Todolist from "./Todolist";
import {todolistsThunks} from "../model/todolistThunks";
import './todolist.css'
import {Paper} from "@mui/material";
import AddItemForm from "../../helpers/AddItemForm";
import {selectIsLoggedIn} from "../../login/model/loginSelectors";
import {Navigate} from "react-router-dom";

const TodolistList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)

    useEffect(() => {
        dispatch(todolistsThunks.setTodolists())
    }, []);


    const addTodolist = async (title: string) => {
        dispatch(todolistsThunks.addTodolist({title}))
    }
    if (!isLoggedIn) return <Navigate to={'/login'}/>
    return (
        <div className={'todolistPage'}>
            <div className={'addTodolist'}>
                <AddItemForm callback={addTodolist}/>
            </div>
            <div className={'todolistList'}>

                {todolists.map(el => {
                    return <Todolist id={el.id} title={el.title} filter={el.filter} domainStatus={el.domainStatus} key={el.id}/>
                })}
            </div>
        </div>
    );
};

export default TodolistList;