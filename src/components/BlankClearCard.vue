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
  <el-card class="blank-clear-card">
    <template #header>
      <div class="card-header">
        <span>空格清除工具</span>
      </div>
    </template>
    
    <div class="card-body">
      <el-input
        v-model="inputText"
        type="textarea"
        :rows="4"
        placeholder="请输入需要清除空格的文本"
      />
      
      <div class="button-group">
        <el-space>
          <el-button type="primary" @click="clearBlanksAndCopy">清除空格并复制</el-button>
          <el-button @click="resetField">重置</el-button>
        </el-space>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.blank-clear-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin: 8px 0;
}
</style>
