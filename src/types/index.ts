import {store} from "../store";

export enum Statuses {
    LOADING = 'loading',
    IDLE = 'idle',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskDomainType = TaskType & {
    domainStatus: Statuses
}

export type TaskStateType = {
    [key: string] : TaskDomainType[]
}

export enum FilterValuesType {
    All, Active, Completed
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    domainStatus: Statuses
}
export type AxiosResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

export type LoginData = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch