import {AppDispatch, AppRootState} from "../types";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState,
    dispatch: AppDispatch,
    rejectValue: null | string
}>()