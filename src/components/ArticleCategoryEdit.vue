<script setup>
import { ref } from 'vue'
import {
  articleAddCategoryService,
  articleUpdateCategoryService
} from '@/api/article.js'
const emit = defineEmits(['refresh'])
const dialogVisible = ref(false)
const cateFormRef = ref()
const open = async (row) => {
  cateForm.value.cateId = row.id
  cateForm.value.cateName = row.categoryName
  cateForm.value.cateAlias = row.categoryAlias
  dialogVisible.value = true
}
const cateForm = ref({
  cateName: '',
  cateAlias: '',
  cateId: ''
})
const rules = {
  cateName: [
    { required: true, message: '请输入文章分类名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  cateAlias: [
    { required: true, message: '请输入文章分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
const editCategory = async () => {
  await cateFormRef.value.validate()
  if (!cateForm.value.cateId) {
    await articleAddCategoryService(
      cateForm.value.cateName,
      cateForm.value.cateAlias
    )
    ElMessage.success('添加成功！')
  } else {
    await articleUpdateCategoryService(
      cateForm.value.cateId,
      cateForm.value.cateName,
      cateForm.value.cateAlias
    )
    ElMessage.success('修改成功！')
  }
  dialogVisible.value = false
  emit('refresh')
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="cateForm.cateId ? '修改分类' : '新增分类'"
    width="30%"
  >
    <!-- <span>This is a message</span> -->
    <el-form
      ref="cateFormRef"
      :model="cateForm"
      status-icon
      label-position="right"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="分类名" prop="cateName">
        <el-input v-model="cateForm.cateName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cateAlias">
        <el-input v-model="cateForm.cateAlias" type="text" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editCategory"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
