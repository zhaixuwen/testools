<script setup>
import UUIDCard from '@/components/UUIDCard.vue'

</script>

<template>
  <div class="home-page">
    <el-container>
      <el-header class="home-header">
        <el-menu mode="horizontal">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-space>
            <img src="../assets/logo.svg" alt="Toolkit Logo" height="24px" width="24px" />
            <h1>Testing Toolkit</h1>
          </el-space>
        </el-menu>
      </el-header>
      <el-main class="home-main">
        <el-row :gutter="20">
          <el-col :span="6">
            <UUIDCard />
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.home-header {
  margin: 0;
  padding: 0;
}

</style>