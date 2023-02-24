<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import Navigation from './components/Navigation/index.vue'
import Mask from '@/components/Mask/index.vue'
import Footer from '@/components/Footer/index.vue'
const scrollY = ref<number>(0)
const flag = ref<boolean>(false)

const handleNavClick = (cover: any, scrolly: any) => {
  scrollY.value = scrolly
  flag.value = cover.value
}

const handleMaskClick = (cover: any) => {
  flag.value = cover.value
}

onMounted(() => {
  document.getElementsByTagName('body')[0].className = 'nav-is-hidden'
})
</script>

<template>
  <div class="wrapper">
    <Navigation class="navigation" @on-click="handleNavClick" />
    <router-view v-if="flag === false" class="router-view" />
    <Teleport to="body">
      <Mask v-if="flag === true" :scroll-y="scrollY" @on-click="handleMaskClick" />
    </Teleport>
    <Footer class="footer" />
  </div>
</template>

<style  lang='less'>
.wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.footer{
  height: 100%;
  width: 100%;
  padding-left: 80px;
}

.router-view{
  height: 100%;
  width: 100%;
  padding-left: 80px;
}

.navigation{
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(77,77,77);
  padding-top:60px
}

.nav-is-show{
  height: 100vh !important;
  background-color: rgb(102,102,102);
}

.nav-is-hidden {
  background-color: rgb(102,102,102);
  height: 100%;
}
</style>
