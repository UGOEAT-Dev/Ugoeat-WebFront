import axios from "axios";
import {config} from "../config.jsx";

const instance = axios.create({
    headers: { ...config.axios.headers },
    baseURL: config.LARAVEL_BACKEND_URL
})

export default instance