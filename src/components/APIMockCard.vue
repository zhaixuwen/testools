<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const method = ref('get')
const path = ref('')
const header = ref([
  {
    'key': 'Content-Type',
    'value': 'application/json'
  }
])

const handleClose = () => {
  dialogVisible.value = false
}

const addHeader = () => {
  header.value.push({ 'key': '', 'value': '' })
}

</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="time-header">
          <span>API Mocker</span>
        </div>
      </template>
      <div class="btn-area">
        <el-button color="#FDC93A" @click="dialogVisible = true">Go to mock page</el-button>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="Mock API"
      width="33.3%"
      :before-close="handleClose"
    >
      <div class="mock-area">
        <el-form
          :label-position="'right'"
          label-width="auto"
        >
          <el-form-item label="Method">
            <el-select v-model="method" style="width: 25%">
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
              <el-option label="PUT" value="put" />
              <el-option label="DELETE" value="delete" />
            </el-select>
          </el-form-item>
          <el-form-item label="Path">
            <el-input v-model="path"></el-input>
          </el-form-item>
          <el-form-item label="Header">
            <div>
              <el-row :gutter="5" v-for="(h, index) in header" :key="index">
                <el-col :span="10">
                  <el-input v-model="h.key" />
                </el-col>
                <el-col :span="10">
                  <el-input v-model="h.value" />
                </el-col>
                <el-col :span="4">
                  <el-button v-if="index===0" @click="addHeader"></el-button>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-form>


      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button color="#FDC93A">Send request</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.btn-area {
  float: right;
  margin-bottom: 20px;
}

</style>