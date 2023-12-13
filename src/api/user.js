import request from '@/utils/request'
// 注册
export const userRegisterService = ({ username, password }) => {
  return request.post(
    '/user/register',
    {
      username,
      password
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
