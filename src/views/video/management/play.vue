<template>
    <div class="play">
      <div class="v-font play-button" v-if="pause" @click="video.play()">&#xe623;</div>
      <video id="play" class="video-js vjs-default-skin" controls preload="auto" :poster="cdn + item.thumb">
        <template v-if="item.transcoding === 99">
          <source :src="cdn + item.m3u8" type="application/x-mpegURL">
        </template>
        <template v-else>
          <source :src="cdn + item.target">
        </template>
      </video>
      <div class="control">
        <div class="format-time" style="left: 0">{{formatSeconds(currentTime)}}</div>
        <div class="format-time" style="right: 0">{{formatSeconds(duration)}}</div>
        <div class="format-time" v-if="mouseHover" style="left: calc(50% - 40px)">{{formatSeconds(dropTime)}}</div>
        <template
          v-if="pause">
          <el-tooltip class="item" effect="light" content="播放" placement="top">
            <div
              class="v-font control-button"
              @click="video.play()">&#xe623;</div>
          </el-tooltip>
        </template>
        <template
          v-else>
          <el-tooltip class="item" effect="light" content="暂停" placement="top">
            <div
              class="v-font control-button"
              @click="video.pause()">&#xe62e;</div>
          </el-tooltip>
        </template>
        <template>
          <template v-if="screenshotsLoading === false">
            <el-tooltip class="item" effect="light" content="截取当前播放时间，并设置为封面" placement="top">
              <div class="v-font control-button" @click="screenshotsAndSaveToTheCover">&#xe68c;</div>
            </el-tooltip>
          </template>
          <template v-if="screenshotsLoading === true">
            <div class="control-button loading">
              <img :src="require('@assets/loading.svg')">
            </div>
          </template>
        </template>
        <el-tooltip class="item" effect="light" :content="playbackRate + '倍数播放中'" placement="top">
          <div class="v-font control-button" @click="setPlaybackRate">
            <div style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ffffff;
            font-size: 1.2rem;
            color: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold">×{{playbackRate}}</div>
          </div>
        </el-tooltip>
        <div class="v-font control-button" @mouseenter="() => {showVolumeBar = true}" @mouseleave="() => {showVolumeBar = false}">
          <div class="volume" v-show="showVolumeBar">
            <el-slider
              v-model="volume"
              vertical
              height="150px">
            </el-slider>
          </div>
          &#xe61b;
        </div>
        <div class="v-font control-button" :class="{active: muted}" @click="muted = !muted">&#xe609;</div>
        <el-tooltip class="item" effect="light" content="关闭" placement="top">
          <div class="v-font control-button" @click="$emit('update:show', false)">&#xe602;</div>
        </el-tooltip>
        <div class="progress"
             @mouseenter="progressMouseEnter()"
             @mouseleave="progressMouseLeave()"
             @click="jumpTime($event)">
          <div class="progress-cache" :style="{
            width: bufferedPercent + '%'
          }"></div>
          <div
            class="progress-cache"
            @mousemove.self="progressMouseMove($event)"
            style="z-index: 99;background-color: transparent;width: 100%"></div>
          <div class="progress-current" :style="{
            width: (currentTime / duration * 100) + '%'
          }"></div>
          <div class="progress-current" v-if="mouseHover" :style="{
            width: (dropTime / duration * 100) + '%'
          }"></div>
        </div>
      </div>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'videojs-contrib-hls'
