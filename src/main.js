import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './rem'
import 'element-plus/theme-chalk/src/index.scss'
import ClickOutside from 'element-plus/es/directives/click-outside/index.mjs'
import myInput from './direactive/myInput'
import myTable from '@/components/myTable/myTable.vue'

import './assets/main.css'

const app = createApp(App)
app.directive('Clickoutside', ClickOutside)
app.directive('myInput', myInput.myInput)
app.component('myTable', myTable)

app.use(createPinia())
app.use(router)
app.mount('#app')
