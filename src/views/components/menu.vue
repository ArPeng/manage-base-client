<template>
  <el-menu
    default-active="2"
    :collapse="mini"
    background-color="#324157"
    text-color="#fff"
    class="sidebar"
    active-text-color="#409EFF">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>管理员</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="1-1"
          @click="jump({name:'permission.administrator.list'})">列表</el-menu-item>
        <el-menu-item
          index="1-2"
          @click="jump({name:'permission.administrator.create'})">添加</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>管理组</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="2-1"
          @click="jump({name:'permission.group.list'})">列表</el-menu-item>
        <el-menu-item
          index="2-2"
          @click="jump({name:'permission.group.create'})">添加</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="3-1"
          @click="jump({name:'permission.rule.list'})">列表</el-menu-item>
        <el-menu-item
          index="3-2"
          @click="jump({name:'permission.rule.create'})">添加</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    props: {
      mini: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    }
  }
</script>
<style scoped lang="sass"></style>
