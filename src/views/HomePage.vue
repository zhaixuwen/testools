<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import UUIDCard from '@/components/UUIDCard.vue'
import TimestampCard from '@/components/TimestampCard.vue'
import UserInfoCard from '@/components/UserInfoCard.vue'
import JsonFormatCard from '@/components/JsonFormatCard.vue'
import JsonCompareCard from '@/components/JsonCompareCard.vue'
import APIMockCard from '@/components/APIMockCard.vue'
import BlankClearCard from '@/components/BlankClearCard.vue'

const { t, locale } = useI18n()
const activeCategory = ref('daily')

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  
  // 检查是否为浏览器环境
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('language', newLocale)
    } catch (e) {
      console.warn('Failed to save language preference:', e)
    }
  }
}

const categories = computed(() => [
  {
    id: 'daily',
    name: t('categories.daily.name'),
    icon: 'Tools',
    tools: [
      { component: UUIDCard, name: t('categories.daily.tools.uuid') },
      { component: TimestampCard, name: t('categories.daily.tools.timestamp') }
    ]
  },
  {
    id: 'text',
    name: t('categories.text.name'),
    icon: 'Document',
    tools: [
      { component: BlankClearCard, name: t('categories.text.tools.blankClear') }
    ]
  },
  {
    id: 'debug',
    name: t('categories.debug.name'),
    icon: 'Monitor',
    tools: [
      { component: APIMockCard, name: t('categories.debug.tools.apiMock') }
    ]
  },
  {
    id: 'mock',
    name: t('categories.mock.name'),
    icon: 'DataLine',
    tools: [
      { component: UserInfoCard, name: t('categories.mock.tools.userInfo') }
    ]
  },
  {
    id: 'json',
    name: t('categories.json.name'),
    icon: 'Document',
    tools: [
      { component: JsonFormatCard, name: t('categories.json.tools.jsonFormat') },
      { component: JsonCompareCard, name: t('categories.json.tools.jsonCompare') }
    ]
  }
])
</script>

<template>
  <el-container class="home-page">
    <el-header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <img src="../assets/logo.svg" alt="Toolkit Logo" class="logo" />
          <h1 class="app-title">{{ t('header.title') }}</h1>
        </div>
        <div class="header-right">
          <div class="header-actions">
            <el-button
              type="text"
              class="language-switch"
              @click="toggleLanguage"
            >
              {{ t(`language.${locale === 'zh' ? 'en' : 'zh'}`) }}
            </el-button>
            <a href="https://github.com/zhaixuwen/testools" target="_blank" class="github-link">
              <i class="el-icon-position"></i> {{ t('header.github') }}
            </a>
          </div>
        </div>
      </div>
    </el-header>

    <el-main class="app-main">
      <div class="container">
        <el-card class="category-card">
          <el-tabs v-model="activeCategory" class="category-tabs">
            <el-tab-pane
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :name="category.id"
            >
              <div class="tools-grid">
                <el-row :gutter="32">
                  <el-col 
                    v-for="tool in category.tools" 
                    :key="tool.name"
                    :xs="24" 
                    :sm="24" 
                    :md="12" 
                    :lg="12" 
                    class="tool-col"
                  >
                    <component :is="tool.component" />
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.app-header {
  padding: 0;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 100;
  height: auto;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.language-switch {
  font-size: 14px;
  color: #606266;
  padding: 0;
  height: auto;
}

.language-switch:hover {
  color: #409eff;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 32px;
  width: 32px;
}

.app-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.github-link:hover {
  color: #409eff;
}

.app-main {
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.category-card {
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-card :deep(.el-card__body) {
  padding: 24px 8px;
  background-color: transparent;
}

.category-tabs {
  margin: 0;
}

.category-tabs :deep(.el-tabs__header) {
  margin-bottom: 24px;
  padding: 0 16px;
}

.category-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
}

.category-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  padding: 0 24px;
  transition: all 0.3s ease;
}

.category-tabs :deep(.el-tabs__item.is-active) {
  font-weight: 600;
}

.tools-grid {
  padding: 0;
  width: 100%;
}

.tools-grid :deep(.el-row) {
  width: 100%;
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
}

.tool-col {
  margin-bottom: 32px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
}

.tool-col > :deep(*) {
  width: 100%;
}

@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
  }

  .app-title {
    font-size: 20px;
  }

  .logo {
    height: 28px;
    width: 28px;
  }

  .container {
    padding: 16px;
  }

  .category-card :deep(.el-card__body) {
    padding: 16px;
  }

  .category-tabs :deep(.el-tabs__item) {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
  }

  .category-card :deep(.el-card__body) {
    padding: 16px 4px;
  }

  .tool-col {
    margin-bottom: 24px;
    padding: 0 12px;
  }

  .category-tabs :deep(.el-tabs__header) {
    padding: 0 12px;
  }
}
</style>