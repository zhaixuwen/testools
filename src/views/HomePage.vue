<script setup>
import UUIDCard from '@/components/UUIDCard.vue'
import TimestampCard from '@/components/TimestampCard.vue'
import UserInfoCard from '@/components/UserInfoCard.vue'
import JsonFormatCard from '@/components/JsonFormatCard.vue'
import JsonCompareCard from '@/components/JsonCompareCard.vue'
import APIMockCard from '@/components/APIMockCard.vue'

</script>

<template>
  <div class="home-page">
    <el-container>
      <el-header class="home-header">
        <el-menu mode="horizontal">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-space>
            <img src="../assets/logo.svg" alt="Toolkit Logo" height="24px" width="24px" />
            <h1>Testools</h1>
          </el-space>
        </el-menu>
      </el-header>
      <el-main class="home-main">
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="card"><UUIDCard /></div>
            <div class="card"><UserInfoCard /></div>
          </el-col>
          <el-col :span="7">
            <div class="card"><TimestampCard /></div>
            <div class="card"><JsonCompareCard /></div>
            <div class="card"><APIMockCard /></div>
          </el-col>
          <el-col :span="10">
            <div class="card"><JsonFormatCard /></div>
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
.card {
  margin-bottom: 10px;
}
</style>