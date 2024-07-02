<script setup>
import { ref } from 'vue'
import { CodeDiff } from 'v-code-diff'

const dialogVisible = ref(false)
const codeDiffVisible = ref(false)

const formatJson = (data) => {
  const jsonObj = JSON.parse(data.trim())
  return JSON.stringify(jsonObj, null, 4)
}

const handleClose = () => {
  dialogVisible.value = false
  codeDiffVisible.value = false
  leftJson.value = '{}'
  rightJson.value = '{}'
}

const leftJson = ref('{}')
const rightJson = ref('{}')
</script>

<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="time-header">
          <span>JSON Compare</span>
        </div>
      </template>
      <div class="btn-area">
        <el-button color="#FDC93A" @click="dialogVisible = true">Click to compare</el-button>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="Compare JSON"
      width="800"
      fullscreen
      :before-close="handleClose"
    >
      <div class="input-area">
        <el-input type="textarea" rows="10" v-model="leftJson" />
        <el-input type="textarea" rows="10" v-model="rightJson" />
      </div>
      <div v-if="codeDiffVisible" class="compare-area">
        <code-diff :old-string="formatJson(leftJson)" :new-string="formatJson(rightJson)"
                   output-format="side-by-side" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button color="#FDC93A" @click="codeDiffVisible = true;">
            Compare
          </el-button>
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

.input-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}
</style>