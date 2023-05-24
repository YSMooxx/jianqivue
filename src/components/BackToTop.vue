<script setup>
import { onMounted, ref } from 'vue'

let clientHeight = document.documentElement.clientHeight
const flag_scroll = ref(false)
//methods中定义事件
const handleScroll = () => {
  let scrollTop = document.documentElement
  flag_scroll.value = scrollTop.scrollTop > clientHeight
}
const backTop = () => {
  document.documentElement.scrollTop = 0
}
onMounted(() => {
  document.getElementsByClassName('backTop')[0].style.top = clientHeight * 0.8 + 'px'
  window.addEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div class="back-to-top">
    <van-button type="default" round class="backTop" @click="backTop" v-show="flag_scroll">
      <img src="@/assets/img/backTop.png" alt="" />
    </van-button>
  </div>
</template>

<style lang="less" scoped>
.back-to-top {
  .backTop {
    position: fixed;
    top: 0;
    right: 16px;
    z-index: 999;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 1);
    border-color: rgba(53, 170, 121, 0.5);
    box-shadow: 0px 0px 3px 0px rgba(53, 170, 121, 0.5);

    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
