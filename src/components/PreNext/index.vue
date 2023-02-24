<script setup lang='ts'>
import { reactive, ref } from 'vue'

const leftTitle = ref<string>('<Previous')
const rightTitle = ref<string>('Next:What are these sounds?>')
</script>

<template>
  <div class="prenext-wrapper">
    <div class="left">
      {{ leftTitle }}
    </div>
    <div class="right">
      {{ rightTitle }}
    </div>
  </div>
</template>

<style scoped lang="less">
.prenext-wrapper{
    padding:80px 120px;
    display: flex;
    justify-content: space-between;
    .left,
    .right{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        color: #fff;
    }

    .right{
        background-color: rgb(77,77,77);
        min-width: 360px;
    }

    .left{
        min-width: 100px;
    }
}
</style>
