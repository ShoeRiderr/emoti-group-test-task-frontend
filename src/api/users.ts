import { axiosInstance } from './axiosDefaults';

export async function getUser(id: Number, apiToken: string) {
    return axiosInstance.get(`/api/users/${id}`, {
        headers: {
            'X-API-TOKEN': apiToken
        }
    });
}
