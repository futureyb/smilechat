//对axios进行二次封装,将刚才下载好的axios导入进来
import axios from "axios";
const ip = "http://192.168.10.105:3001"
//2. 利用axios对象的方法create,去创建一个axios实例
//requests就是axios,只不过稍微配置一下
import userStore from "../store/user"
let user_store = userStore()
const api = axios.create({
    //基础路径
    baseURL: ip, // 所有请求的公共地址部分
    timeout: 600000 // 请求超时时间,这里的意思是当请求时间超过5秒还未取得结果时,提示用户请求超时
})


// 请求拦截处理 请求拦截 在请求拦截中可以补充请求相关的配置
// interceptors axios的拦截器对象
api.interceptors.request.use((respone) => {
    if(user_store.token != ''){
        respone.headers["authorization"] = user_store.token
    }
    return respone 
}, (error) => {
    return error
})


//响应拦截处理  响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
api.interceptors.response.use(
    (config) => {
        return config.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)



//最后一步 暴露出去实例导出
export default api