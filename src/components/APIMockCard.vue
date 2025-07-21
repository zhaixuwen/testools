<script setup>
import { ref } from 'vue'
import { Plus, Minus, Upload, Close, Promotion } from '@element-plus/icons-vue'
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
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="time-header">
          <span>API Mocker</span>
        </div>
      </template>
      <div class="btn-area">
        <el-button color="#FDC93A" @click="dialogVisible = true">Go to mock page</el-button>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="Mock API"
      width="50%"
      :before-close="handleClose"
    >
      <div class="mock-area">
        <el-form
          :label-position="'right'"
          label-width="auto"
        >
          <el-form-item label="Method">
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
            <div>
              <el-row :gutter="10" v-for="(h, index) in header" :key="index">
                <el-col :span="9">
                  <el-input v-model="h.key" />
                </el-col>
                <el-col :span="9">
                  <el-input v-model="h.value" />
                </el-col>
                <el-col :span="6">
                  <el-button @click="delHeader(index)" :icon="Minus"></el-button>
                  <el-button v-if="index===(header.length-1)" @click="addHeader" :icon="Plus"></el-button>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="Param">
            <div>
              <el-row :gutter="10" v-for="(p, index) in params" :key="index">
                <el-col :span="9">
                  <el-input v-model="p.key" />
                </el-col>
                <el-col :span="9">
                  <el-input v-model="p.value" />
                </el-col>
                <el-col :span="6">
                  <el-button @click="delParam(index)" :icon="Minus"></el-button>
                  <el-button v-if="index===(params.length-1)" @click="addParam" :icon="Plus"></el-button>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="Body">
            <el-input v-model="body" type="textarea" rows="5" />
          </el-form-item>
          <el-form-item label="Response" v-if="response">
            <el-input v-model="response" type="textarea" rows="5" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" :icon="Close">Cancel</el-button>
          <el-button @click="curlDialogVisible = true" :icon="Upload">Import from cURL</el-button>
          <el-button color="#FDC93A" @click="sendRequest" :icon="Promotion">Send request</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="curlDialogVisible"
      title="Import from cURL"
      width="50%"
    >
      <el-form>
        <el-form-item label="cURL Command">
          <el-input 
            v-model="curlCommand" 
            type="textarea" 
            rows="6" 
            placeholder="Paste your cURL command here..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="curlDialogVisible = false" :icon="Close">Cancel</el-button>
          <el-button color="#FDC93A" @click="parseCurlCommand" :icon="Upload">Import</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.btn-area {
  float: right;
  margin-bottom: 20px;
}
</style>
