import {commonActions} from "../components/common/model/commonSlice";
import {AppDispatch, Statuses} from "../types";
import {isAxiosError} from "axios";
import {changeTodolistDomainStatus} from "../components/todolist/model/todolistSlice";


export const clientError = (messages: string[], dispatch: AppDispatch) => {
    let someError;
    messages.length?  someError = messages[0] : someError = 'Some error...'
    dispatch(commonActions.setError({error: someError}))
    dispatch(commonActions.setStatus({status: Statuses.FAILED}))
   return someError
}

export const serverError = (e: unknown, dispatch: AppDispatch) => {
    let someError;
    isAxiosError(e)? someError = e.message : someError = (e as {message: string}).message
    dispatch(commonActions.setError({error: someError}))
    dispatch(commonActions.setStatus({status: Statuses.FAILED}))
    return someError
}