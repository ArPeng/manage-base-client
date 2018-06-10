<template>
  <div class="main">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="createAttribute"
      v-if="auth('basic.attribute.create')">新增</el-button>
    <el-button
      type="primary"
      icon="el-icon-sort"
      size="small"
      @click="sort"
      v-if="auth('basic.attribute.sort')">排序</el-button>
    <div>
      <template v-for="item in items">
        <div class="attribute-item">
          <div class="title">
            <el-input
              size="mini"
              type="number"
              v-if="auth('basic.attribute.sort')"
              v-model.trim="item.sort"
              style="width: 60px;text-align: center"></el-input>
            <span style="margin-left: .5rem">{{item.name}}</span>
            <div class="action">
              <el-button
                v-if="auth('basic.attribute.delete')"
                type="danger"
                @click="deleteAttribute(item.id)"
                icon="el-icon-delete"
                size="small"></el-button>
            </div>
          </div>
          <div class="attribute-content">
            <template v-for="attach in item.attach">
              <el-tag
                v-if="auth('basic.attribute.delete.attach')"
                :key="item.id+'-'+attach.id"
                closable
                :disable-transitions="false"
                @close="deleteAttach(attach.id)">
                {{attach.name}}
              </el-tag>
              <el-tag
                v-else
                :key="item.id+'-'+attach.id">
                {{attach.name}}
              </el-tag>
            </template>
            <template v-if="auth('basic.attribute.create.attach')">
              <el-input
                class="input-new-tag"
                v-if="item.showInput"
                v-model.trim="inputValue"
                :ref="'saveInput_'+item.id"
                size="small"
                @keyup.enter.native="createAttach(item)"
                @blur="createAttach(item)" ></el-input>
              <el-button class="button-new-tag" v-else  size="small" @click="showInput(item)">添加</el-button>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputValue: '',
      items: []
    }
  },
  methods: {
    /**
     *  删除属性
     */
    deleteAttribute (id) {
      this.$confirm('确定要删除吗?删除之后不可恢复!', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .attribute
          .del(id)
          .then(r => {
            this.toast('删除成功')
            this.getData()
          })
      })
    },
    /**
     * 排序
     */
    sort () {
      let sort = []
      this.items.map(item => {
        sort.push({id: item.id, sort: item.sort})
      })
      this.showLoading()
      this
        .$api
        .attribute
        .sort(sort)
        .then(r => {
          this.getData()
        })
    },
    // 创建属性
    createAttribute () {
      this.$prompt('请输入属性名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.showLoading()
        this
          .$api
          .attribute
          .create(value)
          .then(r => {
            this.getData()
            this.toast('添加成功!')
          })
      })
    },
    // 获取属性列表
    getData () {
      this.showLoading()
      this
        .$api
        .attribute
        .items()
        .then(items => {
          this.items = items.map(item => {
            item.showInput = false
            return item
          })
        })
    },
    // 删除属性值
    deleteAttach (attachId) {
      this.$confirm('确定要删除吗?删除之后不可恢复!', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showLoading()
        this
          .$api
          .attribute
          .delAttach(attachId)
          .then(r => {
            this.getData()
            this.toast('删除成功')
          })
      })
    },

    showInput (item) {
      item.showInput = true
      this.$nextTick(_ => {
        this.$refs['saveInput_' + item.id][0].$refs.input.focus()
      })
    },
    // 创建属性值
    createAttach (item) {
      let name = this.inputValue
      if (name) {
        this.showLoading()
        this
          .$api
          .attribute
          .createAttach(name, item.id)
          .then(r => {
            this.getData()
            this.toast('添加成功')
          })
      }
      item.showInput = false
      this.inputValue = ''
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="sass">
  .title
    input
      text-align: center
</style>
<style scoped lang="sass">
  .attribute-item
    width: 100%
    height: auto
    border: 1px solid #ebebeb
    margin-top: 1rem
    &:first-child
      margin-top: 2rem
    .title
      width: 100%
      height: 50px
      padding:  0 20px
      display: flex
      align-items: center
      font-size: 1rem
      background-color: #ebebeb
      .action
        display: flex
        flex: 1
        height: 100%
        justify-content: flex-end
        align-items: center
    .attribute-content
      width: 100%
      height: auto
      padding: 20px
      .input-new-tag
        width: 90px
        margin-right: 10px
        margin-top: 10px
        height: 32px
        line-height: 30px
        padding-top: 0
        padding-bottom: 0
      .button-new-tag
        width: 90px
        margin-right: 10px
        margin-top: 10px
        vertical-align: bottom
      .el-tag
        margin-right: 10px
</style>
