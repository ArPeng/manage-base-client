<!--
--- 管理员授权组件
-->
<template>
  <el-dialog
    title="选择权限"
    :append-to-body="true"
    :show-close="false"
    width="400px"
    style="min-height: 500px"
    :close-on-click-modal="false"
    :visible.sync="show">
    <div class="authorization-box">
      <rules-tree
        v-if="show"
        ref="tree"
        :checkedKeys="checkedKeys"
      ></rules-tree>
    </div>
    <span slot="footer">
      <el-button @click="$emit('update:show', false)">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import rulesTree from './rulesTree.vue'
  export default {
    components: {
      rulesTree
    },
    props: {
      // 默认选中的节点
      checkedKeys: {
        type: Array,
        default: () => []
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      /**
       * @purpose 获取选中的节点
       * @returns {boolean}
       */
      submit () {
        let $tree = this.$refs.tree.$refs.authorizationTree
        let nodes = $tree.getCheckedNodes()
        let keys = $tree.getCheckedKeys()
        if (keys.length < 1) {
          this.$message.error(this.$lang('请至少选择一个!'))
          return false
        }
        this.$emit('update:show', false)
        this.$emit('get-rules', keys, nodes)
      }
    }
  }
</script>
<style lang="sass">
  .authorization-box
    width: 100%
    height: 500px
    overflow-y: auto
</style>
