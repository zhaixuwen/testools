<script setup>
import { ref } from 'vue'
import UUIDCard from '@/components/UUIDCard.vue'
import TimestampCard from '@/components/TimestampCard.vue'
import UserInfoCard from '@/components/UserInfoCard.vue'
import JsonFormatCard from '@/components/JsonFormatCard.vue'
import JsonCompareCard from '@/components/JsonCompareCard.vue'
import APIMockCard from '@/components/APIMockCard.vue'
import BlankClearCard from '@/components/BlankClearCard.vue'

const activeCategory = ref('daily')

const categories = [
  {
    id: 'daily',
    name: '日常工具',
    icon: 'Tools',
    tools: [
      { component: UUIDCard, name: 'UUID 生成器' },
      { component: TimestampCard, name: '时间戳转换' }
    ]
  },
  {
    id: 'text',
    name: '字符处理',
    icon: 'Document',
    tools: [
      { component: BlankClearCard, name: '空白字符清理' }
    ]
  },
  {
    id: 'debug',
    name: '开发调试',
    icon: 'Monitor',
    tools: [
      { component: APIMockCard, name: 'API 调试工具' }
    ]
  },
  {
    id: 'mock',
    name: '模拟数据',
    icon: 'DataLine',
    tools: [
      { component: UserInfoCard, name: '用户信息生成' }
    ]
  },
  {
    id: 'json',
    name: 'JSON 工具',
    icon: 'Document',
    tools: [
      { component: JsonFormatCard, name: 'JSON 格式化' },
      { component: JsonCompareCard, name: 'JSON 对比工具' }
    ]
  }
]
</script>

<template>
  <el-container class="home-page">
    <el-header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <img src="../assets/logo.svg" alt="Toolkit Logo" class="logo" />
          <h1 class="app-title">Testools</h1>
        </div>
        <div class="header-right">
          <a href="https://github.com/zhaixuwen/testools" target="_blank" class="github-link">
            <i class="el-icon-position"></i> Github
          </a>
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
}

/* 全局工具按钮样式 */
:deep(.tool-card .button-group) {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

:deep(.tool-card .action-button) {
  border-radius: 8px;
  height: 40px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
  background-color: #409eff;
  border-color: #409eff;
}

:deep(.tool-card .action-button:hover) {
  background-color: #66b1ff;
  border-color: #66b1ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
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
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.3);
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