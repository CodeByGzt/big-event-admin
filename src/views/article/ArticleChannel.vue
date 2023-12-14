<script setup>
import { articleGetCategoryService } from '@/api/article'
import { ref } from 'vue'
const categoryList = ref([])
const getCategoryList = async () => {
  categoryList.value = (await articleGetCategoryService()).data
}
getCategoryList()
console.log(categoryList)
</script>
<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary">新增分类</el-button>
    </template>
    <div>dddddddddddddddd</div>
    <div>dddddddddddddddd</div>
    <div>dddddddddddddddd</div>
    <div>dddddddddddddddd</div>
    <div>dddddddddddddddd</div>
  </PageContainer>
</template>
