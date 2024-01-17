import {instance} from "../../../instance";
import {AxiosResponseType, TaskDomainType, TaskType} from "../../../types";

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<AxiosResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<AxiosResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: Partial<TaskDomainType>) {
        return instance.put<AxiosResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}