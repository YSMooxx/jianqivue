<script setup >
import { ref } from 'vue'
import { useLogin } from '@/hooks/useLogin'
import { useRoute } from 'vue-router'
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import  zoumadeng  from '@/pages/front/homePage/zoumadeng.vue'
import  HomeImage  from '@/pages/front/homePage/homeImage.vue'

const { menuStore } = useStore()
const { selectedKeys } = storeToRefs(menuStore)
const route = useRoute()
console.log(route)
const handle = () => {
  useLogin().then(() => {
    console.log('12323')
  })
}

const contentJson = {
  one:{
    content:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈',
    imageUrl:'../../../assets/img/icon_success.png',
  },
  two:{
    content:'哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦噢噢噢噢',
    imageUrl:'../../../assets/img/backTop.png',
  }
}

// const imgData =  reactive({
//   text:"xxx",
//   name:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
// })

</script>

<template>
  <!-- {{ selectedKeys }} -->
  <!-- <a-button @click="handle" type="primary">按 钮</a-button> -->
  <zoumadeng/>
  <HomeImage :describeText="contentJson.one.content" :imgUrl="contentJson.one.imageUrl"/>
  <!-- <HomeImage :describeText="contentJson.two.content" :imgUrl="contentJson.two.imageUrl"/> -->
  
</template>

<style lang="less" scoped></style>
