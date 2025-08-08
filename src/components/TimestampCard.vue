<script setup>
import { ref, onMounted } from 'vue'

/**
 * 将 Date 对象格式化为 UTC 字符串 'YYYY-MM-DD HH:mm:ss'
 */
const formatDate = (date) => {
  const year = date.getUTCFullYear()
  let month = date.getUTCMonth() + 1
  let day = date.getUTCDate()
  let hour = date.getUTCHours()
  let minute = date.getUTCMinutes()
  let second = date.getUTCSeconds()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const datetimeInputForToTimestamp = ref('')
const timestampOutputForToToTimestamp = ref('')
const timestampInputForToDatetime = ref('')
const datetimeOutputForToDatetime = ref('')

const convertDatetimeToTimestamp = () => {
  const dateTimeString = datetimeInputForToTimestamp.value
  if (!dateTimeString) {
    timestampOutputForToToTimestamp.value = ''
    return
  }
  const [datePart, timePart] = dateTimeString.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute, second] = timePart.split(':').map(Number)
  timestampOutputForToToTimestamp.value = Date.UTC(year, month - 1, day, hour, minute, second)
}

const convertTimestampToDatetime = () => {
  const timestamp = Number(timestampInputForToDatetime.value)
  if (isNaN(timestamp)) {
    datetimeOutputForToDatetime.value = ''
    return
  }
  const newDate = new Date(timestamp)
  datetimeOutputForToDatetime.value = formatDate(newDate)
}

const resetAll = () => {
  const now = new Date()
  datetimeInputForToTimestamp.value = formatDate(now)
  timestampOutputForToToTimestamp.value = now.valueOf()
  timestampInputForToDatetime.value = now.valueOf()
  datetimeOutputForToDatetime.value = formatDate(now)
}

onMounted(() => {
  resetAll()
})
</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>时间戳转换工具</h3>
      <div class="tool-description">在 UTC 时间和时间戳之间进行转换</div>
    </div>
    
    <div class="tool-content">
      <div class="conversion-section">
        <h4 class="section-title">UTC 时间转时间戳</h4>
        <div class="input-group">
          <div class="input-label">UTC 时间</div>
          <el-input
            v-model="datetimeInputForToTimestamp"
            placeholder="YYYY-MM-DD HH:mm:ss"
            class="custom-input"
            @input="convertDatetimeToTimestamp"
          />
        </div>
        <div class="input-group">
          <div class="input-label">时间戳 (毫秒)</div>
          <el-input
            v-model="timestampOutputForToToTimestamp"
            readonly
            type="number"
            class="custom-input"
          >
            <template #append>ms</template>
          </el-input>
        </div>
      </div>

      <div class="conversion-section">
        <h4 class="section-title">时间戳转 UTC 时间</h4>
        <div class="input-group">
          <div class="input-label">时间戳 (毫秒)</div>
          <el-input
            v-model="timestampInputForToDatetime"
            type="number"
            class="custom-input"
            @input="convertTimestampToDatetime"
          >
            <template #append>ms</template>
          </el-input>
        </div>
        <div class="input-group">
          <div class="input-label">UTC 时间</div>
          <el-input
            v-model="datetimeOutputForToDatetime"
            readonly
            class="custom-input"
          >
            <template #append>utc</template>
          </el-input>
        </div>
      </div>

      <div class="button-group">
        <el-button 
          type="primary"
          @click="resetAll"
          class="action-button"
        >
          重置为当前时间
        </el-button>
      </div>
    </div>
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
  border: 1px solid rgba(224, 224, 224, 0.5);
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
  gap: 24px;
}

.conversion-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.section-title {
  font-size: 15px;
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-weight: 500;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e4e7ed;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-input__inner) {
  font-size: 14px;
  height: 40px;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff;
}

.custom-input :deep(.el-input-group__append) {
  background-color: #f4f4f5;
  color: #909399;
  font-size: 12px;
  padding: 0 12px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
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

@media (max-width: 768px) {
  .conversion-section {
    padding: 12px;
  }

  .input-group {
    margin-bottom: 12px;
  }

  .custom-input :deep(.el-input__wrapper) {
    width: 100%;
  }
}
</style>
