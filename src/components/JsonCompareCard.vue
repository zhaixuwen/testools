<script setup>
// import { ref } from 'vue'
//
// const leftJson = ref('12345')
// const rightJson = ref('456')
// const theme = 'light'
</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="time-header">
          <span>JSON Compare</span>
        </div>
      </template>
      <div class="compare-area">
      </div>
      <div class="btn-area">
        <el-button color="#FDC93A">Compare</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.btn-area {
  float: right;
  margin-bottom: 20px;
}
</style>