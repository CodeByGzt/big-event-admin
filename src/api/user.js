import request from '@/utils/request'
// 修改密码
export const userUpdatePwdService = (data) =>
  request.patch('/user/updatePwd', data)
// 修改用户头像
export const userUpdateAvatarService = (data) =>
  request.patch(`/user/updateAvatar?avatarUrl=${data}`)

// 修改用户信息
export const userUpdateInfoService = (data) => {
  return request.put('/user/update', data)
}
// 获取登录信息
export const userGetInfoService = () => request.get('/user/userInfo')
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
