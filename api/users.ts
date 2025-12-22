import http from '../utils/http'

// 获取用户列表
export const getUserList = () => {
  return http.get('/users', {})
}

export default {
  getUserList,
}
