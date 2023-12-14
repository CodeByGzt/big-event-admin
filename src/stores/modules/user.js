import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const user = ref({})
    const setUser = (obj) => (user.value = obj) // 设置 token
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data
    }
    return { token, setToken, getUser, user, setUser }
  },
  { persist: true }
)
