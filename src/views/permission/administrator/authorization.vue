<template>
  <el-dialog
    title="管理员授权"
    :append-to-body="true"
    :show-close="false"
    width="60%"
    ref="authorizationToUser"
    :close-on-click-modal="false"
    :visible.sync="show">
    <div class="dialog-content">
      <el-row>
        <el-col :span="4">
          <div class="item-name">管理组:</div>
        </el-col>
        <el-col :span="20">
          <div class="item-content">
            <el-checkbox-group v-model="selectedGroups">
              <template v-for="item in groups">
                <el-checkbox class="group-item" size="mini" :label="String(item.id)">{{item.name}}</el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="item-name">额外权限:</div>
        </el-col>
        <el-col :span="20">
          <rules-tree
            ref="rulesTree"
            :checkedKeys="defaultRules"
            v-if="show"
          ></rules-tree>
        </el-col>
      </el-row>
    </div>
    <span slot="footer">
      <el-button @click="$emit('update:show', false)">取 消</el-button>
      <el-button type="primary" @click="submit">授权</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import rulesTree from '@components/rulesTree.vue'
  export default {
    components: {
      rulesTree
    },
    props: {
      // 已经拥有的管理组权限
      defaultGroups: {
        type: Array,
        default: () => []
      },
      // 已经拥有的额外权限
      defaultRules: {
        type: Array,
        default: () => []
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 选中的用户组ID
        selectedGroups: [],
        // 全部用户组
        groups: []
      }
    },
    watch: {
      defaultGroups (val) {
        this.selectedGroups = val
      }
    },
    methods: {
      submit () {
        let rules = this.$refs.rulesTree.$refs.authorizationTree.getCheckedKeys()
        if (rules.length > 0) {
          rules = rules.join(',')
        } else {
          rules = ''
        }
        this.$emit('submit', this.selectedGroups.join(','), rules)
        this.$emit('update:show', false)
      }
    },
    created () {
      // 获取用户组列表
      let autoLoading = setTimeout(() => {
        this.showLoading(this.$refs.authorizationToUser)
      }, 4000)
      this
        .$api
        .group
        .all()
        .then(r => {
          clearTimeout(autoLoading)
          this.groups = r
        })
      if (this.defaultGroups.length > 0) {
        this.selectedGroups = this.defaultGroups
      }
    }
  }
</script>
<style scoped lang="sass">
  .item-name
    width: 100%
    height: 40px
    font-size: 16px
    text-align: right
    line-height: 40px
    padding-right: 10px
  .item-content
    width: 100%
    height: auto
    padding: 8px 0
    .group-item
      margin: 0 20px 0 0
  .dialog-content
    width: 100%
    min-height: 400px
</style>
