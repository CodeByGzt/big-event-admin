<script setup>
import { ref } from 'vue'
import { articleGetCategoryService } from '@/api/article'
defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  isEdit: {
    type: Boolean,
    default: true
  }
})
defineEmits(['update:categoryId'])
const categoryList = ref([])
const getCategoryList = async () => {
  categoryList.value = (await articleGetCategoryService()).data
}
getCategoryList()
</script>
<template>
  <el-select
    size="small"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <el-option label="全部" :value="0" selected v-show="!isEdit" />
    <el-option
      v-for="item in categoryList"
      :key="item.id"
      :label="item.categoryName"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
