import axios from 'axios'

const service = axios.create({
  withCredentials: true,
  timeout: 20000,
})

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  return config
}, error => error)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response) {
      return response
    }
    // 错误拦截
    throw new Error('网络错误！')
  },
  error => {
    if (error.message.includes('timeout')) {
      throw new Error('网络连接时间过长，请刷新后再试!')
    } else {
      // throw error
      return error
    }
  },
)

export const get = (url, params = {}, config = {}) => service.get(url, { params, ...config })

export const post = (url, data = {}, config = {}) => service.post(url, data, config)

export const put = (url, data = {}, config = {}) => service.put(url, data, config)

export const del = (url, params = {}, config = {}) => service.delete(url, { params, ...config })

export default service
