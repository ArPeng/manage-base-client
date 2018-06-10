<!--
--- 处理无限极分类的option选项 递归组件
-->
<template>
  <div>
    <template v-if="items.length > 0" v-for="item,idx in items">
      <template v-if="selectLast">
        <el-option
          :key="item.id"
          :select-last="selectLast"
          :disabled="item.children && item.children.length > 0"
          :label="levelString(level, idx) + item.name"
          :value="item.id"></el-option>
        <template v-if="item.id === thisId">
          <create-infinite
            :select-last="selectLast"
            :disabled="item.children && item.children.length > 0"
            v-if="item.children && item.children.length > 0"
            :items="item.children"
            :level="level + 1"></create-infinite>
        </template>
        <template v-else>
          <create-infinite
            :select-last="selectLast"
            :disabled="item.children && item.children.length > 0"
            :this-id="thisId"
            v-if="item.children && item.children.length > 0"
            :items="item.children"
            :level="level + 1"></create-infinite>
        </template>
      </template>
      <template v-else>
        <el-option
          :key="item.id"
          :disabled="disabled || item.id === thisId"
          :label="levelString(level, idx) + item.name"
          :value="item.id"></el-option>
        <template v-if="item.id === thisId">
          <create-infinite
            :disabled="true"
            v-if="item.children && item.children.length > 0"
            :items="item.children"
            :level="level + 1"></create-infinite>
        </template>
        <template v-else>
          <create-infinite
            :disabled="disabled"
            :this-id="thisId"
            v-if="item.children && item.children.length > 0"
            :items="item.children"
            :level="level + 1"></create-infinite>
        </template>
      </template>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'createInfinite',
    props: {
      level: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      thisId: {
        type: Number
      },
      items: {
        type: Array,
        default: () => {
          return []
        }
      },
      selectLast: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      /**
       * @purpose 等级化子父级关系
       * @param level
       * @param idx
       * @returns {*}
       */
      levelString (level, idx) {
        if (level === 1) {
          return '├ '
        }
        let string = '│'
        for (let i = 1; i <= level; i++) {
          if ((i + 1) < level) {
            string += string
          } else if (i === level) {
           // if (idx === (this.items.length - 1) && this.items.length > 1) {
            if (idx === (this.items.length - 1)) {
              string += '└ '
            } else {
              string += '├ '
            }
          }
        }
        return string
      }
    },
    data () {
      return {}
    },
    created () {
      // console.log('disabled:', this.disabled)
    }
  }
</script>
<style scoped lang="sass"></style>
