import { messageChat } from "../components/chatMessage";
import { formLogin, loginRes } from "../page/login";
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

    async function LoginByGoogle (data: loginRes) {
        const resp = await fetch(`${BASE_URL}/auth/google/callback`, {
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

        return respJson;
    }

    async function validateToken() {
        const resp = await fetch(`${BASE_URL}/auth/verify-token`, {
            credentials: "include"
        })

        if (!resp.ok) {
            throw new Error("token invalid");
        }

        return resp.json()
    }

    async function SignOut() {
        const resp = await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })

        if (!resp.ok) {
            throw new Error("error during sign out");
        }
    }

    async function SendChat(data: messageChat) {
        const resp = await fetch(`${BASE_URL}/chat/gpt`, {
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

        return respJson
    }

    async function profileChat() {
        const resp = await fetch(`${BASE_URL}/chat/chat-profile`, {
            credentials: "include"
        })

        if (!resp.ok) {
            throw new Error("something is wrong");
        }

        return resp.json()
    }

    async function fetchChatById(idProfile: string) {
        const resp = await fetch(`${BASE_URL}/chat/gpt/${idProfile}`, {
            credentials: "include"
        })

        if (!resp.ok) {
            throw new Error("something is wrong");
        }

        return resp.json()
    }


    return{
        Register,
        validateToken,
        Login,
        SignOut,
        LoginByGoogle,
        SendChat,
        profileChat,
        fetchChatById
    }
})()

export default api;