<script setup>
import {
  articleGetCategoryService,
  articleDeleteCategoryService
} from '@/api/article'
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useButtenState } from '@/mixins/buttonState'
const userStore = useUserStore()
const dialog = ref()
const categoryList = ref([])
const loading = ref(false)
const getCategoryList = async () => {
  loading.value = true
  categoryList.value = (await articleGetCategoryService()).data
  loading.value = false
}
getCategoryList()
const addCategory = () => {
  dialog.value.open({})
}
const handleEdit = (row) => {
  dialog.value.open(row)
}
const handleDelete = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await articleDeleteCategoryService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getCategoryList()
}
</script>
<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addCategory">新增分类</el-button>
    </template>
    <el-table :data="categoryList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="categoryName" label="分类名" />
      <el-table-column prop="categoryAlias" label="分类别名" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="编辑"
            placement="top"
          >
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="handleEdit(scope.row)"
              :disabled="
                useButtenState(scope.row.createUser, userStore.user.id)
              "
          /></el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="handleDelete(scope.row)"
              :disabled="
                useButtenState(scope.row.createUser, userStore.user.id)
              "
          /></el-tooltip> </template
      ></el-table-column>
      <template #empty>
        <template>
          <el-empty description="暂无数据" />
        </template>
      </template>
    </el-table>
    <ArticleCategoryEdit
      ref="dialog"
      @refresh="getCategoryList"
    ></ArticleCategoryEdit>
  </PageContainer>
</template>
