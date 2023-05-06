<template>
  <main class="main">
    <p>{{ data.user.name }}</p>
    <p>{{ data.user.age }}</p>
    <el-input v-model="data.user.age" placeholder=""></el-input>
    <el-button type="primary" @click="change">change</el-button>
  </main>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const data = reactive({
      user: {
        name: 'asd',
        age: 18
      }
    })
    const change = () => {
      data.user.name = 'hahah'
      data.user.age = 20
    }
    return { data, change }
  }
}
</script>
<style lang="less" scoped>
.main {
  :deep(.el-input) {
    height: 45px;
  }
}
</style>
