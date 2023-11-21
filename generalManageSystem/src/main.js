import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import '@/assets/styles/common.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './api/mock'

//1.导入createPinia
import {createPinia} from 'pinia'

//2.执行方法得到的实例
const pinia = createPinia()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(pinia)
app.mount('#app')
