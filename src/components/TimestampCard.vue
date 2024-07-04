<script setup>
import { ref, watch } from 'vue'

const formatDate = (date) => {
  const year = date.getUTCFullYear()
  let month = date.getUTCMonth() + 1
  let day = date.getUTCDay()
  let hour = date.getUTCHours()
  let minute = date.getUTCMinutes()
  let second = date.getUTCSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

const now = new Date()
const nowTimestamp = ref(now.valueOf())
const nowDate = ref(formatDate(now))

const convertDatetime = () => {
  const dateTimeStringList = nowDate.value.split(' ')
  const dateStringList = dateTimeStringList[0]
  const timeStringList = dateTimeStringList[1]
  const year = Number(dateStringList.split('-')[0])
  const month = Number(dateStringList.split('-')[1]) - 1
  const day = Number(dateStringList.split('-')[2])
  const hour = Number(timeStringList.split(':')[0])
  const minute = Number(timeStringList.split(':')[1])
  const second = Number(timeStringList.split(':')[2])
  nowTimestamp.value = Date.UTC(year, month, day, hour, minute, second).valueOf()
}

const convertTimestamp = () => {
  const newDate = new Date(Number(nowTimestamp.value))
  nowDate.value = formatDate(newDate)
}

const reset = () => {
  const now = new Date()
  nowTimestamp.value = now.valueOf()
  nowDate.value = formatDate(now)
}

watch(nowTimestamp, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    convertTimestamp()
  }
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
      <el-form
        :label-position="'right'"
        label-width="auto"
      >
        <el-form-item label="Timestamp">
          <el-input v-model="nowTimestamp">
            <template #append>ms</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Datetime">
          <el-input v-model="nowDate">
            <template #append>utc</template>
          </el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button color="#FDC93A" @click="reset()">Reset</el-button>
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

</style>