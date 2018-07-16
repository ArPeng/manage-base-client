<template>
  <div class="slide">
    <el-row>
      <el-col :span="12" :offset="3">
        <el-alert
          title="注意: 展示图片必须是700x530的大小,且不能超过500kb,且只能是jpg格式,否则会上传失败!"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <template v-for="(slide, idx) in slider">
        <el-col :span="12" :offset="3" :key="'slide' + idx">
          <div class="close" @click="del(idx)" v-if="slider.length > 1">
            <i class="el-icon-delete"></i>
          </div>
          <el-form label-position="left" label-width="80px">
            <el-form-item label="序号">
              <el-input v-model.trim="slide.sort" style="width: 100px" type="number"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <div class="image" @click="showUpload = true; _slide = slide">
                <img v-if="slide.image" :src="imageUrl + slide.image">
                <img v-else :src="require('@assets/upload.png')">
              </div>
              <!--<el-input v-model.trim="formLabelAlign.region"></el-input>-->
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model.trim="slide.descriptions"></el-input>
            </el-form-item>
            <el-form-item label="跳转类型">
              <el-radio-group v-model="slide.jump_type" size="mini">
                <el-radio :label="0" border>不跳转</el-radio>
                <el-radio :label="1" border>跳转到分类</el-radio>
                <el-radio :label="2" border>跳转到品牌</el-radio>
                <el-radio :label="3" border>跳转到商品</el-radio>
                <el-radio :label="4" border>跳转到网页</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="跳转路径">
              <el-input v-model.trim="slide.jump" :placeholder="(slide.jump_type === 4) ? '网页地址(带http/https)' : ''">
                <template slot="prepend" v-if="slide.jump_type === 0">不填写</template>
                <template slot="prepend" v-if="slide.jump_type === 1">分类ID</template>
                <template slot="prepend" v-if="slide.jump_type === 2">品牌ID</template>
                <template slot="prepend" v-if="slide.jump_type === 3">商品ID</template>
                <template slot="prepend" v-if="slide.jump_type === 4">URL</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </template>
      <el-col :span="12" style="display: flex;justify-content: flex-end">
        <el-button type="default" @click="add">添加一组</el-button>
        <el-button type="primary" @click="setSwiper">保存</el-button>
      </el-col>
    </el-row>
    <ui-upload
      :limit-width="700"
      :limit-height="350"
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
      _slide: null,
      showUpload: false,
      slider: []
    }
  },
  methods: {
    del (idx) {
      this.$confirm('确定要删除吗?删除之后不可恢复!', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.slider = this.slider.filter((slide, index) => {
          return idx !== index
        })
      }).catch(() => {})
    },
    /**
     * @purpose 获取上传的图片地址
     * @param image
     */
    getImage (image) {
      this._slide.image = image
    },
    /**
     * @purpose 添加一组数据
     */
    add () {
      this.slider.push(
        {
          sort: this.slider.length, // 排序字段
          image: '', // 图片地址
          descriptions: '', // 描述
          jump_type: 0, // 跳转类型
          jump: '' // 跳转链接
        })
    },
    /**
     *  保存轮播图信息
     */
    setSwiper () {
      if (!this.slider.every(slide => slide.image.indexOf('/') === 0)) {
        this.toast('缩略图是不可缺少的一下,您的轮播图中有没有有上传缩略图的一项,请仔细检查!', 'warning')
        return false
      }
      if (!this.slider.every(slide => (slide.jump_type !== 0) && slide.jump)) {
        this.toast('还有至少有一项没有填写,请仔细检查!', 'warning')
        return false
      }
      this.showLoading()
      this
        .$api
        .configure
        .setAppSwiper(this.slider)
        .then(r => {
          this.toast('保存成功')
          this.getSwiper()
        })
    },
    /**
     * @purpose 获取轮播图信息
     */
    getSwiper () {
      this.showLoading()
      this
        .$api
        .configure
        .getAppSwiper()
        .then(r => {
          if (r instanceof Array && r.length > 0) {
            this.slider = r
          } else {
            this.add()
          }
        })
    }
  },
  created () {
    this.getSwiper()
  }
}
</script>
<style scoped lang="sass">
  .el-col
    margin: 1rem 0 1rem 12.5%
    padding: 1rem
    background-color: #ffffff
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
      height: 150px
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
