import axios from 'axios';
import type { VacancyFilterPayload } from '@/interfaces/api/VacancyFilterPayload';

const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchVacancies(params:VacancyFilterPayload) {
    return axios.get(`${apiUrl}/api/vacancies`, {
        params: params
    })
}