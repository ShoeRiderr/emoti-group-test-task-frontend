import { axiosInstance } from './axiosDefaults';
import type { LoginPayload } from '@/interfaces/api/SecurityInterfaces';

export async function login(params:LoginPayload) {
    return axiosInstance.post(`/login`, params);
}

export async function logout() {
    return axiosInstance.post(`/logout`);
}
