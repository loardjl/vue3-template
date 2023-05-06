<template>
  <div class="pagination-container">
    <el-pagination
      :page-size="pageSetting.pageSize"
      :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
      class="pagination-self"
      :layout="pageSetting.layout || 'total, sizes, prev, pager, next, jumper'"
      :total="pageSetting.total"
      :current-page="pageSetting.pageNum"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script setup>
defineProps({
  pageSetting: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['sizeChange', 'currentChange'])
/**
 * @description 每页条数改变
 * @param {Number} val 当前条数
 * @return void
 * */
const handleSizeChange = val => {
  emit('sizeChange', val)
}

/**
 * @description 当前页改变
 * @param {Number} val 当前页
 * @return void
 * */
const handleCurrentChange = val => {
  emit('currentChange', val)
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>
