<template>
  <div class="main">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      v-if="auth('basic.attribute.create')">新增</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped></style>
