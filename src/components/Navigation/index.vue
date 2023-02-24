<script setup lang='ts'>
import { reactive, ref } from 'vue'
const emit = defineEmits(['onClick'])
const cover = ref<boolean>(false)
const scrollY = ref<number>(0)
const handleClick = () => {
  cover.value = true
  scrollY.value = window.scrollY
  emit('onClick', cover, window.scrollY)
}
</script>

<template>
  <div class="nav-wrapper" @click="handleClick">
    <div class="title">
      Chapters
    </div>
  </div>
</template>

<style scoped lang="less">
.nav-wrapper {
    height: 100%;
    width: 80px;
    padding-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .title {
        color: #fff;
        font-size: 1rem;
        line-height: 1.5;
        transform: rotate(-90deg);
        cursor: pointer;
    }
}
</style>
