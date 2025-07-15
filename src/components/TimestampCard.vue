<script setup>
import { ref, onMounted } from 'vue'

/**
 * 将 Date 对象格式化为 UTC 字符串 'YYYY-MM-DD HH:mm:ss'
 * @param {Date} date 要格式化的 Date 对象
 * @returns {string} 格式化后的 UTC 日期时间字符串
 */
const formatDate = (date) => {
  const year = date.getUTCFullYear()
  let month = date.getUTCMonth() + 1
  let day = date.getUTCDate() // 修正：使用 getUTCDate() 获取日期中的天数
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

// --- 日期时间转时间戳功能相关变量 ---
const datetimeInputForToTimestamp = ref('') // 用于输入的日期时间字符串
const timestampOutputForToToTimestamp = ref('') // 转换后的时间戳输出

/**
 * 将日期时间字符串转换为时间戳 (UTC)
 */
const convertDatetimeToTimestamp = () => {
  const dateTimeString = datetimeInputForToTimestamp.value
  if (!dateTimeString) {
    timestampOutputForToToTimestamp.value = ''
    return
  }
  const [datePart, timePart] = dateTimeString.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute, second] = timePart.split(':').map(Number)

  // Date.UTC() 接收的是 UTC 时间的各个组成部分，并返回 UTC 时间戳
  // 月份在 JavaScript Date 对象中是 0-11，所以需要 month - 1
  timestampOutputForToToTimestamp.value = Date.UTC(year, month - 1, day, hour, minute, second)
}

// --- 时间戳转日期时间功能相关变量 ---
const timestampInputForToDatetime = ref('') // 用于输入的时间戳
const datetimeOutputForToDatetime = ref('') // 转换后的日期时间字符串输出

/**
 * 将时间戳转换为日期时间字符串 (UTC)
 */
const convertTimestampToDatetime = () => {
  const timestamp = Number(timestampInputForToDatetime.value)
  if (isNaN(timestamp)) {
    datetimeOutputForToDatetime.value = ''
    return
  }
  const newDate = new Date(timestamp)
  datetimeOutputForToDatetime.value = formatDate(newDate)
}

/**
 * 重置所有输入框和输出框为当前 UTC 时间
 */
const resetAll = () => {
  const now = new Date()
  // 日期时间转时间戳部分
  datetimeInputForToTimestamp.value = formatDate(now)
  timestampOutputForToToTimestamp.value = now.valueOf()

  // 时间戳转日期时间部分
  timestampInputForToDatetime.value = now.valueOf()
  datetimeOutputForToDatetime.value = formatDate(now)
}

// 组件挂载时，初始化所有输入和输出为当前 UTC 时间
onMounted(() => {
  resetAll()
})
</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="time-header">
          <span>Timestamp Conversion</span>
        </div>
      </template>
      <el-form :label-position="'right'" label-width="auto">
        <!-- 日期时间转时间戳 -->
        <el-form-item label="Datetime (UTC)">
          <el-input v-model="datetimeInputForToTimestamp" placeholder="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
        <el-form-item label="Timestamp (ms)">
          <el-input v-model="timestampOutputForToToTimestamp" readonly type="number">
            <template #append>ms</template>
          </el-input>
        </el-form-item>
        <!-- 按钮独自占一行并靠右对齐 -->
        <el-form-item class="button-full-width-right">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Convert Datetime to Timestamp"
            placement="left"
          >
            <el-button color="#FDC93A" @click="convertDatetimeToTimestamp()">Convert Datetime</el-button>
          </el-tooltip>
        </el-form-item>

        <el-divider /> <!-- 分隔两个功能 -->

        <!-- 时间戳转日期时间 -->
        <el-form-item label="Timestamp (ms)">
          <el-input v-model="timestampInputForToDatetime" type="number" />
        </el-form-item>
        <el-form-item label="Datetime (UTC)">
          <el-input v-model="datetimeOutputForToDatetime" readonly placeholder="YYYY-MM-DD HH:mm:ss">
            <template #append>utc</template>
          </el-input>
        </el-form-item>
        <!-- 按钮独自占一行并靠右对齐 -->
        <el-form-item class="button-full-width-right">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Convert Timestamp to Datetime"
            placement="left"
          >
            <el-button color="#FDC93A" @click="convertTimestampToDatetime()">Convert Timestamp</el-button>
          </el-tooltip>
        </el-form-item>

        <el-divider /> <!-- 分隔功能和重置按钮 -->

        <!-- 重置按钮，独自占一行并靠右对齐 -->
        <el-form-item class="button-full-width-right">
          <el-button color="#FDC93A" plain @click="resetAll()">Reset All</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
/* 保持原有的样式 */
.time-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-divider {
  margin: 20px 0;
}

/* 调整 el-form-item 自身的默认间距，使其更紧凑 */
.el-form-item {
  margin-bottom: 10px; /* 减小默认的底部间距 */
}

/* 修正后的样式：确保按钮独自占一行并靠右对齐 */
.button-full-width-right {
  width: 100%; /* 确保 el-form-item 占据整个宽度 */
  margin-top: 0px; /* 增加与上方输入框的间隔 */
  margin-bottom: 0px; /* 增加与下方内容的间隔 */
}

/* 关键修正：针对 el-form-item 内部的 content 区域应用 Flexbox */
.button-full-width-right :deep(.el-form-item__content) {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: flex-end; /* 将内容（按钮）推到右侧 */
  width: 100%; /* 确保内容区域也占据整个宽度 */
  margin-left: 0 !important; /* 覆盖 Element Plus 默认的左边距，确保完全右对齐 */
}
</style>
