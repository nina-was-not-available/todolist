import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': 'b98cd8a1-a83d-4bd6-af2a-f206517dd2d9'
    }
})