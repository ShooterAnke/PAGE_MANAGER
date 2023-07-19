import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  let token = getToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config
}, error => {
  return Promise.reject(error);
})
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code > 1000) {
      Message({
        message: res.message || "成功",
        type: 'error',
        duration: 5000
      })
      return res;
    } else {
      Message({
        message: res.message || "失败",
        type: 'error',
        duration: 5000
      })
      return Promise.reject(new Error(res.message || "error"))
    }
  }, error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5000
    })
    return Promise.reject(error)
  }
)
export default service