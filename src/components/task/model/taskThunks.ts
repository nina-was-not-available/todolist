import {createAppAsyncThunk} from "../../../hooks";
import {commonActions} from "../../common/model/commonSlice";
import {Statuses, TaskDomainType, TaskType} from "../../../types";
import {taskApi} from "../api";
import {clientError, serverError} from "../../../utils/errorUtils";
import {changeTaskDomainStatus} from "./taskSlice";

const setTasks = createAppAsyncThunk<{tasks: TaskType[], todolistId: string}, {todolistId: string}>('tasks/setTasks', async (arg, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await taskApi.getTasks(arg.todolistId)
        dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
        return {tasks: res.data.items, todolistId: arg.todolistId}
    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    }
})

const addTask = createAppAsyncThunk<{task: TaskType, todolistId: string}, {todolistId: string, title: string}>('task/addTask', async (arg, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await taskApi.addTask(arg.todolistId, arg.title)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {task: res.data.data.item, todolistId: arg.todolistId}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }

    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    }
})

type UpdateType = {todolistId: string, taskId: string, model: Partial<TaskDomainType>}
const updateTask = createAppAsyncThunk<UpdateType, UpdateType>('task/updateTask', async (arg, {dispatch, rejectWithValue, getState}) => {
    const myTask = getState().taskSlice[arg.todolistId].find(el => el.id === arg.taskId)
    if (!myTask) return rejectWithValue(null)
    const model: Partial<TaskDomainType> = {...myTask, ...arg.model}
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        dispatch(changeTaskDomainStatus({todolistId: arg.todolistId, taskId: arg.taskId, domainStatus: Statuses.LOADING}))
        let res = await taskApi.updateTask(arg.todolistId, arg.taskId, model)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {todolistId: arg.todolistId, taskId: arg.taskId, model}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    } finally {
        dispatch(changeTaskDomainStatus({todolistId: arg.todolistId, taskId: arg.taskId, domainStatus: Statuses.SUCCESS}))
    }
})

type RemoveTaskType = {todolistId: string, taskId: string}
const removeTask = createAppAsyncThunk<RemoveTaskType, RemoveTaskType>('task/removeTask', async (arg, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        dispatch(changeTaskDomainStatus({todolistId: arg.todolistId, taskId: arg.taskId, domainStatus: Statuses.LOADING}))
        let res = await taskApi.deleteTask(arg.todolistId, arg.taskId)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {todolistId: arg.todolistId, taskId: arg.taskId}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    } finally {
        dispatch(changeTaskDomainStatus({todolistId: arg.todolistId, taskId: arg.taskId, domainStatus: Statuses.SUCCESS}))
    }
})

export const taskThunks = {setTasks, addTask, updateTask, removeTask}