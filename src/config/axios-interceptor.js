import axios from 'axios';
import { URLS } from 'services/api/api-urls';
import { UTILS } from '../utils';
import { STORAGEKEYS } from './constants';
const CancelToken = axios.CancelToken;
source = CancelToken.source();
client = axios.create({
  baseURL: URLS.base_url,
});
function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}
//Axios Interceptors
client.interceptors.request.use(
  async config => {
    // const token = await UTILS.getItem(STORAGEKEYS.token);

    config.headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    };
    // config.signal = newAbortSignal(15000),
    config.params = config.params || {};
    config.cancelToken = source.token || {};
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    console.log('I am here');
    Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => {
    console.log('RESPONSE INTERCPTOR : ', response?.status);
    return response;
  },
  async function (error) {
    console.log('INTERCEPTOR ERROR RESPONSE : ', error);
    console.log('INTERCEPTOR ERROR RESPONSE CONFIG: ', error?.config);
    // const token = await UTILS.setItem(STORAGEKEYS.token);
    const originalRequest = error.config;
    if (error?.response?.status === undefined && error?.config === undefined) {
      return Promise.reject('Hi Dude');
    } else if (error?.response?.status === 401) {
      originalRequest._retry = true;
      //await DIVIY_API.refreshToken(JSON.parse(token)?.refresh_token);
    }
    return Promise.reject(error);
  },
);
