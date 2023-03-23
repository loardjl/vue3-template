<template>
  <div class="about">
    <h1 class="count">{{ count }}</h1>
    <h1>{{ doubleCount }}</h1>
    <el-button type="primary" @click="increment">click</el-button>
  </div>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { increment } = store
onMounted(() => {
  console.log(count)
})
const func = value => {
  console.log('func')
}
</script>
<style scoped lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    font-size: 14px;
    .count {
      font-weight: 700;
    }
  }
}
</style>
