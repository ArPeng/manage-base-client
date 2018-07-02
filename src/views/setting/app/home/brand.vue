<template>
  <div class="brand">
    <el-row>
      <el-col :span="12" :offset="3">
        <el-alert
          title="注意: 展示图片必须是600x200的大小,且不能超过500kb,且只能是jpg格式,否则会上传失败!"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <template v-for="(brand, idx) in brands">
        <el-col :span="12" :offset="3" :key="'brand' + idx">
          <div class="close" @click="del(idx)" v-if="brands.length > 1">
            <i class="el-icon-delete"></i>
          </div>
          <el-form label-position="left" label-width="80px">
            <el-form-item label="序号">
              <el-input v-model.trim="brand.sort" style="width: 100px" type="number"></el-input>
            </el-form-item>
            <el-form-item label="品牌ID">
              <el-input v-model.trim="brand.id" style="width: 100px" type="number"></el-input>
            </el-form-item>
            <el-form-item label="品牌名字">
              <el-input v-model.trim="brand.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="展示图片">
              <div class="image" @click="showUpload = true; _brand = brand">
                <img v-if="brand.image" :src="imageUrl + brand.image">
                <img v-else :src="require('@assets/upload.png')">
              </div>
              <!--<el-input v-model.trim="formLabelAlign.region"></el-input>-->
            </el-form-item>
          </el-form>
        </el-col>
      </template>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-button type="default" @click="add">添加一组</el-button>
        <el-button type="primary" @click="setBrand">保存</el-button>
      </el-col>
    </el-row>
    <ui-upload
      :limit-width="600"
      :limit-height="200"
      :limit-size="500"
      @image="getImage"
      :show.sync="showUpload"></ui-upload>
  </div>
</template>
<script>
  import uiUpload from '@components/upload'
  export default {
    components: {
      uiUpload
    },
    data () {
      return {
        imageUrl: this.config('imageUrl'),
        _brand: null,
        showUpload: false,
        brands: []
      }
    },
    methods: {
      del (idx) {
        this.$confirm('确定要删除吗?删除之后不可恢复!', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.brands = this.brands.filter((brand, index) => {
            return idx !== index
          })
        }).catch(() => {})
      },
      /**
       * @purpose 获取上传的图片地址
       * @param image
       */
      getImage (image) {
        this._brand.image = image
      },
      /**
       * @purpose 添加一组数据
       */
      add () {
        this.brands.push(
          {
            sort: this.brands.length, // 排序字段
            image: '', // 图片地址
            name: '', // 品牌名字
            id: 0 // 品牌ID
          })
      },
      /**
       *  保存轮播图信息
       */
      setBrand () {
        if (!this.brands.every(brand => brand.image.indexOf('/') === 0)) {
          this.toast('缩略图是不可缺少的一下,您的轮播图中有没有有上传缩略图的一项,请仔细检查!', 'warning')
          return false
        }
        if (!this.brands.every(brand => Boolean(brand.id))) {
          this.toast('有一项的品牌ID没有填写,请仔细检查!', 'warning')
          return false
        }
        if (!this.brands.every(brand => Boolean(brand.name))) {
          this.toast('有一项的品牌名字没有填写,请仔细检查!', 'warning')
          return false
        }
        this.showLoading()
        this
          .$api
          .configure
          .setAppBrand(this.brands)
          .then(r => {
            this.toast('保存成功')
            this.getBrand()
          })
      },
      /**
       * @purpose 获取轮播图信息
       */
      getBrand () {
        this.showLoading()
        this
          .$api
          .configure
          .getAppBrand()
          .then(r => {
            if (r instanceof Array && r.length > 0) {
              this.brands = r
            } else {
              this.add()
            }
          })
      }
    },
    created () {
      this.getBrand()
    }
  }
</script>
<style scoped lang="sass">
  .el-col
    margin: 1rem 0 1rem 12.5%
    padding: 1rem
    background-color: #f4f4f4
    border-radius: 5px
    position: relative
    .close
      width: 2rem
      height: 2rem
      position: absolute
      right: 0
      top: 0
      background-color: #ffffff
      border-top-right-radius: 5px
      display: flex
      align-items: center
      justify-content: center
      font-size: 1rem
      color: #ff4700
      cursor: pointer
      &:hover
        background-color: #f4f4f4
    .image
      width: 300px
      height: 100px
      background-color: #ffffff
      cursor: pointer
      &:hover
        background-color: #f9f9f9
      img
        width: 100%
        height: 100%
    .el-radio
      margin: .3rem 10px .3rem 0 !important
      background-color: #ffffff
</style>
