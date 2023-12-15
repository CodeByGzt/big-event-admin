// mouse.js
// 按照惯例，组合式函数名以“use”开头
export function useButtenState(createUserId, useId) {
  // 组合式函数可以随时更改其状态。
  if (createUserId !== useId) {
    return true
  } else {
    return false
  }
}
