import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface ApiService {
    axios: AxiosInstance
}

class ApiService {
    constructor() {
        this.axios = axios.create({ baseURL: process.env.NEXT_PUBLIC_MAIN_API_URL })
    }

    request(url: string, method: string, options: AxiosRequestConfig) {
        const tempUserSession = window.sessionStorage.getItem("temp-user-session")

        const optionsWithHeaders: AxiosRequestConfig = { ...options, headers: { "Authorization": "Bearer " + tempUserSession } }

        console.log('process.env.MAIN_API_URL', process.env.NEXT_PUBLIC_MAIN_API_URL)
        return this.axios({ url, method, ...optionsWithHeaders })
    }

    post(url: string, options: AxiosRequestConfig = {}) {
        return this.request(url, "post", options,)
    }
}

export default new ApiService

