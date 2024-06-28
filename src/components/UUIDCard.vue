<script setup>
import { ref } from 'vue'

const smallUUID = ref(crypto.randomUUID())
const bigUUID = ref(smallUUID.value.toUpperCase())

const generateUUID = () => {
  smallUUID.value = crypto.randomUUID()
  bigUUID.value = smallUUID.value.toUpperCase()
}

</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="uuid-header">
          <span>UUID(v4) Generator</span>
        </div>
      </template>
      <div class="uuid-content">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-input v-model="smallUUID" style="max-width: 330px;" placeholder="Click button to generate" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="generateUUID()" color="#FFB243">Generate</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="18">
            <el-input v-model="bigUUID" style="max-width: 330px;" placeholder="Click button to generate" />
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </el-card>
  </div>

</template>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>