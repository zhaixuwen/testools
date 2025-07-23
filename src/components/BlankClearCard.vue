<script setup>
import { ref } from 'vue'
import { ElCard, ElInput, ElButton, ElSpace } from 'element-plus'
import { ElMessage } from 'element-plus'

const inputText = ref('')

const clearBlanksAndCopy = async () => {
  const clearedText = inputText.value.replace(/\s+/g, '')
  try {
    await navigator.clipboard.writeText(clearedText)
    inputText.value = clearedText
    ElMessage.success('已清除空格并复制到剪贴板')
  } catch (err) {
    ElMessage.error('复制到剪贴板失败')
  }
}

const resetField = () => {
  inputText.value = ''
}
</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>空格清除工具</h3>
      <div class="tool-description">一键清除文本中的所有空格</div>
    </div>
    
    <div class="tool-content">
      <el-input
        v-model="inputText"
        type="textarea"
        :rows="4"
        placeholder="请输入需要清除空格的文本"
        class="custom-input"
      />
      
      <div class="button-group">
        <el-button 
          type="primary" 
          @click="clearBlanksAndCopy"
          class="action-button"
          :class="{ 'disabled': !inputText }"
          :disabled="!inputText"
        >
          清除空格并复制
        </el-button>
        <el-button 
          @click="resetField"
          class="reset-button"
          :class="{ 'disabled': !inputText }"
          :disabled="!inputText"
        >
          重置
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

.custom-input :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 12px;
}

.custom-input :deep(.el-textarea__inner:focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
}

.action-button {
  flex: 2;
  border-radius: 8px;
  height: 40px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.reset-button {
  flex: 1;
  border-radius: 8px;
  height: 40px;
  transition: all 0.3s ease;
}

.action-button:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}

.reset-button:hover:not(.disabled) {
  transform: translateY(-1px);
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
