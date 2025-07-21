<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

const jsonData = ref('')
const viewportHeight = ref(window.innerHeight)

const updateViewportHeight = () => {
  viewportHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', updateViewportHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportHeight)
})

const autoSizeConfig = computed(() => {
  const lines = jsonData.value.split('\n').length
  const minRows = Math.min(10, lines)
  
  // Set a reasonable max height that keeps buttons visible
  // Calculate max rows based on viewport height but with stricter limits
  const availableHeight = Math.min(viewportHeight.value * 0.6, 500) // Max 60% of viewport or 500px
  const maxRowsByHeight = Math.floor(availableHeight / 24)
  const maxRows = Math.min(maxRowsByHeight, 20) // Never exceed 20 rows
  
  return { minRows: Math.max(minRows, 5), maxRows: Math.max(maxRows, 15) }
})

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
          <span>JSON Formatter</span>
        </div>
      </template>
      <el-input v-model="jsonData" type="textarea" :autosize="autoSizeConfig"></el-input>
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
  margin-top: 10px;
  margin-bottom: 20px;
  float: right;
  position: sticky;
  bottom: 0;
  background: white;
  padding: 10px 0;
  z-index: 10;
}
</style>
