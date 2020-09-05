import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})

// 插件导出必须作为默认导出
export default (context) =>{
    // console.log(context)
    // console.log(Object.keys(context))
    const { store, query, route, redirect } = context
    // console.log(route)
    // console.log(query)
    // console.log(store)
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        const { user } = store.state
    
        if(user && user.token){
            config.headers.Authorization = `Token ${user.token}`
        }else {
            // 未登录，访问your_feed跳登录
            if(query && query.tab === 'your_feed'){
                return redirect('/login')
            }
        }
        
        return config;
    }, function (error) {
        // Do something with request error
        console.log('error:',error)
        return Promise.reject(error);
    });
}