import config from '@config'
export default {
  name: 'play',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.video.pause()
      } else {
        this.pause = true
        this.playbackRate = 1
      }
    },
    item (val) {
      this.video.src(this.cdn + val.m3u8)
      this.video.load(this.cdn + val.m3u8)
      this.duration = val.duration
      // this.video
    },
    playbackRate (val) {
      this.video.playbackRate(val)
    },
    volume (val) {
      this.video.volume(val / 100)
      this.storage().set('volume', val)
    },
    muted (val) {
      this.video.muted(val)
      this.storage().set('muted', {muted: val})
    }
  },
  data () {
    return {
      cdn: config.cdn,
      video: null,
      pause: true,
      // 播放时长
      currentTime: 0,
      // 总时长
      duration: 0,
      // 视频缓冲时长
      bufferedPercent: 0,
      mouseHover: false,
      dropTime: 0,
      screenshotsLoading: false,
      playbackRate: 1,
      volume: 50,
      muted: false,
      showVolumeBar: false
    }
  },
  methods: {
    /**
     * @purpose 设置倍率播放
     */
    setPlaybackRate () {
      if (this.playbackRate >= 10) {
        this.playbackRate = 1
      } else {
        this.playbackRate++
      }
    },
    /**
     * @purpose 根据时间对视频截图并设置为封面
     */
    screenshotsAndSaveToTheCover () {
      if (this.screenshotsLoading) {
        return false
      }
      // 获取当前播放到的时间
      let time = this.video.currentTime()
      this.screenshotsLoading = true
      this
        .$api
        .video
        .screenshotsAndSaveToTheCover({
          id: this.item.id,
          time: time
        })
        .then(r => {
          this.screenshotsLoading = false
          this.$emit('change-thumb', {id: this.item.id, thumb: r.thumb})
        })
    },
    /**
     * @purpose 跳转到知道时间播放
     * @param obj
     */
    jumpTime (obj) {
      let percent = obj.offsetX / obj.target.clientWidth
      if (percent > 1) {
        percent = 1
      }
      this.currentTime = Math.ceil(percent * this.duration)
      this.video.currentTime(this.currentTime)
    },
    /**
     * @purpose 时间轴上面鼠标滑动
     * @param obj
     */
    progressMouseMove (obj) {
      let percent = obj.offsetX / obj.target.clientWidth
      if (percent > 1) {
        percent = 1
      }
      this.dropTime = Math.ceil(percent * this.duration)
    },
    /**
     * @purpose 鼠标移入时间轴
     */
    progressMouseEnter () {
      this.mouseHover = true
    },
    /**
     * @purpose 鼠标移除时间轴
     */
    progressMouseLeave () {
      this.mouseHover = false
    }
  },
  mounted () {
    this.video = videojs('play', {
      bigPlayButton: false,
      textTrackDisplay: false,
      posterImage: false,
      errorDisplay: false,
      controlBar: false
    })
    // 监听视频暂停
    this.video.on('pause', () => {
      this.pause = true
    })
    // 监听视频播放
    this.video.on('play', () => {
      this.pause = false
    })
    // 监听视频播放完毕
    this.video.on('ended', () => {
      this.pause = false
    })
    this.video.on('timeupdate', () => {
      this.currentTime = Math.ceil(this.video.currentTime())
      // this.duration = Number(this.video.duration())
      this.bufferedPercent = (this.video.bufferedPercent() * 100)
    })
  },
  created () {
    this.duration = this.item.duration
    let volume = this.storage().get('volume')
    let muted = this.storage().get('muted')
    if (typeof volume !== 'undefined') {
      this.volume = Number(volume)
    }
    if (typeof volume !== 'undefined') {
      this.muted = muted.muted
    }
  }
}
</script>

<style scoped lang="sass">
  .play
    width: 100%
    height: 600px
    position: relative
    background-color: #000000
    .play-button
      width: 100%
      height: 500px
      position: absolute
      background-color: rgba(0,0,0,0.5)
      display: flex
      align-items: center
      justify-content: center
      font-size: 5rem
      color: #ffffff
      cursor: pointer
      z-index: 99
      &:hover
        color: #f1f1f1
    #play
      width: 100%
      height: 500px
    .control
      margin-top: 20px
      width: 100%
      height: 80px
      background-color: #000000
      display: flex
      align-items: center
      position: relative
      .format-time
        width: 80px
        height: 30px
        display: flex
        align-items: center
        justify-content: center
        background-color: rgba(0,0,0, 0.6)
        color: #ffffff
        border-radius: 5px
        position: absolute
        top: -30px
        z-index: 99
      .progress
        width: 100%
        height: 10px
        position: absolute
        top: 0
        left: 0
        background-color: rgb(101, 90, 99)
        cursor: pointer
        z-index: 1
        .progress-cache
          width: auto
          height: 10px
          position: absolute
          top: 0
          left: 0
          background-color: rgb(185, 185, 185)
          z-index: 2
        .progress-current
          width: auto
          height: 10px
          position: absolute
          top: 0
          left: 0
          background-color: rgb(255,101,53)
          z-index: 3
      .control-button
        width: 80px
        height: 80px
        display: flex
        align-items: center
        justify-content: center
        font-size: 2.5rem
        color: #ffffff
        cursor: pointer
        position: relative
        .volume
          width: 50px
          height: 200px
          position: absolute
          top: -190px
          left: 15px
          z-index: 100
          background-color: #ffffff
          display: flex
          align-items: center
          justify-content: center
        img
          width: 70px
          height: 70px
        &.active
          color: #ff5700
          &:hover
            color: #ff5700
        &.loading
          cursor: auto
        &:hover
          color: #f1f1f1
</style>
