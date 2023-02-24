<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import PianoRoll from '@/components/PianoRoll/index.vue'
import PreNext from '@/components/PreNext/index.vue'

onMounted(() => {
})
const instruments = ref([
  {
    name: 'Open Hat',
    sound: '',
  },
  {
    name: 'Closed Hat',
    sound: '',
  },
  {
    name: 'Clap',
    sound: '',
  },
  {
    name: 'Kick',
    sound: '',
  }])
</script>

<template>
  <div class="Beats-FirstPage-wrapper">
    <header class="header">
      <div class="left">
        1/10:Beats
      </div>
      <div class="right" />
    </header>
    <div class="desc">
      <div class="title">
        Make beats
      </div>
      <div class="detail">
        <p>This grid shows the "inside" of a musical pattern.</p>
        <p>You can click in the grid boxes to make your own version by creating or deleting notes.</p>
      </div>
    </div>
    <PianoRoll :instruments="instruments" />
    <PreNext class="prenext" />
  </div>
</template>

<style scoped lang="less">
.Beats-FirstPage-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    height: 180px;
    padding-top: 60px;
    width: 100%;
    // background-color: skyblue;
    display: flex;
    padding-left: 80px;
    padding-right: 80px;

    justify-content: space-between;

    .left {
      color: #fff;
      letter-spacing: 1.5px;
      font-size: 1rem;
    }

    .right{
      height: 10px;
      width: 10px;
      background-color: #fff;
    }
  }

  .desc{
    width: 1000px;
    height: 100%;
    .title{
      font-size: 2.4rem;
      line-height: 1.2;
      color: #fff;
    }
    .detail{

      p{
        margin:30px 0;
        color: #fff;
        width: 480px;
        white-space: wrap;
        line-height: 1.5;
        font-size: 1rem;
      }
    }
  }

  .prenext{
    width: 1000px;
  }
}
</style>
