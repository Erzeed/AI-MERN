import { formLogin } from "../page/login";
import { formRegister } from "../page/register";

const api = (() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    async function Register(data: formRegister) {
        const resp = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const respJson = await resp.json()

        if (!resp.ok) {
            throw new Error(respJson.message);
        }
    }

    async function Login (data: formLogin) {
        const resp = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const respJson = await resp.json()

        if (!resp.ok) {
            throw new Error(respJson.message);
        }
    }

    async function validateToken() {
        const resp = await fetch(`${BASE_URL}/api/auth/verify-token`, {
            credentials: "include"
        })

        if (!resp.ok) {
            throw new Error("token invalid");
        }

        return resp.json()
    }

    async function SignOut() {
        const resp = await fetch(`${BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        })

        if (!resp.ok) {
            throw new Error("error during sign out");
        }
    }


    return{
        Register,
        validateToken,
        Login,
        SignOut
    }
})()

export default api;