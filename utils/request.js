import axios from 'axios'
const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})
export default request

// 请求拦截器
// request.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     config.headers.Authorization = `Token `
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });