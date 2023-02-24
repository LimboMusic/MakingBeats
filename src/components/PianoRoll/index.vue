<!-- eslint-disable no-console -->
<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue'
import * as Tone from 'tone'
import openHat from '@/assets/music/Open_Hat01.mp3'
import closedHat from '@/assets/music/Closed_Hat01.mp3'
import clap from '@/assets/music/Clap01.mp3'
import kick from '@/assets/music/Kick01.mp3'

interface Instrument {
  name: string
  sound: any
}
interface Props {
  instruments: Instrument[]
}
interface Note {
  x: number
  y: number
  name: string
  revealed: boolean
  instrument: any
}

const props = defineProps<Props>()
const instruments = props.instruments
const range = ref<HTMLInputElement>()
const tempo = ref<number>(128)
const interval = ref(10)
const speed = ref(100 / (60 * 4 * 1000 / tempo.value / interval.value))
const notes = ref<Note[][]>(Array.from(
  { length: props.instruments.length }, (_, y) => {
    return Array.from({ length: 16 }, (_, x): Note => {
      return {
        x,
        y,
        name: instruments[y].name.trim(),
        instrument: null,
        revealed: false,
      }
    })
  }))
const line = ref<HTMLDivElement>()
const move = ref<boolean>(false)
const btnPlay = ref<HTMLButtonElement>()
const playList = ref(Array.from({ length: 16 }, () => {
  return new Map()
}))

const player: any = {
  kick: new Tone.Player({
    url: kick,
    autostart: false,
  }).toDestination(),
  clap: new Tone.Player({
    url: clap,
    autostart: false,
  }).toDestination(),
  openHat: new Tone.Player({
    url: openHat,
    autostart: false,
  }).toDestination(),
  closedHat: new Tone.Player({
    url: closedHat,
    autostart: false,
  }).toDestination(),
}

Tone.Transport.bpm.value = tempo.value

watch(tempo, () => {
  speed.value = 100 / (60 * 4 * 1000 / tempo.value / interval.value)
  Tone.Transport.bpm.value = tempo.value
}, {
  flush: 'post',
})

let eventId: number | null = null
const handlePlay = () => {
  move.value = !move.value
  if (move.value === true) {
    Tone.Transport.start()
    let count = 0
    Tone.loaded().then(() => {
      eventId = Tone.Transport.scheduleRepeat((time) => {
        playList.value[count].forEach((item) => {
          player[item as any].start()
        })
        count++
        if (count === 16)
          count = 0
      }, '16n')
    })
  }
  else {
    Tone.Transport.clear(eventId as number)
    Tone.Transport.stop()
  }
}

const init = () => {
  const timer = ref()
  btnPlay.value?.addEventListener('click', () => {
    if (move.value === true) {
      const val = ref<number>(0)
      val.value = parseInt(line.value!.style.left) | 0
      timer.value = setInterval(() => {
        val.value += speed.value
        line.value!.style.left = `${val.value}%`
        if (val.value >= 100)
          val.value = 0
      }, interval.value)
    }
    else {
      clearInterval(timer.value)
    }
  })
  const setSound = () => {
    instruments.forEach((item) => {
      if (item.name === 'Open Hat')
        item.sound = openHat

      else if (item.name === 'Clap')
        item.sound = clap

      else if (item.name === 'Kick')
        item.sound = kick

      else if (item.name === 'Closed Hat')
        item.sound = closedHat
    })
  }
  setSound()
}

onMounted(() => {
  init()
})

const handleRiffClick = (note: Note) => {
  note.revealed = !note.revealed
  console.log(note)
  if (note.revealed === true) {
    const sampler = new Tone.Sampler({
      urls: {
        C1: '',
      },
      baseUrl: instruments[note.y].sound,
      onload: () => {
        if (move.value === false)
          sampler.triggerAttackRelease(['C1'], 0.5)
      },
    }).toDestination()
    note.instrument = instruments[note.y].sound
    console.log('note====>', note)
    if (note.name === 'Open Hat')
      playList.value[note.x].set(note.name, 'openHat')

    else if (note.name === 'Clap')
      playList.value[note.x].set(note.name, 'clap')

    else if (note.name === 'Kick')
      playList.value[note.x].set(note.name, 'kick')

    else if (note.name === 'Closed Hat')
      playList.value[note.x].set(note.name, 'closedHat')
  }
  else {
    playList.value[note.x].delete(note.name)
  }
}

