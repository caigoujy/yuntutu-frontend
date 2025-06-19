<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/caigoujy/yuntutu-backend" target="_blank"> 云图库后端代码&nbsp;&nbsp;&nbsp;&nbsp;</a>
        <a href="https://github.com/caigoujy/yuntutu-frontend" target="_blank"> 云图库前端代码 </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'

// 测试自动生成代码请求
// import { healthUsingGet } from '@/api/mainController'
// healthUsingGet().then(res =>{
//  console.log(res)
// })
</script>

<style>
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}

#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}
</style>
