<script setup>
import { ref } from 'vue'
import { CodeDiff } from 'v-code-diff'

const dialogVisible = ref(false)
const codeDiffVisible = ref(false)
const leftJson = ref('{}')
const rightJson = ref('{}')

const formatJson = (data) => {
  try {
    const jsonObj = JSON.parse(data.trim())
    return JSON.stringify(jsonObj, null, 2)
  } catch (err) {
    return data // 如果解析失败，返回原始数据
  }
}

const handleClose = () => {
  dialogVisible.value = false
  codeDiffVisible.value = false
  leftJson.value = '{}'
  rightJson.value = '{}'
}

const handleCompare = () => {
  codeDiffVisible.value = true
}

</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>JSON 对比工具</h3>
      <div class="tool-description">比较两段 JSON 内容的差异</div>
    </div>
    
    <div class="tool-content">
      <el-button 
        type="primary" 
        @click="dialogVisible = true"
        class="action-button"
      >
        开始对比
      </el-button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="JSON 对比"
      width="80%"
      :before-close="handleClose"
      class="compare-dialog"
      append-to-body
      destroy-on-close
    >
      <div class="compare-container">
        <div class="input-section">
          <div class="json-input">
            <div class="input-label">原始 JSON</div>
            <el-input
              v-model="leftJson"
              type="textarea"
              :rows="12"
              placeholder="请输入原始 JSON"
              class="custom-input"
            />
          </div>
          
          <div class="json-input">
            <div class="input-label">对比 JSON</div>
            <el-input
              v-model="rightJson"
              type="textarea"
              :rows="12"
              placeholder="请输入要对比的 JSON"
              class="custom-input"
            />
          </div>
        </div>

        <div v-if="codeDiffVisible" class="diff-section">
          <div class="diff-header">对比结果</div>
          <div class="diff-content">
            <code-diff
              :old-string="formatJson(leftJson)"
              :new-string="formatJson(rightJson)"
              output-format="side-by-side"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button 
            @click="handleClose"
            class="cancel-button"
          >
            关闭
          </el-button>
          <el-button 
            type="primary"
            @click="handleCompare"
            class="action-button"
          >
            对比
          </el-button>
        </div>
      </template>
    </el-dialog>
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
  justify-content: center;
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

.compare-dialog :deep(.el-dialog) {
  border-radius: 12px;
  margin: 0 !important;
}

.compare-dialog :deep(.el-dialog__header) {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.compare-dialog :deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.compare-dialog :deep(.el-dialog__body) {
  padding: 24px;
  max-height: calc(90vh - 200px);
  overflow-y: auto;
}

.compare-dialog :deep(.el-dialog__footer) {
  padding: 16px 24px;
  border-top: 1px solid #e4e7ed;
  margin-top: auto;
}

.compare-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.json-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.custom-input :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  font-size: 14px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  line-height: 1.5;
}

.custom-input :deep(.el-textarea__inner:focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.diff-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.diff-header {
  font-size: 15px;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 500;
}

.diff-content {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.diff-content :deep(table) {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-button {
  border-radius: 8px;
  height: 40px;
}

@media (max-width: 768px) {
  .compare-dialog :deep(.el-dialog) {
    width: 95vw !important;
    margin: 0 auto !important;
  }

  .compare-dialog :deep(.el-dialog__body) {
    padding: 16px;
  }

  .input-section {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .diff-section {
    padding: 12px;
  }

  .tool-content {
    padding: 10px 0;
  }

  .custom-input :deep(.el-textarea__inner) {
    font-size: 13px;
  }
}
</style>