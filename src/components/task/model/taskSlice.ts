import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Statuses, TaskStateType} from "../../../types";
import {todolistsThunks} from "../../todolist/model/todolistThunks";
import {taskThunks} from "./taskThunks";
import {clearData} from "../../todolist/model/todolistSlice";

const slice = createSlice({
    name: 'task',
    initialState: {} as TaskStateType,
    reducers: {
        changeTaskDomainStatus: (state, action: PayloadAction<{todolistId: string, taskId: string, domainStatus: Statuses}>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = {...tasks[index], domainStatus: action.payload.domainStatus}
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(todolistsThunks.setTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(el => {
                state[el.id] = []
            })
        })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(taskThunks.setTasks.fulfilled, (state, action) => {
                action.payload.tasks.forEach(el => {
                    state[action.payload.todolistId] = action.payload.tasks.map(el => ({
                        ...el,
                        domainStatus: Statuses.IDLE
                    }))
                })
            })
            .addCase(taskThunks.addTask.fulfilled, (state, action) => {
                state[action.payload.todolistId].unshift({...action.payload.task, domainStatus: Statuses.IDLE})
            })
            .addCase(taskThunks.updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]

                const index = tasks.findIndex(el => el.id === action.payload.taskId)
                if (index!== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
            .addCase(taskThunks.removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(el => el.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(clearData, () => {
                return {}
            })
    }
})

export const taskSlice = slice.reducer
export const {changeTaskDomainStatus} = slice.actions
