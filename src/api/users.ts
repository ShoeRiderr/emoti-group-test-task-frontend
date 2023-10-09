import axios from 'axios';
import type { LoginPayload } from '@/interfaces/api/SecurityInterfaces';

const apiUrl = import.meta.env.VITE_API_URL;
const userToken = localStorage.getItem("userToken");

export async function getUser(id: Number) {
    return axios.get(`${apiUrl}/api/users/${id}`, {
        headers: {
            'X-API-TOKEN': userToken
        }
    });
}
