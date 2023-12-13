<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const goList = () => {
  // 查看详细属性
  console.log(route, router)
}

const userStore = useUserStore()
</script>

<template>
  <div>
    App
    <button @click="goList">跳列表</button>
    {{ userStore.token }}
    <button @click="userStore.setToken('dasdwadsdhajwhdfkasfghashkd')">
      设置token
    </button>
    <button @click="userStore.setToken('')">退出</button>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<style scoped></style>
