<script setup>
import { ref } from 'vue'
import SelectState from './SelectState.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// articleUpdateArticleService
import {
  artPublishService,
  articleUpdateArticleService,
  uploadImgService
} from '@/api/article'
// 抽屉
const emit = defineEmits(['refresh'])
const drawer = ref(false)
const handleClose = async () => {
  /*   await ElMessageBox.confirm('是否保存文章？', '编辑文章', {
    confirmButtonText: '保存',
    cancelButtonText: '取消'
  })
    .then(() => {})
    .catch(() => {
      // catch error
    }) */
  drawer.value = false
}
const defaultForm = {
  title: '',
  categoryId: '',
  coverImg: '',
  content: '',
  state: ''
}
const uploadImg = ref()
const formModel = ref({ ...defaultForm })
const editorRef = ref()
const open = async (row) => {
  drawer.value = true
  if (row.id) {
    formModel.value = { ...row }
  } else {
    if (editorRef.value != undefined) {
      editorRef.value.setHTML('')
    }

    formModel.value = { ...defaultForm }
  }
}
const onUploadFile = (uploadFile) => {
  uploadImg.value = uploadFile.raw
  formModel.value.coverImg = URL.createObjectURL(uploadFile.raw)
}
const articlePublish = async (state) => {
  formModel.value.state = state
  if (uploadImg.value !== undefined) {
    const res = await uploadImgService(uploadImg.value)
    formModel.value.coverImg = res.data
    uploadImg.value = undefined
  }
  if (!formModel.value.id) {
    await artPublishService(formModel.value)
    ElMessage({
      type: 'success',
      message: '新增成功'
    })
    emit('refresh', 'add')
  } else {
    await articleUpdateArticleService(formModel.value)
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    emit('refresh', 'update')
  }
  drawer.value = false
}
defineExpose({
  open
})
</script>
<template>
  <el-drawer
    v-model="drawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    :before-close="handleClose"
    size="40%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px" size="small">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <SelectState
          v-model="formModel.categoryId"
          style="width: 100%"
          isEdit="true"
        ></SelectState>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"
        ><el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img
            v-if="formModel.coverImg"
            :src="formModel.coverImg"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"
            ><Plus
          /></el-icon> </el-upload
      ></el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
            ref="editorRef"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="articlePublish('已发布')"
          >发布</el-button
        >
        <el-button type="info" @click="articlePublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 100px;
      height: 100px;
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
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
