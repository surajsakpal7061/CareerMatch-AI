import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_INTERVIEW_APP_API_BASE_URL || "http://localhost:5000",
    withCredentials: true
})


export async function register({ username, email, password }) {
    try {
        const res = await api.post(`/api/auth/register`, {
            username, email, password
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export async function login({ email, password }) {
    try {
        const res = await api.post("/api/auth/login", {
            email, password
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export async function logout() {
    try {

        const res = await api.get("/api/auth/logout")

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export async function getMe() {
    const res = await api.get("/api/auth/get-me")
    return res.data
}