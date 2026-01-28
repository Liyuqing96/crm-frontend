import http from '../utils/http'

// 获取用户列表
export const getUserList = (data: any) => {
  return http({
    url: '/users',
    method: 'GET',
    params: data,
  })
}

export default {
  getUserList,
}
