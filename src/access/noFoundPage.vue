<template>
  <div id="notFound" class="container">
    <div class="icon">404</div>
    <h1>页面不存在</h1>
    <p>抱歉，您访问的页面不存在。<br />请检查URL或返回上一页。</p>
    <div class="button-group">
      <a-button type="primary" @click="goBack" style="margin-right: 16px">返回上一页</a-button>
      <a-button href="/">返回首页</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">

import router from "@/router";

const goBack = () => {
  router.back()
}
</script>
<style scoped>
#notFound {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
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
.button-group {
  margin-top: 24px;
}
</style>
