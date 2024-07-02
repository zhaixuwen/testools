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
      <table>
        <tr>
          <td>Name(Simplified Chinese)</td>
          <td>
            <el-input v-model="username"></el-input>
          </td>
        </tr>
        <tr>
          <td>Birthday</td>
          <td>
            <el-input v-model="birthday"></el-input>
          </td>
        </tr>
        <tr>
          <td>Phone number</td>
          <td>
            <el-input v-model="phoneNumber"></el-input>
          </td>
        </tr>
        <tr>
          <td>ID Card number</td>
          <td>
            <el-input v-model="idCardNumber"></el-input>
          </td>
        </tr>
        <tr>
          <td>Bank Card number</td>
          <td>
            <el-input v-model="bankCardNumber"></el-input>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div class="btn-area">
              <el-button color="#FFB243" type="primary" @click="refreshInfo()">Generate</el-button>
            </div>
          </td>
        </tr>
      </table>
    </el-card>
  </div>

</template>

<style scoped>
table {
  width: 100%;
}

.btn-area {
  float: right;
}

</style>