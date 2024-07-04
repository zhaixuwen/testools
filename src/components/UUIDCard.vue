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
      <el-form
        :label-position="'right'"
        label-width="auto"
      >
        <el-form-item label="">
          <el-input v-model="smallUUID" placeholder="Click button to generate" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="bigUUID" placeholder="Click button to generate" />
        </el-form-item>
        <el-form-item style="float: right">
          <el-button color="#FDC93A" @click="generateUUID()">Generate</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>

</style>