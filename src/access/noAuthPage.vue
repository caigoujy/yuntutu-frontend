<template>
  <div id="noAuth" class="container">
    <!-- 使用 Unicode 图标或替换为 SVG -->
    <div class="icon">🔒</div>
    <div class="icon">
      <LockOutlined />
    </div>
    <h1>权限不足</h1>
    <p>抱歉，您当前没有权限访问此页面。<br />请联系管理员或返回首页。</p>
    <a-space>
      <a-button type="primary" @click="goBack">返回上一页</a-button>
      <a-button @click="goHome">返回首页</a-button>
    </a-space>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back();
}
const goHome = () => {
  router.push('/')
}
</script>
<style>
#noAuth {
  max-width: 360px;
  margin: 0 auto;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f8f9fa;
  color: #343a40;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  text-align: center;
  line-height: 1.6;
}

.container {
  max-width: 500px;
  padding: 2rem;
}

.icon {
  font-size: 5rem;
  color: #6c757d;
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

.btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background-color: #4e73df;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3a5bd9;
}
</style>
