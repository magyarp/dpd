import axios from 'axios';
import { BASE_URL } from '../constants/config';

export const addPerson = (person) => {
    return axios.post(`${BASE_URL}/person/add`, person);
}

export const getPersons = (page, size) => {
    return axios.get(`${BASE_URL}/person/get?page=${page}&size=${size}`)
}

export const depersonalize = (id) => {
    return axios.put(`${BASE_URL}/person/depersonalize/id=${id}`);
}