const handleInstrumentClick = (item: Instrument) => {
  const sound = new Tone.Player(item.sound).toDestination()
  Tone.loaded().then(() => {
    sound.start()
  })
}

const reset = () => {
  tempo.value = 128
}
</script>

<template>
  <div class="pianoroll-wrapper">
    <div class="menu">
      <button ref="btnPlay" class="play" @click="handlePlay">
        <i v-if="move === false" class="toPlay" />
        <i v-if="move === true" class="toPause" />
      </button>
      <div class="reset" @click="reset">
        Reset
      </div>
      <div class="right">
        <div style="margin-right: 10px;cursor: pointer;">
          Clear
        </div>
        <div style="cursor: pointer;">
          Export to Live
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="slider">
        <label for="range">Tempo:{{ tempo }}bpm</label>
        <input ref="range" v-model="tempo" type="range" min="30" max="240" name="range" class="range">
      </div>
      <div class="pianoroll">
        <div class="left-content">
          <div v-for="item in props.instruments" :key="item.name" class="title" @click="handleInstrumentClick(item)">
            {{ item.name }}
          </div>
        </div>
        <div class="right-content">
          <div v-if="move" ref="line" class="line" />
          <div v-for="(row, x) in notes" :key="x" class="row">
            <div v-for="note, y in row" :key="y" class="note" @click="handleRiffClick(note)">
              <div v-if="note.revealed" class="revealed" />
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div v-for="item in 16" :key="item" class="footer-item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pianoroll-wrapper {
  width: 1000px;
  height: 100%;
  position: relative;

  .menu {
    width: 100%;
    height: 60px;
    display: flex;

    .play {
      height: 100%;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      i {
        display: inline-block;
        height: 24px;
        width: 20px;
        background-image: url(https://learningmusic.ableton.com/images/icons/play.svg);
        background-size: 20px 24px;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      .toPause{
        background-image: url(https://learningmusic.ableton.com/images/icons/pause.svg);
      }

      .toPlay{
        background-image: url(https://learningmusic.ableton.com/images/icons/play.svg);
      }
    }

    .reset {
      cursor: pointer;
      margin-left: 30px;
      height: 100%;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffff;

    }

    .right {
      height: 60px;
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
    }
  }

  .content-wrapper {
    width: 1000px;
    height: 290px;
    display: flex;
    flex-direction: column;

    .slider {
      width: 100%;
      height: 20%;
      background: #4d4d4d;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      box-sizing: border-box;

      .range {
        width: 100%;
      }

      label {
        color: #fff;
        white-space: 1px;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }
    }

    .pianoroll {
      height: 100%;
      background: #858585;
      display: flex;

      .left-content {
        display: flex;
        width: 124px;
        height: 100%;
        flex-direction: column;
        cursor: pointer;
        color: #fff;
        font-weight: 700;

        .title {
          width: 100%;
          height: 25%;
          border-top: 2px solid #4d4d4d;
          border-right: 2px solid #4d4d4d;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .right-content {
        display: flex;
        width: 100%;
        position: relative;
        flex-direction: column;

        .row {
          width: 100%;
          height: 100%;
          display: flex;

          .note {
            cursor: pointer;
            width: 100%;
            height: 100%;
            border: 1px solid rgb(102, 102, 102);

            .revealed {
              width: 100%;
              height: 100%;
              background: rgb(254, 209, 52);
            }
          }

          .note:nth-child(4n) {
            border-right: 1px solid rgb(55, 55, 55);
            // border-right: 1px solid #fff;
          }
        }
      }
    }

    .footer {
      display: flex;
      width: 100%;
      height: 37px;
      padding-left: 110px;
      justify-content: space-between;

      .footer-item {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #858585;
        padding-top: .8em;
        font-size: 0.7em;
      }

      .footer-item:nth-child(1),
      .footer-item:nth-child(5),
      .footer-item:nth-child(9),
      .footer-item:nth-child(13) {
        color: #b3b3b3;
      }
    }
  }
}

.line {
  position: absolute;
  background-color: #fff;
  height: 100%;
  width: 2px;
  left: 0;
  top: 0;
}
</style>

