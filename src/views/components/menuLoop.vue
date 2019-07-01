<!--
---- 该组件用户菜单的递归循环
--->
<template>
  <div class="sidebar-box">
    <template v-for="item,idx in data">
      <template v-if="item.child && item.child.length > 0">
        <el-submenu :index="index?`${index}-${idx}`:`${idx}`">
          <template slot="title">
            <i v-if="item.icon_class"
               :class="`${item.icon_family} ${item.icon_class}`"></i>
            <i class="an-mall-icon icon-liebiao" v-else-if="level === 1"></i>
            <span>{{item.name}}</span>
          </template>
            <menu-loop
              :level="level + 1"
              :index="index?`${index}-${idx}`:`${idx}`"
              :data="item.child"></menu-loop>
            <!--<el-menu-item-->
            <!--index="1-1"-->
            <!--@click="jump({name:'permission.administrator.list'})">列表</el-menu-item>-->
            <!--<el-menu-item-->
            <!--index="1-2"-->
            <!--@click="jump({name:'permission.administrator.create'})">添加</el-menu-item>-->
        </el-submenu>
      </template>
      <template v-else-if="level === 1 && mini">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          placement="right">
          <el-menu-item :index="index?`${index}-${idx}`:`${idx}`"
                        @click="jump({name: item.identification})">
              <i v-if="item.icon_class"
                 :class="`${item.icon_family} ${item.icon_class}`"></i>
              <i class="an-mall-icon icon-liebiao" v-else-if="level === 1"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-tooltip>
      </template>
      <template v-else>
        <el-menu-item :index="index?`${index}-${idx}`:`${idx}`"
                      @click="jump({name: item.identification})">
          <i v-if="item.icon_class"
             :class="`${item.icon_family} ${item.icon_class}`"></i>
          <i class="an-mall-icon icon-liebiao" v-else-if="level === 1"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'menuLoop',
    props: {
      mini: {
        type: Boolean,
        default: false
      },
      // 菜单数据
      data: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 1
      },
      index: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    }
  }
</script>
<style lang="sass">
  .an-mall-icon
    vertical-align: middle
    margin-right: 5px
    width: 24px
    text-align: center
    font-size: 18px
  .el-menu--collapse
    .el-submenu__title
      span
        display: none
      i.el-submenu__icon-arrow
        display: none
    li.el-menu-item
      >span
        display: none
    .el-submenu.is-opened
      .el-menu
        span
          display: block
        .el-submenu__title
          span
            display: block
          i.el-submenu__icon-arrow
            display: block
</style>
<style lang="sass">
  .sidebar-box
    width: 100%
    height: 100%
    overflow-x: hidden
    overflow-y: auto
</style>
