<script setup>
import ConfigProvider from 'element-plus/es/components/config-provider/src/config-provider'
import { RouterView } from 'vue-router'
import local from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <ConfigProvider :locale="local">
    <RouterView #default="{ Component, index }">
      <Component :is="Component" :key="index" />
    </RouterView>
  </ConfigProvider>
</template>

<style scoped></style>
