<template>
  <div class="tags-box">
    <el-tag
      size="small"
      color="#ffffff"
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type">
      {{tag.name}}
    </el-tag>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: '' },
          { name: '标签三', type: '' },
          { name: '标签四', type: '' },
          { name: '标签一', type: '' },
          { name: '标签二', type: '' },
          { name: '标签三', type: '' },
          { name: '标签四', type: '' },
          { name: '标签一', type: '' },
          { name: '标签二', type: '' },
          { name: '标签三', type: '' },
          { name: '标签四', type: '' },
          { name: '标签五', type: '' }
        ]
      }
    }
  }
</script>
<style scoped lang="sass">
  .tags-box
    width: calc(75% - 210px)
    height: 100%
    float: left
    overflow-y: auto
    display: flex
    align-items: center
    .el-tag
      margin-left: 5px
      cursor: pointer
</style>
