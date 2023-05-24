<template>
  <router-view />
  <!-- 登录弹窗 -->
  <LoginModal />
</template>
<script setup lang="ts">
import LoginModal from '@/components/Login/LoginModal.vue'
</script>
<style lang="less">
@import url('ant-design-vue/dist/antd.less');
@import url('@/assets/styles/global.less');
</style>
