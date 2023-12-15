<script setup>
import { ref, watch } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import SelectState from '@/components/SelectState.vue'
import { articleAllService, deleteArticleService } from '@/api/article'
import { useButtenState } from '@/mixins/buttonState'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const articleList = ref([])
const queryItem = ref({
  categoryId: 0,
  state: '全部'
})
const queryPage = ref({
  pageNum: 1,
  pageSize: 5
})

const totalPage = ref(0)
const getArticleList = async () => {
  const res = await articleAllService(queryItem.value, queryPage.value)
  totalPage.value = Number(res.data.total)
  articleList.value = res.data.items
}

watch(
  queryPage,
  () => {
    getArticleList()
  },
  { immediate: true, deep: true }
)
const handleReset = () => {
  queryItem.value = {
    categoryId: 0,
    state: '全部'
  }
  getArticleList()
}
const onEditArticle = (row) => {
  console.log(row.id)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('您确认删除这篇文章吗？', '删除文章', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
    center: true
  })
    .then(async () => {
      await deleteArticleService(row.id)
      getArticleList()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'success',
        message: '取消删除'
      })
    })
}
</script>
<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary">新增文章</el-button>
    </template>
    <!-- 条件查询框 -->
    <el-form inline>
      <el-form-item label="文章分类：" size="small">
        <SelectState v-model="queryItem.categoryId"></SelectState>
      </el-form-item>
      <el-form-item label="发布状态：" size="small">
        <el-select size="small" v-model="queryItem.state">
          <el-option label="全部" value="全部" />
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain size="small" @click="getArticleList"
          >搜索</el-button
        >
        <el-button plain size="small" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" size="small">
      <el-table-column label="文章标题" width="250" align="left">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="" label="文章封面" align="center">
        <template #default="{ row }">
          <el-image
            style="width: 50px; height: 50px"
            :fit="fill"
            :src="row.coverImg"
          />
        </template>
      </el-table-column>
      <el-table-column prop="categoryId" label="分类" align="center" />
      <el-table-column prop="state" label="文章状态" align="center" />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
        align="center"
      />
      <el-table-column label="操作" width="100" align="center">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
            :disabled="useButtenState(row.createUser, userStore.user.id)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
            :disabled="useButtenState(row.createUser, userStore.user.id)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="queryPage.pageNum"
      v-model:page-size="queryPage.pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :small="true"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    />
  </PageContainer>
</template>
<style scoped>
.el-pagination {
  margin-top: 10px;
  margin-left: 55%;
}
</style>
