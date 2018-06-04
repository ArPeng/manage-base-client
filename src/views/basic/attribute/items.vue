<template>
  <div class="main">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="createAttribute"
      v-if="auth('basic.attribute.create')">新增</el-button>
    <div>
      <template v-for="item in items">
        <div class="attribute-item">
          <div class="title">{{item.name}}</div>
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
