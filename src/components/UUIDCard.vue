<script setup>
import { computed, onMounted, ref } from 'vue'

const smallUUID = ref('')
const bigUUID = computed(() => smallUUID.value.toUpperCase())

const generateUUID = () => {
  smallUUID.value = crypto.randomUUID()
}

onMounted(() => {
  generateUUID()
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
              <el-button color="#FDC93A" @click="generateUUID()">Generate</el-button>
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