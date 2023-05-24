<template>
  <div>
    <div class="left-div">
    <!-- :src=imgUrl -->
    <!-- <a-image
      :scr=imgUrl
    /> -->
    <!-- <img src='@/assets/img/icon_success.png' alt="" /> -->
    <!-- <img src="../../../assets/img/icon_success.png" alt="" />  -->
    <img :src= 'getImageUrl(imgUrl)'  alt="" /> 
    </div>
    <div class="right-div">
      <p>
        {{ describeText }}
      </p>
    </div>
  </div>
 
</template>

<script setup lang="ts">


function getImageUrl(url:string) {
  
  return new URL(url,import.meta.url).href
}

type Props = {
  describeText: string
  imgUrl: string
}

const props = defineProps<Props>()

</script>

<style>
.left-div {
  width: 50%;
  float:left;
}

.left-div a-image {

  width: 100%;
}

.left-div img {
  width: 100%;
  /* padding: 25px; */
}

.right-div {
  width: 50%;
  float:right;
  background: green;
  padding-left: 20px;
  padding-right: 20px;
}

.right-div p {
  /* width: 50%; */
  color: aqua;
}
</style>



  
  