<script setup>
import { ref, watch } from 'vue'

const smallUUID = ref(crypto.randomUUID())
const bigUUID = ref(smallUUID.value.toUpperCase())

const generateUUID = () => {
  smallUUID.value = crypto.randomUUID()
}

watch(smallUUID, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    bigUUID.value = newVal.toUpperCase()
  }
})
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="uuid-header">
        <span>UUID(v4) Generator</span>
      </div>
    </template>
    <div class="uuid-content">
      <el-input class="uuid-input" v-model="smallUUID" placeholder="Click button to generate" />
      <el-button class="uuid-btn" type="primary" @click="generateUUID()" color="#FFB243">Generate</el-button>
    </div>
    <div class="uuid-content uuid-big">
      <el-input class="uuid-input" v-model="bigUUID" placeholder="Click button to generate" />
      <el-button v-if="false" class="uuid-btn" type="primary" color="#FFB243">Generate</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.uuid-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 5px;
}

.uuid-big {
  margin-top: 5px;
}
</style>