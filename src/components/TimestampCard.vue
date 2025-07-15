<script setup>
import { ref, watch } from 'vue'

/**
 * 将 Date 对象格式化为 UTC 字符串 'YYYY-MM-DD HH:mm:ss'
 * @param {Date} date 要格式化的 Date 对象
 * @returns {string} 格式化后的 UTC 日期时间字符串
 */
const formatDate = (date) => {
  const year = date.getUTCFullYear()
  // getUTCMonth() 返回 0-11，所以需要 +1
  let month = date.getUTCMonth() + 1
  // 修正：使用 getUTCDate() 获取日期中的天数，而不是 getUTCDay() (星期几)
  let day = date.getUTCDate()
  let hour = date.getUTCHours()
  let minute = date.getUTCMinutes()
  let second = date.getUTCSeconds()

  // 确保所有部分都为两位数，不足的补零
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 初始化时获取当前的 UTC 时间戳和格式化日期
const now = new Date()
const nowTimestamp = ref(now.valueOf()) // 默认是本地时间的时间戳
const nowDate = ref(formatDate(now)) // 默认是本地时间转换为 UTC 格式的字符串

/**
 * 将格式化的日期时间字符串转换为时间戳
 * 这个函数会将 nowDate.value (UTC 字符串) 转换为 UTC 时间戳
 */
const convertDatetime = () => {
  // 分割日期和时间部分
  const [datePart, timePart] = nowDate.value.split(' ')

  // 分割年、月、日
  const [year, month, day] = datePart.split('-').map(Number)
  // 分割时、分、秒
  const [hour, minute, second] = timePart.split(':').map(Number)

  // Date.UTC() 接收的是 UTC 时间的各个组成部分，并返回 UTC 时间戳
  // 注意：月份在 JavaScript Date 对象中是 0-11，所以需要 month - 1
  nowTimestamp.value = Date.UTC(year, month - 1, day, hour, minute, second)
}

/**
 * 将时间戳转换为格式化的日期时间字符串
 * 这个函数会将 nowTimestamp.value 转换为 UTC 格式的日期时间字符串
 */
const convertTimestamp = () => {
  // 根据时间戳创建一个新的 Date 对象
  const newDate = new Date(Number(nowTimestamp.value))
  // 使用 formatDate 函数将其格式化为 UTC 字符串
  nowDate.value = formatDate(newDate)
}

/**
 * 重置为当前 UTC 时间戳和格式化日期
 */
const reset = () => {
  const currentUTC = new Date() // 获取当前时间
  nowTimestamp.value = currentUTC.valueOf() // 获取当前时间的时间戳
  nowDate.value = formatDate(currentUTC) // 格式化为 UTC 字符串
}

// 监听 nowTimestamp 的变化，当时间戳改变时，自动更新格式化日期
watch(nowTimestamp, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    convertTimestamp()
  }
}, { immediate: true }) // immediate: true 确保在组件初始化时也执行一次

// 监听 nowDate 的变化，当日期字符串改变时，自动更新时间戳
// 注意：这里需要避免循环触发，即当 convertTimestamp 更新 nowDate 时，不应再次触发 convertDatetime
// 最简单的处理方式是让用户点击按钮进行转换，或者更复杂的判断，这里先保持用户点击按钮触发
// 如果需要自动双向同步，需要更精细的 watch 逻辑，例如使用 deep watch 或设置一个标志位
// 但考虑到现有按钮，我们让 convertDatetime 仅在点击按钮时触发，以避免输入时的频繁转换和潜在的循环
// 因此，这里不添加对 nowDate 的 watch，而是依赖用户点击 "Convert" 按钮。
// 如果用户在输入框中手动修改了日期，需要点击 Convert 按钮才能更新时间戳。
</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="time-header">
          <span>Timestamp Conversion</span>
        </div>
      </template>
      <el-form
        :label-position="'right'"
        label-width="auto"
      >
        <el-form-item label="Timestamp">
          <el-input v-model="nowTimestamp" type="number">
            <template #append>ms</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Datetime">
          <el-input v-model="nowDate">
            <template #append>utc</template>
          </el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <!-- 重置按钮 -->
          <el-button color="#FDC93A" @click="reset()">Reset</el-button>
          <!-- 转换按钮（日期转时间戳） -->
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Convert Datetime to Timestamp"
            placement="left"
          >
            <el-button color="#FDC93A" @click="convertDatetime()">Convert</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
/* 保持原有的样式，如果需要可以添加更多 */
.time-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
