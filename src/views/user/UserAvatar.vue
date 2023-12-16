<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { uploadImgService } from '@/api/article'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()

const imgUrl = ref(userStore.user.userPic)
const onUploadFile = (file) => {
  uploadImg.value = file.raw
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const uploadRef = ref()
const uploadImg = ref()
const uploadAvatar = async () => {
  const res = await uploadImgService(uploadImg.value)
  imgUrl.value = res.data
  await userUpdateAvatarService(imgUrl.value)
  userStore.getUser()
  ElMessage({ type: 'success', message: '上传成功' })
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button
          @click="uploadRef.$el.querySelector('input').click()"
          type="primary"
          :icon="Plus"
          size="large"
          >选择图片</el-button
        >
        <el-button
          type="success"
          :icon="Upload"
          size="large"
          @click="uploadAvatar"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-colosr-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
