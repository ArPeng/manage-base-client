<template>
  <div class="member">
    <div class="items">
      <div class="item">
        <div class="icon">
          <div class="v-font icon-box" style="color: #40c9c6">&#xe622;</div>
        </div>
        <div class="info">
          <div class="desc">今日新增</div>
          <div class="num">
            <countTo
              :startVal="0"
              separator=","
              :endVal="register.today"
              :duration="1500"></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <div class="v-font icon-box" style="color: #40c9c6">&#xe622;</div>
        </div>
        <div class="info">
          <div class="desc">本周新增</div>
          <div class="num">
            <countTo
              :startVal="0"
              separator=","
              :endVal="register.week"
              :duration="1500"></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <div class="v-font icon-box" style="color: #40c9c6">&#xe622;</div>
        </div>
        <div class="info">
          <div class="desc">本月新增</div>
          <div class="num">
            <countTo
              :startVal="0"
              separator=","
              :endVal="register.month"
              :duration="1500"></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <div class="v-font icon-box" style="color: #40c9c6">&#xe622;</div>
        </div>
        <div class="info">
          <div class="desc">用户总数</div>
          <div class="num">
            <countTo
              :startVal="0"
              separator=","
              :endVal="register.all"
              :duration="1500"></countTo>
          </div>
        </div>
      </div>
    </div>
    <div class="charts">
      <ui-e-charts
        :option="todayOption"
        :loading="loading"
        @ready="onReady"
        @click="onClick"></ui-e-charts>
    </div>
  </div>
</template>
<script>
import uiECharts from 'vue-echarts-v3/src/lite'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import countTo from 'vue-count-to'
export default {
  components: {
    countTo,
    uiECharts
  },
  data () {
    return {
      loading: true,
      register: {
        today: 0,
        week: 0,
        month: 0,
        all: 0
      },
      interval: 0,
      todayOption: {
        title: {
          text: '今日注册量走势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['今日00:00到当前注册量', '上一个小时到当前']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '今日00:00到当前注册量',
          data: [],
          stack: '总量',
          type: 'line',
          areaStyle: {}
        },
        {
          name: '上一个小时到当前',
          data: [],
          stack: '总量',
          type: 'line',
          areaStyle: {}
        }]
      }
    }
  },
  watch: {
    $route () {
      clearInterval(this.interval)
    }
  },
  methods: {
    onReady (instance) {
      console.log(instance)
    },
    onClick (event, instance, echarts) {
      console.log(arguments)
    },
    /**
     * @获取今日注册走势
     */
    todayRegisterMovements () {
      this
        .$api
        .statistical
        .todayRegisterMovements()
        .then(r => {
          this.todayOption.xAxis.data = r.xAxis
          this.todayOption.series = [{
            name: '截止当前注册量: ',
            data: r.series,
            stack: '总量',
            type: 'line',
            areaStyle: {}
          },
          {
            name: '当前一个小时内注册量: ',
            data: r.period,
            stack: '总量',
            type: 'line',
            areaStyle: {}
          }]
        })
    },
    /**
     * @purpose 获取会员注册量
     */
    memberRegister () {
      this
        .$api
        .statistical
        .memberRegister()
        .then(r => {
          this.loading = false
          this.register = r
        })
    }
  },
  created () {
    this.memberRegister()
    this.todayRegisterMovements()
    this.interval = setInterval(() => {
      this.todayRegisterMovements()
      this.memberRegister()
    }, 10000)
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>
<style scoped lang="sass">
  .member
    width: 100%
    height: 100%
    .charts
      width: 1420px
      height: 500px
      margin-top: 20px
      background-color: #ffffff
      padding: 1rem
    .items
      width: 1420px
      height: auto
      display: flex
      align-items: center
      .item
        width: 340px
        height: 120px
        background-color: #ffffff
        box-shadow: 0 0 10px #dddddd
        margin-right: 20px
        cursor: pointer
        transition: all .5s
        display: flex
        align-items: center
        &:hover
          box-shadow: 0 0 20px #cccccc
          .icon
            .icon-box
              font-size: 5rem
              text-shadow: 4px 4px 4px #40c9c6
        &:last-child
          margin-right: 0
        .info
          flex: 1
          height: 120px
          float: left
          display: flex
          flex-direction: column
          justify-content: center
          text-align: right
          padding-right: 1rem
          .desc
            font-size: 1rem
            color: #999999
          .num
            font-size: 1.5rem
            margin-top: .5rem
            font-weight: bold
        .icon
          width: 120px
          height: 120px
          display: flex
          align-items: center
          justify-content: center
          float: left
          .icon-box
            width: 100px
            height: 100px
            transition: all .3s
            font-size: 4.5rem
            border-radius: 5px
            display: flex
            align-items: center
            justify-content: center
</style>
