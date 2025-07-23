import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './i18n'
import App from './App.vue'

const app = createApp(App)

// 使用 ElementPlus
app.use(ElementPlus)
// 使用 i18n
app.use(i18n)

app.mount('#app')
