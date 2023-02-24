<script setup lang='ts'>
import { reactive, ref } from 'vue'

const lang = ref<string[]>(['English', '简体中文', '繁體中文', 'Deutsch', 'Español',
  'Français', 'עִבְרִית', 'Bahasa Indonesia', 'Italiano', '日本語', '한국어', 'Nederlands', 'Português', 'Pусский',
  'Suomi', 'ไทย', 'Türkçe', 'Tiếng Việt',

])
const detail = ref<string[]>(['Go to Ableton.com >', 'Privacy Policy >', 'Imprint >'])

const setActiveIndex = (index: number) => {
  if (index === 0)
    return true
}
// Send us your feedback!

// Reset all lessons
</script>

<template>
  <div>
    <div class="footer-wrapper">
      <p style="padding:10px;cursor: pointer;">
        Send us your feedback!
      </p>
      <div class="lang" style="padding:10px">
        <div v-for="item, index in lang" :key="index" class="lang-item" :class="{ active: setActiveIndex(index) }">
          {{ item }}
        </div>
      </div>
      <!-- <p>
        <div ></div>
      </p> -->
      <p style="padding:10px;cursor: pointer;">
        Reset all lessons
      </p>
      <div class="footer-footer">
        <div v-for="item in detail" :key="item" class="footer-footer-item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer-wrapper {
  width: 100%;
  height: 300px;
  padding: 0 60px;
  color: #b3b3b3;

  .lang{
    display: flex;
    white-space: wrap;
    .lang-item{
      height: 100%;
      font-size: 0.7em;
      margin-right: 15px;
      white-space: nowrap;
      cursor: pointer;
    }
  }

  .footer-footer{
    width: 100%;
    height: 150px;

    .footer-footer-item{
      display: flex;
      flex-direction: row-reverse;
      color: #fff;
      margin-right: 15px;
      font-size: 0.7em;
      padding: 10px;
      cursor: pointer;
    }
  }
}

.active{
  color: #fff;
}
</style>
