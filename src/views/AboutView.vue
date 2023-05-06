<template>
  <div class="about">
    <h1 class="count">{{ fullName }}</h1>
    <h1>{{ data.name }}</h1>
    <h1>{{ data.age }}</h1>
    <el-button type="primary" @click="func">click</el-button>
    <el-button type="primary" @click="increment">increment</el-button>
    <el-button type="primary" @click="change">change</el-button>
  </div>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
const store = useCounterStore()
const { count, doubleCount, user } = storeToRefs(store)
let countCopy = ref(0)
let data = reactive({
  name: 'asd'
})
const { increment } = store
const fullName = computed(() => data.name + 'lll')
onMounted(() => {
  console.log(count)
})
const func = () => {
  data.age = {
    age: '18'
  }
}
const change = () => {
  data.age.age = '20'
}
onUnmounted(() => {
  console.log('unmounted')
})
</script>
<style scoped lang="less">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    font-size: 38px;
    .count {
      font-weight: 700;
    }
  }
}
.about {
  :deep(.el-button) {
    height: 40px;
  }
}
</style>
