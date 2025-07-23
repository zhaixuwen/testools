import { createApp, watch } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import i18n from './i18n'
import App from './App.vue'

const app = createApp(App)

// 动态获取当前语言对应的 Element Plus 语言包
const getElementPlusLocale = () => {
  const currentLocale = i18n.global.locale.value
  return currentLocale === 'zh' ? zhCn : en
}

// 使用 ElementPlus 并配置国际化
app.use(ElementPlus, {
  locale: getElementPlusLocale()
})

// 使用 i18n
app.use(i18n)

// 监听语言变化，更新 Element Plus 语言包
watch(() => i18n.global.locale.value, () => {
  // 重新配置 Element Plus 的语言包
  app.config.globalProperties.$ELEMENT = {
    ...app.config.globalProperties.$ELEMENT,
    locale: getElementPlusLocale()
  }
})

app.mount('#app')
