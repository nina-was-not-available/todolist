import React, {FC} from 'react';
import {FilterValuesType, Statuses, TaskStatuses} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectTasks} from "../../task/model/taskSelectors";
import Task from "../../task/ui/Task";
import EditableSpan from "../../helpers/EditableSpan";
import {todolistsThunks} from "../model/todolistThunks";
import {Button, IconButton, Paper} from "@mui/material";
import {Delete} from "@mui/icons-material";
import AddItemForm from "../../helpers/AddItemForm";
import './todolist.css'
import {taskThunks} from "../../task/model/taskThunks";
import {changeFilter} from "../model/todolistSlice";
import {selectStatus} from "../../common/model/commonSelectors";


type TodolistPT = {
    id: string
    title: string
    filter: FilterValuesType
    domainStatus: Statuses
}
const Todolist: FC<TodolistPT> = ({id, filter, title, domainStatus}) => {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)[id]
    const changeTodolistTitle = (title: string) => {
        dispatch(todolistsThunks.changeTodolist({todolistId: id, title}))
    }

    const removeTodolist = () => {
        dispatch(todolistsThunks.removeTodolist({todolistId: id}))
    }

    const addTask = async (title: string) => {
        dispatch(taskThunks.addTask({todolistId: id, title}))
    }

    const changeFilterHandler = (filter: FilterValuesType) => {
        dispatch(changeFilter({todolistId: id, filter}))
    }

    let allTasks = tasks
    if (filter === FilterValuesType.Active) {
        allTasks = tasks.filter(el => el.status === TaskStatuses.New)
    }
    if (filter === FilterValuesType.Completed) {
        allTasks = tasks.filter(el => el.status === TaskStatuses.Completed)
    }

    const buttonDrawer = (currentFilter: FilterValuesType, name: string) => {
        return (
            <Button onClick={() => changeFilterHandler(currentFilter)}
                    variant={currentFilter === filter ? 'contained' : 'outlined'} color={'secondary'}>{name}</Button>
        )
    }

    return (
        <div className={'todolist'}>
            <Paper sx={{p: '20px'}}>
                <div className={'todolistHeader'}>
                    <EditableSpan title={title} callback={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist} disabled={domainStatus === Statuses.LOADING}>
                        <Delete/>
                    </IconButton>
                </div>
                <AddItemForm callback={addTask} disabled={domainStatus === Statuses.LOADING}/>
                {   !allTasks.length?
                    <div className={'noTasks'}>No tasks 🦄</div>
                    :allTasks.map(el => {
                    return <Task todolistId={id} task={el} key={el.id} disabled={domainStatus === Statuses.LOADING}/>
                })}
                <div className={'buttonGroup'}>
                    {buttonDrawer(FilterValuesType.All, 'All')}
                    {buttonDrawer(FilterValuesType.Active, 'Active')}
                    {buttonDrawer(FilterValuesType.Completed, 'Completed')}
                </div>
            </Paper>
        </div>
    );
};

export default Todolist;