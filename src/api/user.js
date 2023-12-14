import request from '@/utils/request'
// 登录
export const userLoginService = ({ username, password }) => {
  return request.post(
    '/user/login',
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
