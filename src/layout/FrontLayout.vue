<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <NavBar />
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <AppMain />
    </a-layout-content>
    <a-layout-footer>
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { NavBar, AppMain, Footer } from './components/front'
</script>

<style lang="less" scoped>
.ant-layout-header {
  background-color: #fff;

  .logo {
    width: 120px;
    height: 31px;
    background: #000;
    margin: 16px 24px 16px 0;
    float: left;
  }
}

.ant-layout-footer {
  background-color: black;
}
</style>
