import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

const messages = {
  en,
  zh
}

let savedLocale = 'zh'
try {
  const stored = localStorage.getItem('language')
  if (stored) {
    savedLocale = stored
  }
} catch (e) {
  console.warn('Failed to access localStorage:', e)
}

const i18n = createI18n({
  legacy: false, // 使用组合式 API
  locale: savedLocale,
  fallbackLocale: 'zh',
  messages,
  globalInjection: true, // 全局注入 $t 方法
  missingWarn: false, // 关闭 missing translation 警告
  fallbackWarn: false // 关闭 fallback 警告
})

export default i18n
