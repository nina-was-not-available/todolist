import {AppRootState} from "../../../types";
export const selectIsInit = (state: AppRootState) => state.loginSlice.isInit
export const selectIsLoggedIn  = (state: AppRootState) => state.loginSlice.isLoggedIn