<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const jsonData = ref('')

const formatJson = () => {
  const jsonObj = JSON.parse(jsonData.value.trim())
  jsonData.value = JSON.stringify(jsonObj, null, 4)
}

const compressJson = () => {
  const jsonObj = JSON.parse(jsonData.value.trim())
  jsonData.value = JSON.stringify(jsonObj)
}

const copyJsonData = () => {
  navigator.clipboard.writeText(jsonData.value).then(() => {
    ElMessage({
      message: 'JSON has been copied to clipboard.',
      type: 'success'
    })
  })
}

const clearJsonData = () => {
  jsonData.value = ''
}
</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="uuid-header">
          <span>JSON Format</span>
        </div>
      </template>
      <el-input v-model="jsonData" type="textarea" :autosize="{ minRows: 10, maxRows: 15 }"></el-input>
      <div class="btn-list">
        <el-button @click="formatJson()" color="#FDC93A">Format</el-button>
        <el-button @click="compressJson()" color="#FDC93A">Compress</el-button>
        <el-button @click="copyJsonData()" color="#FDC93A" plain>Copy</el-button>
        <el-button @click="clearJsonData()" color="#FDC93A" plain>Clear</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.btn-list {
  margin-top: 3px;
  margin-bottom: 20px;
  float: right;
}
</style>