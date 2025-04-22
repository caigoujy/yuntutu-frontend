
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/access'

import App from './App.vue'
import router from './router'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { message } from 'ant-design-vue'

const app = createApp(App)

// 全局配置 message 的默认显示时长（单位：秒）
message.config({
  duration: 2,
})

app.use(createPinia())
app.use(router)
app.use(Antd);

app.mount('#app')
