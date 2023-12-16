import request from '@/utils/request'

// 上传图片
export const uploadImgService = (file) =>
  request.post(
    '/upload',
    {
      file
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
// 修改文章
export const articleUpdateArticleService = (data) =>
  request.put('/article', data)
// 新增文章
export const artPublishService = (data) => request.post('/article', data)
// 删除文章
export const deleteArticleService = (id) => request.delete(`/article?id=${id}`)
// 获取文章信息（分页）
export const articleAllService = (queryItem, queryPage) =>
  request.get('/article', {
    params: {
      pageNum: queryPage.pageNum,
      pageSize: queryPage.pageSize,
      categoryId: queryItem.categoryId,
      state: queryItem.state
    }
  })
// 删除文章分类
export const articleDeleteCategoryService = (id) =>
  request.delete(`/category?id=${id}`)
// 修改文章分类
export const articleUpdateCategoryService = (
  categoryId,
  categoryName,
  categoryAlias
) =>
  request.put('/category', {
    id: categoryId,
    categoryName,
    categoryAlias
  })
// 添加文章分类
export const articleAddCategoryService = (categoryName, categoryAlias) =>
  request.post('/category', {
    categoryName,
    categoryAlias
  })
// 获取分类信息
export const articleGetCategoryService = () => request.get('/category')
