<template>
  <div id="errorPage" class="container">
    <div class="icon">
      <ExclamationCircleOutlined />
    </div>
    <h1>{{ title }}</h1>
    <p>{{ message }}<br />{{ suggestion }}</p>
    <div class="button-group">
      <a-button type="primary" @click="goBack" style="margin-right: 16px">返回上一页</a-button>
      <a-button @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { defineProps, withDefaults } from 'vue'
import router from "@/router";
interface Props {
  title?: string
  message?: string
  suggestion?: string
}
// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  title: '系统错误',
  message: '抱歉，系统出现了一些问题。',
  suggestion: '请稍后重试或联系管理员。'
})

const goBack = () => {
  router.back()
}
const goHome = () => {
  router.push('/')
}
</script>
<style scoped>
#errorPage {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
.icon {
  font-size: 5rem;
  color: #ff4d4f;
  margin-bottom: 1rem;
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #495057;
}
p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #6c757d;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
</style>
