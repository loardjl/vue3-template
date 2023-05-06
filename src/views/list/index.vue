<template>
  <el-card shadow="hover" :style="{ width: '80vw' }">
    <div>
      <el-form :model="formData" ref="formRef">
        <myTable
          :columns="columns"
          :tableSetting="tableSetting"
          :tableData="formData.tableData"
          :pageSetting="pageSetting"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
          ref="tableRef"
        ></myTable>
      </el-form>
      <el-button type="primary" size="default" @click="validate">提交</el-button>
      <el-input v-model="inputValue" placeholder="请输入" v-myInput:num clearable></el-input>
      <div class="fs-text">
        <p>暗杀开始大豪科技</p>
      </div>
      <div class="grid-content">
        <div class="one">
          <div class="item"></div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="jsx">
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { useList } from './uselist'
import { ElMessage } from 'element-plus'
const formRef = ref()
const tableRef = ref()
const { proxy } = getCurrentInstance()
const formData = reactive({
  tableData: []
})
const pageSetting = reactive({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
onMounted(() => {
  getTableData()
})
const { columns, tableSetting } = useList(formData, proxy)
const getTableData = () => {
  const data = [
    {
      id: '1',
      username: '张三',
      idCard: '123456789012345678',
      email: '',
      address: '北京市海淀区'
    },
    {
      id: '2',
      username: '李四',
      idCard: '123456789012345678',
      email: '',
      address: '北京市海淀区'
    },
    {
      id: '3',
      username: '王五',
      idCard: '123456789012345678',
      email: '',
      address: '北京市海淀区'
    },
    {
      id: '4',
      username: '赵六',
      idCard: '123456789012345678',
      email: '',
      address: '北京市海淀区'
    },
    {
      id: '5',
      username: '田七',
      idCard: '123456789012345678',
      email: '',
      address: '北京市海淀区'
    }
  ]
  formData.tableData = data
}
const currentChange = val => {
  pageSetting.pageNum = val
  getTableData()
}
const sizeChange = val => {
  pageSetting.pageSize = val
  getTableData()
}
const validate = () => {
  const field = []
  const list = tableRef.value.selectedList
  if (!list.length) {
    ElMessage.error('请至少选择一条数据')
    return
  }
  formData.tableData.map((d, index) => {
    list.map(v => {
      if (d.id === v.id) {
        field.push(`tableData.${index}.username`)
      }
    })
  })
  formRef.value.validateField(field, valid => {
    if (valid) {
      ElMessage.success('校验通过')
    } else {
      ElMessage.error('校验失败')
    }
  })
}
const inputValue = ref('')
defineExpose({
  formRef,
  tableRef
})
</script>
<style lang="scss" scoped>
.fs-text {
  width: 10vw;
  container: change / inline-size;
  transition: all 1s ease-in-out;
  font-size: 12px;
}
@container change (min-width: 120px) {
  p {
    color: red;
    font-size: 20px;
  }
}
.grid-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  & > div:nth-child(n) {
    background-color: #eee;
    border-radius: 0.31rem;
    padding: 0.63rem;
  }
  .one {
    .item {
      background-color: red;
      height: 100%;
    }
  }
}
</style>
