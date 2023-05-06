<template>
  <div class="my-table-container">
    <el-table
      :data="tableData"
      :border="tableSetting.border || false"
      stripe
      :rowkey="tableSetting.rowkey || 'id'"
      @selection-change="selectionChange"
    >
      <template v-for="item in columns" :key="item">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :type="item.type"
          :width="item.width"
          :align="item.align || 'center'"
          v-if="item.type === 'index' || item.type === 'selection'"
        />
        <el-table-column
          v-else-if="item.type === 'expand'"
          v-bind="item"
          v-slot="scope"
          :align="item.align || 'center'"
          :width="item.width"
        >
          <component :is="item.render" v-if="item.render" v-bind="scope"></component>
          <slot v-bind="scope" v-else></slot>
        </el-table-column>
        <tableColumn v-if="!item.type && item.prop" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </tableColumn>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"> </slot>
      </template>
      <!-- 表格无数据情况 -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <div v-if="tableSetting.isPager ?? true" class="pagination-container">
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
  </div>
</template>

<script setup>
import tableColumn from './tableColumn.vue'
import { useSelection } from '@/hooks/useSelection'
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  tableSetting: {
    type: Object,
    default: () => {}
  },
  tableData: {
    type: Object,
    default: () => {}
  },
  pageSetting: {
    type: Object,
    default: () => {}
  }
})
const { selectionChange, selectedList, isSelected, selectedListIds } = useSelection()
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
defineExpose({
  selectedList,
  isSelected,
  selectedListIds
})
</script>

<style lang="scss" scoped>
.my-table-container {
  position: relative;
  .pagination-container {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
</style>
