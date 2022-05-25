import axios from 'axios';

export default async function getEstacionamiento() {
    try {
        const url = `http://127.0.0.1:8000/api/estacionamiento/`;
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getUser() {
    try {
        const url = `http://127.0.0.1:8000/user/user/`;
        const response = await axios.get(url);
        const data = response.data.reviews;
        return data;
    } catch (error) {}
}

export async function getUserExact(id) {
    try {
        const url = `http://127.0.0.1:8000/user/user/${id}`;
        const response = await axios.get(url);
        const data = response.data.review;
        console.log(data);
        return data;
    } catch (error) {}
}
