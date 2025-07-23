<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import * as monaco from 'monaco-editor'

const { t } = useI18n()
const jsonData = ref('')
const editorContainer = ref(null)
let editor = null

onMounted(async () => {
  await nextTick()
  
  // 初始化编辑器
  editor = monaco.editor.create(editorContainer.value, {
    value: '',
    language: 'json',
    theme: 'vs-light',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
    scrollBeyondLastLine: false,
    roundedSelection: true,
    renderLineHighlight: 'all',
    cursorStyle: 'line',
    cursorWidth: 2,
    lineNumbers: 'on',
    contextmenu: false,
    folding: true,
    wordWrap: 'on',
    bracketPairColorization: { enabled: true },
    formatOnPaste: true,
    fixedOverflowWidgets: true, // 防止提示框溢出
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      useShadows: true,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    }
  })
  
  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    jsonData.value = editor.getValue()
  })
})

onUnmounted(() => {
  if (editor) {
    editor.dispose()
  }
})

const formatJson = async () => {
  try {
    const value = editor.getValue().trim()
    if (!value) return
    
    const jsonObj = JSON.parse(value)
    const formatted = JSON.stringify(jsonObj, null, 2)
    
    // 使用编辑器的格式化命令
    editor.setValue(formatted)
    editor.getAction('editor.action.formatDocument').run()
    
    ElMessage({
      type: 'success',
      message: t('cards.jsonFormat.formatSuccess')
    })
  } catch (error) {
    console.error('Format error:', error)
    ElMessage({
      type: 'error',
      message: error.message || t('cards.jsonFormat.invalidJson')
    })
  }
}

const compressJson = () => {
  try {
    const value = editor.getValue().trim()
    if (!value) return
    
    const jsonObj = JSON.parse(value)
    const compressed = JSON.stringify(jsonObj)
    editor.setValue(compressed)
    
    ElMessage({
      type: 'success',
      message: t('cards.jsonFormat.compressSuccess')
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: t('cards.jsonFormat.invalidJson')
    })
  }
}

const copyJsonData = () => {
  const value = editor.getValue()
  if (!value) return
  
  navigator.clipboard.writeText(value).then(() => {
    ElMessage({
      type: 'success',
      message: t('common.copySuccess')
    })
  })
}

const clearJsonData = () => {
  editor.setValue('')
  editor.focus()
}
</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>{{ t('cards.jsonFormat.title') }}</h3>
      <div class="tool-description">{{ t('cards.jsonFormat.description') }}</div>
    </div>
    
    <div class="tool-content">
      <div class="editor-section">
        <div ref="editorContainer" class="monaco-editor-container"></div>
      </div>

      <div class="button-group">
        <el-button 
          type="primary"
          @click="formatJson"
          class="action-button"
        >
          {{ t('cards.jsonFormat.format') }}
        </el-button>
        <el-button 
          @click="compressJson"
          class="action-button"
        >
          {{ t('cards.jsonFormat.compress') }}
        </el-button>
        <el-button 
          @click="copyJsonData"
          class="action-button"
          :disabled="!jsonData"
        >
          {{ t('cards.jsonFormat.copy') }}
        </el-button>
        <el-button 
          @click="clearJsonData"
          class="action-button"
          :disabled="!jsonData"
        >
          {{ t('cards.jsonFormat.clear') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  height: 100%;
  min-height: 500px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.05);
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
  gap: 16px;
  flex: 1;
  min-height: 0; /* 重要：防止 flex 子项溢出 */
  overflow: hidden;
}

.editor-section {
  flex: 1;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  min-height: 0; /* 重要：防止 flex 子项溢出 */
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.monaco-editor-container {
  flex: 1;
  min-height: 0; /* 重要：防止 flex 子项溢出 */
  border-radius: 6px;
  overflow: hidden;
  position: relative; /* 重要：为 Monaco Editor 提供定位上下文 */
}

:deep(.monaco-editor) {
  position: absolute; /* 重要：使编辑器填充容器 */
  inset: 0;
  height: 100% !important;
  width: 100% !important;
}

:deep(.monaco-editor .overflow-guard) {
  border-radius: 6px;
}

:deep(.monaco-editor .inputarea.ime-input) {
  padding: 0;
}

.button-group {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  padding-bottom: 4px;
}

.action-button {
  border-radius: 6px;
  height: 36px;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0 16px;
  min-width: 80px;
  font-size: 14px;
}

.action-button:not(:disabled):hover {
  transform: translateY(-1px);
}

.action-button:first-child:hover {
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}

@media (max-width: 768px) {
  .button-group {
    padding: 8px;
    margin: 0 -8px -8px -8px;
    gap: 6px;
  }

  .action-button {
    flex: 1;
    min-width: calc(50% - 3px);
    max-width: calc(50% - 3px);
    padding: 0 8px;
    height: 32px;
  }
}
</style>
