import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})

// 插件导出必须作为默认导出
export default (context) =>{
    // console.log(context)
    // console.log(Object.keys(context))
    const { store } = context
    // console.log(store)
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        const { user } = store.state
    
        if(user && user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}

