<script setup>
import { computed, onMounted, ref } from 'vue'
// 导入 Element Plus 的消息提示组件
import { ElMessage } from 'element-plus'

const smallUUID = ref('')
const bigUUID = computed(() => smallUUID.value.toUpperCase())

/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 */
const copyToClipboard = (text) => {
  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea')
  textarea.value = text
  // 将 textarea 放置到屏幕外，使其不可见
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  // 选中 textarea 中的文本
  textarea.select()
  try {
    // 执行复制命令
    const successful = document.execCommand('copy')
    if (successful) {
      // 复制成功后显示提示信息
      ElMessage({
        message: 'UUID 已成功复制到剪贴板！',
        type: 'success',
      })
    } else {
      // 复制失败后显示警告信息
      ElMessage({
        message: '复制失败，请手动复制。',
        type: 'warning',
      })
    }
  } catch (err) {
    // 捕获复制过程中的错误
    ElMessage({
      message: '复制时发生错误：' + err,
      type: 'error',
    })
  } finally {
    // 无论成功与否，最后都移除临时的 textarea 元素
    document.body.removeChild(textarea)
  }
}

const generateUUID = () => {
  // 生成新的 UUID
  smallUUID.value = crypto.randomUUID()
  // 仅在点击按钮时，才尝试复制生成的 UUID 到剪贴板
  copyToClipboard(smallUUID.value)
}

onMounted(() => {
  // 组件挂载时，仅生成 UUID，不执行复制操作
  smallUUID.value = crypto.randomUUID()
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
          <!-- 显示小写 UUID -->
          <el-input v-model="smallUUID" placeholder="Click button to generate" readonly />
        </el-form-item>
        <el-form-item label="">
          <!-- 显示大写 UUID -->
          <el-input v-model="bigUUID" placeholder="Click button to generate" readonly />
        </el-form-item>
        <el-form-item style="float: right">
          <!-- 点击按钮时生成并复制 UUID -->
          <el-button color="#FDC93A" @click="generateUUID()">Generate</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
/* 这里可以添加组件特有的样式 */
.uuid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
