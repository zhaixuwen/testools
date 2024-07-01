<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const smallUUID = ref(crypto.randomUUID())
const bigUUID = ref(smallUUID.value.toUpperCase())

const generateUUID = () => {
  smallUUID.value = crypto.randomUUID()
  navigator.clipboard.writeText(smallUUID.value).then(() => {
    ElMessage({
      message: 'UUID has been copied to clipboard.',
      type: 'success'
    })
  })
}

watch(smallUUID, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    bigUUID.value = newVal.toUpperCase()
  }
})
</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="uuid-header">
          <span>UUID(v4) Generator</span>
        </div>
      </template>
      <table>
        <tr>
          <td>
            <el-input v-model="smallUUID" placeholder="Click button to generate" />
          </td>
        </tr>
        <tr>
          <td>
            <el-input v-model="bigUUID" placeholder="Click button to generate" />
          </td>
        </tr>
        <tr>
          <td>
            <div class="btn-div">
              <el-button type="primary" @click="generateUUID()" color="#FFB243">Generate</el-button>
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

.btn-div {
  float: right;
}
</style>