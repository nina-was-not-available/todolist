import {AppRootState} from "../../../types";
import {ErrorSnackbar} from "../../helpers/ErrorSnackbar";

export const selectStatus = (state: AppRootState) => state.commonSlice.status
export const selectError = (state: AppRootState) => state.commonSlice.error