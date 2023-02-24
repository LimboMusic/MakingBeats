<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
interface Props {
  scrollY: number
}

const prop = defineProps<Props>()
const emit = defineEmits(['onClick'])
const cover = ref<boolean>(true)
const scrollY = ref<number>(0)
const selectedItem = ref<number>(1)
const chapters = ref(
  [
    {
      title: 'Get started',
      lessons: null,
    },
    {
      title: 'Beats',
      lessons: [
        {
          title: 'Make beats',
          route: '',
        },
        {
          title: 'What are these sounds?',
          route: '',
        },
        {
          title: 'Beat and tempo',
          route: '',
        },
        {
          title: 'Tempo and genre',
          route: '',
        },
        {
          title: 'Backbeats',
          route: '',
        },
        {
          title: 'Bars',
          route: '',
        },
        {
          title: 'Rock and house',
          route: '',
        },
        {
          title: '“We Will Rock You”',
          route: '',
        },
        {
          title: '“Single Ladies”',
          route: '',
        },
        {
          title: '“Play with beats”',
          route: '',
        },
      ],
    },
    {
      title: 'Notes and scales',
      lessons: [
        {
          title: 'Explore pitch',
          route: '',
        },
        {
          title: 'Make patterns with pitch',
          route: '',
        },
        {
          title: 'Keys and scales',
          route: '',
        },
        {
          title: 'Minor scales',
          route: '',
        },
        {
          title: 'Adding more notes',
          route: '',
        },
        {
          title: 'Play with notes and scales',
          route: '',
        },
      ],
    },
    {
      title: 'Chords',
      lessons: [
        {
          title: 'Make some chords',
          route: '',
        },
        {
          title: 'Major triads',
          route: '',
        },
        {
          title: 'Minor triads',
          route: '',
        },
        {
          title: '“Get Up, Stand Up”',
          route: '',
        },
        {
          title: '“Mary Had a Little Lamb”',
          route: '',
        },
        {
          title: '1-5-6-4',
          route: '',
        },
        {
          title: 'Play with chords',
          route: '',
        },
      ],
    },
    {
      title: 'Basslines',
      lessons: [
        {
          title: 'Make basslines',
          route: '',
        },
        {
          title: '“Good Life”',
          route: '',
        },
        {
          title: '“Around the World”',
          route: '',
        },
        {
          title: '“Under Mi Sleng Teng”',
          route: '',
        },
        {
          title: '“Never Tell You”',
          route: '',
        },
        {
          title: '“Oblivion”',
          route: '',
        },
        {
          title: 'Play with basslines',
          route: '',
        },
      ],
    },
    {
      title: 'Melodies',
      lessons: [
        {
          title: 'Make melodies',
          route: '',
        },
        {
          title: '“Love Will Tear Us Apart”',
          route: '',
        },
        {
          title: '“Tour de France”',
          route: '',
        },
        {
          title: '“Praxis”',
          route: '',
        },
        {
          title: '“Ride”',
          route: '',
        },
        {
          title: '“Ride” variations',
          route: '',
        },
        {
          title: 'Play with melodies',
          route: '',
        },
      ],
    },
    {
      title: 'Song structure',
      lessons: [
        {
          title: 'Play with melodies',
          route: '',
        },
        {
          title: '“Bury It”',
          route: '',
        },
        {
          title: '“Award Tour”',
          route: '',
        },
        {
          title: '“Ni - Ten - Ichi - Ryu”',
          route: '',
        },
        {
          title: '“I Feel Love”',
          route: '',
        },

      ],
    },
    {
      title: 'The playground',
      lessons: null,
    },
    {
      title: 'Advanced topics',
      lessons: [
        {
          title: 'Advanced topics',
          route: '',
        },
        {
          title: 'Building major scales',
          route: '',
        },
        {
          title: 'Building minor scales',
          route: '',
        },
        {
          title: 'Modes',
          route: '',
        },
        {
          title: 'Pentatonic',
          route: '',
        },
        {
          title: 'Whole tone',
          route: '',
        },
        {
          title: 'Octatonic',
          route: '',
        },
        {
          title: 'Pelog',
          route: '',
        },
        {
          title: '19-tone',
          route: '',
        },
        {
          title: 'Diatonic triads',
          route: '',
        },
        {
          title: 'Triads in every key',
          route: '',
        },
        {
          title: 'Inversions',
          route: '',
        },
        {
          title: 'Voicings',
          route: '',
        },
        {
          title: 'Seventh chords',
          route: '',
        },
        {
          title: '“Mommy What\'s a Record”',
          route: '',
        },

      ],
    },
    {
      title: 'Where to go from here',
      lessons: null,
    },
  ],
)

const lessons = ref({
  title: 'Lessons',
  item: null,
})

const handleClick = () => {
  cover.value = false
  emit('onClick', cover, scrollY)
}

const changeLessons = (index: number) => {
  console.log(`选择了第${index}项`)
  selectedItem.value = index
}

const getActiveClass = (index: number) => {
  if (index === selectedItem.value)
    return true
}

const getsubNav = (item: any) => {
  if (item.lessons === null)
    return false

  else
    return true
}

onMounted(() => {
  scrollY.value = window.screenY
  document.getElementsByTagName('body')[0].className = 'nav-is-show'
})

onUnmounted(() => {
  document.getElementsByTagName('body')[0].className = 'nav-is-hidden'
  window.scrollTo(0, prop.scrollY)
})
</script>

<template>
  <div class="mask-wrapper">
    <div class="nav-wrapper">
      <div class="navigation-wrapper">
        <div class="btn" @click="handleClick">
          X
        </div>
        <div class="title">
          Chapters
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-item chapters">
        <div class="content-item-title">
          Chapters
        </div>
        <div v-for="(item, index) in chapters" :key="item.title" class="chapters-item" :class="{ active: getActiveClass(index), subNav: getsubNav(item) }" @click="changeLessons(index)">
          <div>{{ item.title }}</div>
        </div>
      </div>
      <div class="content-item lessons">
        <div class="content-item-title">
          Lessons
        </div>
        <div v-for="item in chapters[selectedItem].lessons" :key="item.title" class="lessons-item">
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mask-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  min-width: 100%;
  background-color: rgb(217, 217, 217);

  .nav-wrapper {
    height: 100%;
    width: 80px;
    position: fixed;
    left: 0;
    top: 0;

    .navigation-wrapper {
      height: 100%;
      width: 100%;
      padding-top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: rgb(179, 179, 179);
      position: relative;

      .btn {
        position: absolute;
        left: 50%;
        top: 0;
        height: 26px;
        width: 26px;
        display: inline-block;
        font-size: 26px;
        transform: translateX(-50%);
        top: 60px;
      }

      .title {
        color: #000;
        font-size: 1rem;
        line-height: 1.5;
        transform: rotate(-90deg);
        cursor: pointer;
      }
    }

  }

  .content {

    padding: 60px;
    padding-left: 160px;
    height: 100%;
    width: 100%;
    display: flex;

    .content-item {
      width: 280px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &-title {
        color: #858585;
        font-size: .7em;
        line-height: 1.5;
        margin-bottom: .7em;
        width: 100%;
      }

      .chapters-item,
      .lessons-item{
        cursor: pointer;
        margin: 10px 0;
        font-weight: 2000;
        line-height: 1.5;
        position: relative;
      }

    }
  }
}

.active::after{
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #000;
  left: 0;
  bottom: 0;
}

.subNav::before{
  content: '>';
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
