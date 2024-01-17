import React, {ChangeEvent, FC} from 'react';
import {Statuses, TaskDomainType, TaskStatuses} from "../../../types";
import {Close} from "@mui/icons-material";
import EditableSpan from "../../helpers/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import './task.css'
import {useAppDispatch} from "../../../hooks";
import {taskThunks} from "../model/taskThunks";

type TaskPT = {
    todolistId: string
    task: TaskDomainType
    disabled?: boolean
}
const Task: FC<TaskPT> = ({todolistId, task, disabled}) => {
    const dispatch = useAppDispatch()
    const changeTaskTitle = (title: string) => {
        dispatch(taskThunks.updateTask({todolistId, taskId: task.id, model: {title}}))
    }

    const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(taskThunks.updateTask({todolistId, taskId: task.id, model: {status}}))
    }

    const onRemoveHandler = () => {
        dispatch(taskThunks.removeTask({todolistId, taskId: task.id}))
    }

    return (
        <div className={task.status === TaskStatuses.Completed? 'completed' + ' ' + 'task': 'task'}>
            <div className={'taskHeader'}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                          onChange={onCheckHandler} color={"secondary"} disabled={task.domainStatus === Statuses.LOADING || disabled}/>
                <EditableSpan title={task.title} callback={changeTaskTitle} disabled={task.domainStatus === Statuses.LOADING || disabled}/>
            </div>
            <IconButton onClick={onRemoveHandler} disabled={task.domainStatus === Statuses.LOADING || disabled}>
                <Close fontSize={"small"}/>
            </IconButton>
        </div>
    );
};

export default Task;