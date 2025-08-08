<script setup>
import { ref } from 'vue'
import { Plus, Minus, Upload, Close, Promotion, ArrowRight } from '@element-plus/icons-vue'
import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 5000
})

const dialogVisible = ref(false)
const method = ref('get')
const path = ref('')
const header = ref([
  {
    key: 'Content-Type',
    value: 'application/json'
  }
])
const params = ref([{ key: '', value: '' }])
const body = ref('')
const response = ref('')
const curlDialogVisible = ref(false)
const curlCommand = ref('')

const handleClose = () => {
  dialogVisible.value = false
}

const addHeader = () => {
  const lastHeader = header.value[header.value.length - 1]
  if (lastHeader.key !== '' || lastHeader.value !== '') {
    header.value.push({ key: '', value: '' })
  }
}

const delHeader = (index) => {
  if (header.value.length > 1) {
    header.value.splice(index, 1)
  } else {
    header.value = [{ key: '', value: '' }]
  }
}

const addParam = () => {
  const lastParam = params.value[params.value.length - 1]
  if (lastParam.key !== '' || lastParam.value !== '') {
    params.value.push({ key: '', value: '' })
  }
}

const delParam = (index) => {
  if (params.value.length > 1) {
    params.value.splice(index, 1)
  } else {
    params.value = [{ key: '', value: '' }]
  }
}

const handelHeader = () => {
  const newHeader = {}
  for (let head of header.value) {
    if (head.key && head.value) {
      newHeader[head.key] = head.value
    }
  }
  return newHeader
}

const parseCurlCommand = () => {
  const curl = curlCommand.value.trim()
  if (!curl.startsWith('curl')) {
    return
  }

  // Extract URL - keep the complete URL in path
  const urlMatch = curl.match(/curl\s+(?:-[^\s]+\s+)*['"]?([^'"?\s]+)/) || 
                   curl.match(/['"]([^'"]+)['"]/) ||
                   curl.match(/(\S+)/)
  if (urlMatch) {
    const url = urlMatch[1]
    // Use the complete URL instead of just pathname
    path.value = url
  }

  // Extract method - check for -X flag or --request flag, default to POST if data is present
  const methodMatch = curl.match(/-X\s+(\w+)/i) || curl.match(/--request\s+(\w+)/i)
  if (methodMatch) {
    method.value = methodMatch[1].toLowerCase()
  } else {
    // If no explicit method but has data, assume POST
    const hasData = curl.includes(' -d ') || curl.includes(' --data') || curl.includes(' --data-raw')
    if (hasData) {
      method.value = 'post'
    } else {
      method.value = 'get'
    }
  }

  // Extract headers
  const headerMatches = curl.matchAll(/-H\s+['"]([^'"]+)['"]/g)
  const newHeaders = []
  for (const match of headerMatches) {
    const headerValue = match[1]
    const colonIndex = headerValue.indexOf(':')
    if (colonIndex > 0) {
      const key = headerValue.substring(0, colonIndex).trim()
      const value = headerValue.substring(colonIndex + 1).trim()
      if (key && value) {
        newHeaders.push({ key, value })
      }
    }
  }
  if (newHeaders.length > 0) {
    header.value = newHeaders
  }

  // Extract body data - handle multiple formats with proper multiline support
  let bodyData = ''
  
  // Try to match --data-raw first (most common for JSON)
  let dataRawMatch = curl.match(/--data-raw\s+'([^']*(?:'[^']*)*)'|--data-raw\s+"([^"]*(?:"[^"]*)*)"/s)
  if (dataRawMatch) {
    bodyData = dataRawMatch[1] || dataRawMatch[2]
  } else {
    // Try other data formats
    let dataMatch = curl.match(/-d\s+'([^']*(?:'[^']*)*)'|--data\s+'([^']*(?:'[^']*)*)'|-d\s+"([^"]*(?:"[^"]*)*)"|--data\s+"([^"]*(?:"[^"]*)*)"/s)
    if (dataMatch) {
      bodyData = dataMatch[1] || dataMatch[2] || dataMatch[3] || dataMatch[4]
    } else {
      // Try unquoted data
      let unquotedMatch = curl.match(/-d\s+([^-\s][^\s]*)|--data\s+([^-\s][^\s]*)|--data-raw\s+([^-\s][^\s]*)/s)
      if (unquotedMatch) {
        bodyData = unquotedMatch[1] || unquotedMatch[2] || unquotedMatch[3]
      }
    }
  }

  if (bodyData) {
    // Handle escaped characters
    bodyData = bodyData.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\')
    body.value = bodyData
  }

  curlDialogVisible.value = false
  curlCommand.value = ''
}

const sendRequest = () => {
  const firstParam = params.value[0]
  let newUrl = path.value
  if (firstParam.key && firstParam.value) {
    newUrl += '?'
    for (let param of params.value) {
      newUrl += param.key + '=' + param.value + '&'
    }
    newUrl = newUrl.slice(0, -1)
    console.log(newUrl)
  }

  axiosInstance({
    method: method.value,
    url: newUrl,
    headers: handelHeader(),
    data: body.value
  }).then(function(res) {
    try {
      response.value = JSON.stringify(res.data, null, 4)
    } catch (e) {
      console.log(e)
      response.value = res.data
    }
  })
}

