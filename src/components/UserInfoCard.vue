<script setup>
import { onMounted, ref } from 'vue'
import randomName from '@/packages/random-name.js'
import getIdCard from '@/packages/random-idcard.js'
import generateBankCardNumber from '@/packages/random-bankcard.js'

const username = ref('')
const birthday = ref('')
const phoneNumber = ref('')
const idCardNumber = ref('')
const bankCardNumber = ref('')

const randomBirthday = () => {
  const year = Math.floor(Math.random() * (2024 - 1980 + 1)) + 1980
  let month = Math.floor(Math.random() * (12 - 1 + 1)) + 1
  let day = Math.floor(Math.random() * (28 - 1 + 1)) + 1
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

const randomMobile = () => {
  const prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189']
  let i = parseInt('' + Math.random() * 10)
  let prefix = prefixArray[i]
  for (let j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10)
  }
  return prefix
}

const refreshInfo = () => {
  username.value = randomName.getName()
  birthday.value = randomBirthday()
  phoneNumber.value = randomMobile()
  idCardNumber.value = getIdCard()
  bankCardNumber.value = generateBankCardNumber()
}

onMounted(() => {
  refreshInfo()
})

</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="user-header">
          <span>User Info Generator</span>
        </div>
      </template>
      <el-form
        :label-position="'right'"
        label-width="auto"
      >
        <el-form-item label="Name(Simplified Chinese)">
          <el-input v-model="username" />
        </el-form-item>
        <el-form-item label="Birthday">
          <el-input v-model="birthday" />
        </el-form-item>
        <el-form-item label="Phone number">
          <el-input v-model="phoneNumber" />
        </el-form-item>
        <el-form-item label="ID Card number">
          <el-input v-model="idCardNumber" />
        </el-form-item>
        <el-form-item label="Bank Card number">
          <el-input v-model="bankCardNumber" />
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button color="#FDC93A" @click="refreshInfo()">Generate</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<style scoped>

</style>