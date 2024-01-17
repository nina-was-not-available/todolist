import {createAppAsyncThunk} from "../../../hooks";
import {commonActions} from "../../common/model/commonSlice";
import {LoginData, Statuses} from "../../../types";
import {loginApi} from "../api";
import {isInitialized} from "./loginSlice";
import {clientError, serverError} from "../../../utils/errorUtils";
import {clearData} from "../../todolist/model/todolistSlice";

const me = createAppAsyncThunk<{isLoggedIn: boolean}, undefined>('login/me', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await loginApi.me()
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {isLoggedIn: true}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    } finally {
        dispatch(isInitialized({isInit: true}))
    }
})

const login = createAppAsyncThunk<{isLoggedIn: boolean}, {data: LoginData}>('login/login', async (arg, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await loginApi.login(arg.data)
        if (res.data.resultCode === 0) {
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {isLoggedIn: true}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    }
})

const logout = createAppAsyncThunk<{isLoggedIn: boolean}, undefined>('login/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(commonActions.setStatus({status: Statuses.LOADING}))
        let res = await loginApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(clearData())
            dispatch(commonActions.setStatus({status: Statuses.SUCCESS}))
            return {isLoggedIn: false}
        } else {
            const someError = clientError(res.data.messages, dispatch)
            return rejectWithValue(someError)
        }
    } catch (e) {
        const someError =  serverError(e, dispatch)
        return rejectWithValue(someError)
    }
})

export const loginThunks = {me, login, logout}