import axios from 'axios';
import type { LoginPayload } from '@/interfaces/api/SecurityInterfaces';

const apiUrl = import.meta.env.VITE_API_URL;

export async function login(params:LoginPayload) {
    return axios.post(`${apiUrl}/login`, params);
}

export async function logout() {
    return axios.post(`${apiUrl}/logout`);
}
