import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterValuesType, Statuses, TodolistDomainType} from "../../../types";
import {todolistsThunks} from "./todolistThunks";

const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistDomainType[],
    reducers: {
        clearData: () => {
            return []
        },
        changeFilter: (state, action: PayloadAction<{todolistId: string, filter: FilterValuesType}>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index !== -1) {
                state[index] = {...state[index], filter: action.payload.filter}
            }
        },
        changeTodolistDomainStatus: (state, action: PayloadAction<{todolistId: string, domainStatus: Statuses}>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index !== -1) {
                state[index] = {...state[index], domainStatus: action.payload.domainStatus}
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(todolistsThunks.setTodolists.fulfilled, (state, action) => {
            return action.payload.todolists
        })
            .addCase(todolistsThunks.changeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todolistId)
                if (index !== -1) {
                    state[index] = {...state[index], title: action.payload.title}
                }
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: FilterValuesType.All, domainStatus: Statuses.IDLE})
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
    }
})
export const {clearData, changeFilter, changeTodolistDomainStatus} = slice.actions
export const todolistSlice = slice.reducer