</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>API 调试工具</h3>
      <div class="tool-description">模拟 API 请求，支持导入 cURL 命令</div>
    
    <div class="tool-content">
      <div class="tool-actions">
        <el-button 
          type="primary"
          @click="dialogVisible = true"
          class="action-button"
          :icon="Promotion"
        >
          开始调试
        </el-button>
      </div>
    </div>
  </div>

  <!-- Main Dialog -->
  <el-dialog
    v-model="dialogVisible"
    title="API 调试"
    width="70%"
    :before-close="handleClose"
    class="mock-dialog"
    append-to-body
    destroy-on-close
  >
    <div class="mock-container">
        <div class="curl-import">
          <el-button 
            @click="curlDialogVisible = true"
            class="import-button"
            :icon="Upload"
          >
            导入cURL
          </el-button>
        </div>
        
        <el-form
          class="mock-form"
          :label-position="'left'"
          label-width="100px"
        >
          <el-form-item label="请求方法">
            <el-select v-model="method" style="width: 25%">
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
              <el-option label="PUT" value="put" />
              <el-option label="DELETE" value="delete" />
            </el-select>
          </el-form-item>
          <el-form-item label="Path">
            <el-input v-model="path"></el-input>
          </el-form-item>
          <el-form-item label="Header">
            <div class="header-list">
              <div class="header-item" v-for="(h, index) in header" :key="index">
                <el-input v-model="h.key" placeholder="Header Name" class="custom-input" />
                <el-input v-model="h.value" placeholder="Header Value" class="custom-input" />
                <el-button type="danger" @click="delHeader(index)" :icon="Minus" circle></el-button>
                <el-button v-if="index===(header.length-1)" @click="addHeader" :icon="Plus" circle></el-button>
              </div>
            </div>
          </el-form-item>
          
          <el-form-item label="参数">
            <div class="param-list">
              <div class="param-item" v-for="(p, index) in params" :key="index">
                <el-input v-model="p.key" placeholder="参数名" class="custom-input" />
                <el-input v-model="p.value" placeholder="参数值" class="custom-input" />
                <el-button type="danger" @click="delParam(index)" :icon="Minus" circle></el-button>
                <el-button v-if="index===(params.length-1)" @click="addParam" :icon="Plus" circle></el-button>
              </div>
            </div>
          </el-form-item>
          
          <el-form-item label="请求体">
            <el-input 
              v-model="body" 
              type="textarea" 
              rows="5"
              placeholder="请输入 JSON 格式的请求体"
              class="custom-input"
            />
          </el-form-item>
          
          <el-form-item label="响应" v-if="response">
            <div class="response-section">
              <el-input 
                v-model="response" 
                type="textarea" 
                rows="8"
                readonly
                class="custom-input"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" class="cancel-button" :icon="Close">
          关闭
        </el-button>
          <el-button 
            type="primary"
            @click="sendRequest"
            class="action-button"
            :icon="ArrowRight"
          >
            发送请求
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Curl Import Dialog -->
    <el-dialog
      v-model="curlDialogVisible"
      title="导入 cURL 命令"
      width="600px"
      class="curl-dialog"
      append-to-body
      destroy-on-close
    >
      <el-input 
        v-model="curlCommand" 
        type="textarea" 
        rows="8" 
        placeholder="在此粘贴 cURL 命令..."
        class="curl-input"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="curlDialogVisible = false" :icon="Close">关闭</el-button>
          <el-button color="#FDC93A" @click="parseCurlCommand" :icon="Upload">导入</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.tool-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  height: auto;
  min-height: 280px;
  border: 1px solid rgba(255, 255, 255, 0.5);
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
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 24px;
  padding: 20px 0;
}

.tool-actions {
  text-align: right;
}

.action-button {
  border-radius: 8px;
  height: 40px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}

/* Dialog 样式 */
.mock-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.mock-dialog :deep(.el-dialog) {
  border-radius: 12px;
  margin: 0 !important;
}

.mock-dialog :deep(.el-dialog__header) {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.mock-dialog :deep(.el-dialog__body) {
  padding: 24px;
  max-height: calc(90vh - 200px);
  overflow-y: auto;
}

.mock-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #e4e7ed;
  padding: 16px 24px;
}

.mock-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mock-form {
  margin-top: 16px;
}

.header-list,
.param-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-item,
.param-item {
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  gap: 12px;
  align-items: center;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 8px;
}

.curl-dialog :deep(.el-dialog) {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.curl-dialog :deep(.el-dialog__title) {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
}

.curl-dialog :deep(.el-dialog__body) {
  padding: 24px;
  background-color: #fff;
}

.curl-dialog :deep(.el-dialog__header) {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
  background-color: #fff;
}

.curl-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #e4e7ed;
  padding: 16px 24px;
  background-color: #fff;
}

.curl-input {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

.dialog-footer .el-button {
  min-width: 120px;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.curl-dialog .dialog-footer .el-button:last-child {
  background-color: #4096ff;
  border-color: #4096ff;
  color: #fff;
}

.curl-dialog .dialog-footer .el-button:last-child:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

@media (max-width: 768px) {
  .mock-dialog :deep(.el-dialog),
  .curl-dialog :deep(.el-dialog) {
    width: 90vw !important;
    margin: 0 auto !important;
  }

  .header-item,
  .param-item {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .header-item .el-button,
  .param-item .el-button {
    grid-column: span 1;
  }

  .tool-content {
    padding: 10px 0;
  }
}
</style>
