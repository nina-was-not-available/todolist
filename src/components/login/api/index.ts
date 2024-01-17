import {instance} from "../../../instance";
import {AxiosResponseType, LoginData} from "../../../types";
type MeRes = {
    id: number
    login: string
    email: string
}


export const loginApi = {
    me() {
        return instance.get<AxiosResponseType<MeRes>>('/auth/me')
    },
    login(data: LoginData) {
        return instance.post<AxiosResponseType>('/auth/login', data)
    },
    logout() {
        return instance.delete<AxiosResponseType>('/auth/login')
    }
}