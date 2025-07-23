<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// 假设这些外部包是正确的，我们只修改姓名的生成逻辑
// import randomName from '@/packages/random-name.js' // 不再使用此包来生成姓名
import getIdCard from '@/packages/random-idcard.js'
import generateBankCardNumber from '@/packages/random-bankcard.js'

const { t } = useI18n()

const username = ref('')
const birthday = ref('')
const phoneNumber = ref('')
const idCardNumber = ref('')
const bankCardNumber = ref('')

// 定义一些常见的姓氏 (已拓展)
const commonChineseSurnames = [
  '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
  '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
  '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
  '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
  '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎', '余', '潘',
  '杜', '戴', '夏', '钟', '汪', '田', '任', '姜', '范', '方',
  '石', '姚', '谭', '廖', '邹', '熊', '金', '陆', '郝', '孔',
  '白', '崔', '康', '毛', '邱', '秦', '江', '史', '顾', '侯',
  '邵', '孟', '龙', '万', '段', '雷', '钱', '汤', '尹', '易',
  '黎', '常', '武', '乔', '贺', '赖', '龚', '文', '方', '洪'
];

// 定义一些常用的汉字作为名字的候选字 (已拓展)
const commonChineseGivenNames = [
  '伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '军', '勇',
  '杰', '涛', '明', '华', '平', '红', '玲', '丹', '磊', '刚',
  '霞', '波', '凯', '浩', '欣', '悦', '乐', '阳', '宇', '飞',
  '翔', '婷', '洁', '梅', '兰', '清', '文', '斌', '锋', '超',
  '健', '宁', '新', '英', '春', '冬', '秋', '夏', '德', '福',
  '志', '远', '康', '顺', '昌', '兴', '荣', '光', '建', '国',
  '晓', '小', '大', '中', '东', '西', '南', '北', '海', '山',
  '河', '江', '湖', '林', '森', '树', '花', '草', '叶', '竹',
  '风', '雨', '雷', '电', '云', '天', '地', '星', '月', '日',
  '晨', '曦', '旭', '阳', '光', '辉', '亮', '晶', '玉', '金',
  '银', '宝', '珠', '珍', '美', '善', '爱', '和', '平', '安',
  '福', '禄', '寿', '喜', '财', '旺', '发', '达', '盛', '昌',
  '瑞', '祥', '吉', '庆', '康', '泰', '丰', '茂', '盛', '华',
  '智', '聪', '慧', '贤', '德', '仁', '义', '礼', '智', '信',
  '忠', '孝', '廉', '节', '勤', '俭', '朴', '真', '诚', '实'
];

/**
 * 生成一个常见的简体中文姓名
 * 姓名通常由一个姓氏和1-2个名字组成
 */
const generateCommonChineseName = () => {
  // 随机选择一个姓氏
  const surname = commonChineseSurnames[Math.floor(Math.random() * commonChineseSurnames.length)];

  // 随机决定名字是单字还是双字 (大约50%的概率)
  const givenNameLength = Math.random() < 0.5 ? 1 : 2;
  let givenName = '';

  for (let i = 0; i < givenNameLength; i++) {
    givenName += commonChineseGivenNames[Math.floor(Math.random() * commonChineseGivenNames.length)];
  }

  return surname + givenName;
};


const randomBirthday = () => {
  const year = Math.floor(Math.random() * (2024 - 1980 + 1)) + 1980
  let month = Math.floor(Math.random() * (12 - 1 + 1)) + 1
  let day = Math.floor(Math.random() * (28 - 1 + 1)) + 1 // 简化，避免月份天数差异
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

const randomMobile = () => {
  const prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189']
  let i = parseInt('' + Math.random() * prefixArray.length) // 确保索引在数组范围内
  let prefix = prefixArray[i]
  for (let j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10)
  }
  return prefix
}

const refreshInfo = () => {
  // 使用新的生成常见中文名的函数
  username.value = generateCommonChineseName()
  birthday.value = randomBirthday()
  phoneNumber.value = randomMobile()
  // 假设 getIdCard 和 generateBankCardNumber 能够正常工作
  idCardNumber.value = getIdCard()
  bankCardNumber.value = generateBankCardNumber()
}

onMounted(() => {
  refreshInfo()
})

</script>

<template>
  <div class="tool-card">
    <div class="tool-header">
      <h3>{{ t('cards.userInfo.title') }}</h3>
      <div class="tool-description">{{ t('cards.userInfo.description') }}</div>
    </div>
    
    <div class="tool-content">
      <div class="info-section">
        <div class="input-group">
          <div class="input-label">{{ t('cards.userInfo.name') }}</div>
          <el-input
            v-model="username"
            class="custom-input"
            readonly
          />
        </div>
        
        <div class="input-group">
          <div class="input-label">{{ t('cards.userInfo.birthday') }}</div>
          <el-input
            v-model="birthday"
            class="custom-input"
            readonly
          />
        </div>
        
        <div class="input-group">
          <div class="input-label">{{ t('cards.userInfo.phone') }}</div>
          <el-input
            v-model="phoneNumber"
            class="custom-input"
            readonly
          />
        </div>
        
        <div class="input-group">
          <div class="input-label">{{ t('cards.userInfo.idCard') }}</div>
          <el-input
            v-model="idCardNumber"
            class="custom-input"
            readonly
          />
        </div>
        
        <div class="input-group">
          <div class="input-label">{{ t('cards.userInfo.bankCard') }}</div>
          <el-input
            v-model="bankCardNumber"
            class="custom-input"
            readonly
          />
        </div>
      </div>

      <div class="button-group">
        <el-button 
          type="primary"
          @click="refreshInfo"
          class="action-button"
        >
          {{ t('cards.userInfo.generate') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.tool-header {
  margin-bottom: 20px;
}

.tool-header h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-weight: 600;
}

.tool-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e4e7ed;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-input__inner) {
  font-size: 14px;
  height: 40px;
  background-color: #f8f9fa;
  cursor: default;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  border-radius: 8px;
  height: 40px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}
</style>
