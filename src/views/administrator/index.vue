<template>
  <div class="app-container">
    <div class="app-header">
      <mu-float-button icon="add" class="mall-btn-success" />
    </div>
    <div class="app-content">
      <mu-table :selectable="false" :showCheckbox="false" :fixedHeader="true">
        <mu-thead>
          <mu-tr>
            <mu-th>ID</mu-th>
            <mu-th>用户名</mu-th>
            <mu-th>用户组</mu-th>
            <mu-th>手机号码</mu-th>
            <mu-th>登录次数</mu-th>
            <!--<mu-th>创建时间</mu-th>-->
            <!--<mu-th>最后一次登录时间</mu-th>-->
            <!--<mu-th>最后一次登录IP</mu-th>-->
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <template v-for="i in 50">
            <mu-tr>
              <mu-td>1</mu-td>
              <mu-td>peter</mu-td>
              <mu-td>草鸡管理员</mu-td>
              <mu-td>13123144888</mu-td>
              <mu-td>343</mu-td>
              <!--<mu-td>2016-12-11 12:11</mu-td>-->
              <!--<mu-td>2016-12-11 12:11</mu-td>-->
              <!--<mu-td>192.168.1.1</mu-td>-->
              <mu-td>
                <mu-raised-button label="编辑" class="mall-btn-success table-button"/>
                <mu-raised-button label="授权" class="mall-btn-success table-button"/>
                <mu-raised-button label="禁用" class="mall-btn-danger table-button"/>
              </mu-td>
            </mu-tr>
          </template>
        </mu-tbody>
      </mu-table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped lang="stylus" src="@styl/administrator/index.styl"></style>
