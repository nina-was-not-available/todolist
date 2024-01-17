import {createAppAsyncThunk} from "../../../hooks";
import {commonActions} from "../../common/model/commonSlice";
import {FilterValuesType, Statuses, TodolistDomainType, TodolistType} from "../../../types";
import {todolistApi} from "../api";
import {clientError, serverError} from "../../../utils/errorUtils";
import {taskThunks} from "../../task/model/taskThunks";
import {changeTodolistDomainStatus} from "./todolistSlice";

const setTodolists = createAppAsyncThunk<{
    todolists: TodolistDomainType[]
}, undefined>('todolist/setTodolists', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await todolistApi.getTodolists()
        dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
        const result = res.data.map((el: TodolistType) => ({
            ...el,
            filter: FilterValuesType.All,
            domainStatus: Statuses.IDLE
        }))
        result.forEach((el: TodolistType) => dispatch(taskThunks.setTasks({todolistId: el.id})))
        return {todolists: result}
    } catch (e) {
        const someError = serverError(e, dispatch)
        return rejectWithValue(someError)
    }
})


type changeTodolistParams = { todolistId: string, title: string }
const changeTodolist = createAppAsyncThunk<changeTodolistParams, changeTodolistParams>('todolist/changeTodolist', async (arg, {
    dispatch,
    rejectWithValue
}) => {
    try {
        dispatch(changeTodolistDomainStatus({todolistId: arg.todolistId, domainStatus: Statuses.LOADING}))
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await todolistApi.updateTodolist(arg.todolistId, arg.title)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {todolistId: arg.todolistId, title: arg.title}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError = serverError(e, dispatch)
        return rejectWithValue(someError)
    } finally {
        dispatch(changeTodolistDomainStatus({todolistId: arg.todolistId, domainStatus: Statuses.SUCCESS}))
    }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, {
    title: string
}>('todolist/addTodolist', async (arg, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await todolistApi.addTodolist(arg.title)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {todolist: res.data.data.item}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError = serverError(e, dispatch)
        return rejectWithValue(someError)
    }
})

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, {
    todolistId: string
}>('todolist/removeTodolist', async (arg, {dispatch, rejectWithValue}) => {
    try {
        dispatch(changeTodolistDomainStatus({todolistId: arg.todolistId, domainStatus: Statuses.LOADING}))
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await todolistApi.deleteTodolist(arg.todolistId)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {todolistId: arg.todolistId}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError = serverError(e, dispatch)
        return rejectWithValue(someError)
    } finally {
        dispatch(changeTodolistDomainStatus({todolistId: arg.todolistId, domainStatus: Statuses.SUCCESS}))
    }
})
export const todolistsThunks = {setTodolists, changeTodolist, addTodolist, removeTodolist}