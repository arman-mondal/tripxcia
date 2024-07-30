import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

async function makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

export default makeRequest;