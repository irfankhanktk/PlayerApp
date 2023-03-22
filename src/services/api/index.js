
import { UTILS } from '../../utils'
import { URLS } from 'services/api/api-urls';
import axios from 'axios';
export const postData = async (url, data) => {
    console.log('url: ', url);
    console.log('data: ', data);
    const response = await client.post(url, data);
    return response?.data;
};
export const deleteData = async (url, payload) => {
    console.log('url: ', url);
    const response = await client.delete(url, { data: payload });
    return response;
};
export const putData = async (url, data) => {
    console.log('url: ', url);
    const response = await client.put(url, data);
    return response;
};
export const postFormData = async (url, data) => {
    console.log('url==>', url);
    console.log('data==>', data);
    data = UTILS.getFormData(data);
    return (axios.post(URLS.base_url + url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res).catch(err => { throw err }));
};
export const getData = async url => {
    console.log('url: ', url);
    const response = await client.get(url);
    return response?.data;
};

