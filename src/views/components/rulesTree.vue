<!--
---- el-tree这个组件单独封装报 [warn]错误, "TypeError: Cannot read property 'setAttribute' of undefined"
---- 后面来处理
--->
<template>
  <el-tree
    :data="rules"
    :highlight-current="true"
    :default-expand-all="true"
    :check-strictly="true"
    :expand-on-click-node="false"
    show-checkbox
    ref="authorizationTree"
    @node-click="nodeClick"
    node-key="id"
    :default-checked-keys="checkedKeys"
    :props="defaultProps">
  </el-tree>
</template>
<script>
  export default {
    props: {
      // 默认选中的节点
      checkedKeys: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        rules: [0],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      /**
       * TODO 点击之后使用Vnode来处理,抛弃以下方法
       */
      nodeClick (data, vNode) {
        vNode.checked = !vNode.checked
        if (vNode.childNodes.length > 0) {
          this.children(vNode.childNodes, vNode.checked)
        }
        if (vNode.level > 0) {
          this.parents(vNode.parent, vNode.checked)
        }
      },
      children (vNode, checked) {
        vNode.forEach(item => {
          item.checked = checked
          if (item.childNodes.length > 0) {
            this.children(item.childNodes, checked)
          }
        })
      },
      parents (vNode, checked) {
        if (checked) {
          vNode.checked = checked
        } else {
          let isCancel = true
          vNode.childNodes.forEach(item => {
            if (item.checked) {
              isCancel = false
            }
          })
          if (isCancel) {
            vNode.checked = checked
          }
        }
        if (vNode.level > 0) {
          this.parents(vNode.parent, checked)
        }
      }
    },
    mounted () {
      let _ = setTimeout(() => {
        this.showLoading(this.$parent.$refs.dialog)
      }, 500)
      this
        .$api
        .rule
        .infinite()
        .then(r => {
          clearTimeout(_)
          this.rules = r
        })
    }
  }
</script>
<style lang="sass">
  .el-checkbox
    pointer-events: none
    cursor: pointer
</style>
