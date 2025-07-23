<script setup>
import { computed, onMounted, ref } from 'vue'
// 导入 Element Plus 的消息提示组件
import { ElMessage } from 'element-plus'

const smallUUID = ref('')
const bigUUID = computed(() => smallUUID.value.toUpperCase())

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 */
const copyToClipboard = (text) => {
  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea')
  textarea.value = text
  // 将 textarea 放置到屏幕外，使其不可见
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  // 选中 textarea 中的文本
  textarea.select()
  try {
    // 执行复制命令
    const successful = document.execCommand('copy')
    if (successful) {
      // 复制成功后显示提示信息
      ElMessage({
        message: 'UUID 已成功复制到剪贴板！',
        type: 'success',
      })
    } else {
      // 复制失败后显示警告信息
      ElMessage({
        message: '复制失败，请手动复制。',
        type: 'warning',
      })
    }
  } catch (err) {
    // 捕获复制过程中的错误
    ElMessage({
      message: '复制时发生错误：' + err,
      type: 'error',
    })
  } finally {
    // 无论成功与否，最后都移除临时的 textarea 元素
    document.body.removeChild(textarea)
  }
}

const generateUUID = () => {
  // 生成新的 UUID
  smallUUID.value = crypto.randomUUID()
  // 仅在点击按钮时，才尝试复制生成的 UUID 到剪贴板
  copyToClipboard(smallUUID.value)
}

onMounted(() => {
  // 组件挂载时，仅生成 UUID，不执行复制操作
  smallUUID.value = crypto.randomUUID()
})
</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>UUID(v4) 生成器</h3>
      <div class="tool-description">生成随机 UUID 并自动复制到剪贴板</div>
    </div>
    
    <div class="tool-content">
      <div class="uuid-inputs">
        <div class="input-group">
          <div class="input-label">小写 UUID</div>
          <el-input
            v-model="smallUUID"
            placeholder="点击生成按钮创建 UUID"
            readonly
            class="custom-input"
          />
        </div>
        
        <div class="input-group">
          <div class="input-label">大写 UUID</div>
          <el-input
            v-model="bigUUID"
            placeholder="点击生成按钮创建 UUID"
            readonly
            class="custom-input"
          />
        </div>
      </div>
      
      <div class="button-group">
        <el-button 
          type="primary" 
          @click="generateUUID"
          class="action-button"
        >
          生成并复制
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.tool-header {
  margin-bottom: 20px;
}

.tool-header h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-weight: 600;
}

.tool-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.uuid-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.custom-input :deep(.el-input__inner) {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 0 12px;
  height: 40px;
  background-color: #f8f9fa;
  cursor: default;
}

.custom-input :deep(.el-input__inner:hover) {
  border-color: #c0c4cc;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.action-button {
  border-radius: 8px;
  height: 40px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}
</style>
