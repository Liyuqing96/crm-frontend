import http from '../utils/http'

// 聊天消息
export const chatSend = (data: any) => {
  return http({
    url: '/chat',
    method: 'POST',
    data,
  })
}

export default {
  chatSend,
}
