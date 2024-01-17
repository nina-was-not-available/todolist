import {configureStore} from "@reduxjs/toolkit";
import {commonSlice} from "./components/common/model/commonSlice";
import {todolistSlice} from "./components/todolist/model/todolistSlice";
import {taskSlice} from "./components/task/model/taskSlice";
import {loginSlice} from "./components/login/model/loginSlice";

export const store  = configureStore({
    reducer: {
        commonSlice,
        todolistSlice,
        taskSlice,
        loginSlice
    }
})

