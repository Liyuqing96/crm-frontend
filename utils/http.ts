import request from './request'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义请求配置接口
interface HttpRequestConfig extends AxiosRequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'get' | 'post' | 'put' | 'delete' | 'patch'
  data?: Record<string, unknown>
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

// 统一的请求方法
const http = async <T = unknown>(config: HttpRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse = await request({
      ...config,
      method: config.method?.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    })
    return response as T
  } catch (error) {
    throw error
  }
}

// 封装 GET 请求
http.get = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request.get(url, { params, ...config })
}

// 封装 POST 请求
http.post = <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request.post(url, data, config)
}

// 封装 PUT 请求
http.put = <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request.put(url, data, config)
}

// 封装 DELETE 请求
http.delete = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request.delete(url, { params, ...config })
}

// 封装 PATCH 请求
http.patch = <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return request.patch(url, data, config)
}

export default http
