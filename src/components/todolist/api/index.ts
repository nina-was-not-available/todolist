import {instance} from "../../../instance";
import {AxiosResponseType, TaskType} from "../../../types";

export const todolistApi = {
    getTodolists() {
        return instance.get('/todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<AxiosResponseType<{item: TaskType}>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<AxiosResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<AxiosResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}