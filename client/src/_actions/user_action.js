import axios from "axios";
import {
    LOGIN_USER
} from "./type";

export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}