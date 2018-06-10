<template>
    <div class="detail" v-show="show" ref="detail">
      <template>
        <div class="hint">
          <div class="text">基础信息</div>
        </div>
        <div class="items">
          <div class="item">
            <div
              class="field">
              标题:
            </div>
            <div class="box">
              {{goods.title}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              商品ID:
            </div>
            <div class="box">
              {{goods.id}}
            </div>
          </div>
          <div class="item" style="height: 100px">
            <div
              class="field">
              缩略图:
            </div>
            <div class="box">
              <el-popover
                placement="right"
                width="500"
                trigger="hover">
                <img :src="imageUrl + goods.thumb" style="width: 100%;height: 100%">
                <img slot="reference" :src="imageUrl + goods.thumb" style="width: 80px;height: 80px">
              </el-popover>
            </div>
          </div>
          <div class="item" style="height: 100px">
            <div
              class="field">
              轮播图:
            </div>
            <div class="box">
              <div
                style="width: 80px;height: 80px;margin-right: .5rem"
                v-for="(image,idx) in goods.images" :key="'image-key-' + idx">
                <el-popover
                  placement="right"
                  width="500"
                  trigger="hover">
                  <img :src="imageUrl + image" style="width: 100%;height: 100%">
                  <img slot="reference" :src="imageUrl + image" style="width: 100%;height: 100%">
                </el-popover>
              </div>
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              商品价格:
            </div>
            <div class="box">
              {{Number(goods.price).toFixed(2)}}元
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              商品库存:
            </div>
            <div class="box">
              {{goods.stock}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              所属分类:
            </div>
            <div class="box">
              {{goods.category_name}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              所属品牌:
            </div>
            <div class="box">
              {{goods.brand_name}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              商品浏览量:
            </div>
            <div class="box">
              {{goods.views}}
            </div>
          </div>
          <div class="item">
            <div
              class="field">
              被分享次数:
            </div>
            <div class="box">
              {{goods.shares}}
            </div>
          </div>
        </div>
      </template>
      <template>
        <div class="hint">
          <div class="text">图文详情</div>
        </div>
        <div class="text-picture-detail">
          <div class="content" v-html="goods.article"></div>
        </div>
      </template>
      <template v-if="goods.parameter.length > 0">
        <div class="hint">
          <div class="text">商品参数</div>
        </div>
        <div class="items">
          <div class="item" v-for="parameter in goods.parameter">
            <div class="field">{{parameter.key}}</div>
            <div class="box">{{parameter.val}}</div>
          </div>
        </div>
      </template>
      <template v-if="goods.attribute_attach.length > 0">
        <div class="hint">
          <div class="text">商品属性</div>
        </div>
        <div class="items">
          <div class="item"
               :key="'attribute-attach-key' + idx"
               v-for="(attach,idx) in goods.attribute_attach">
            <div class="box">
              <p style="width: 100%;font-weight: bold;">
                属性:
                <template v-for="(attr,index) in attach.attach">
                  <el-tag
                    style="margin-right: .2rem"
                    size="mini"
                    :key="'attr-'+idx+'-' + index">{{attr.name}}</el-tag>
                </template>
              </p>
            </div>
            <div class="box">
              <p style="width: 100%;font-weight: bold;">编号: {{attach.number}}</p>
            </div>
            <div class="box">
              <p style="width: 100%;font-weight: bold;">价格: {{Number(attach.number).toFixed(2)}}元</p>
            </div>
            <div class="box">
              <p style="width: 100%;font-weight: bold;">库存: {{attach.stock}}</p>
            </div>
            <div class="img" style="width: 60px;display: flex;align-items: center;justify-content: center">
              <el-popover
                placement="left"
                width="500"
                trigger="hover">
                <img :src="imageUrl + attach.thumb" style="width: 100%;height: 100%">
                <img slot="reference" :src="imageUrl + attach.thumb" style="width: 40px;height: 40px;margin-top: 5px">
              </el-popover>
            </div>
          </div>
        </div>
      </template>
    </div>
</template>

<script>
  import config from '@config'
  export default {
    name: 'detail',
    data () {
      return {
        imageUrl: config.imageUrl,
        goods: {
          category: '',
          title: '',
          thumb: '',
          stock: 0,
          images: [],
          parameter: [],
          article: '',
          attribute_attach: [],
          attribute: [],
          price: '0.00',
          brand: 0 // 商品数据
        }
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      id: {
        type: Number,
        default: 0
      }
    },
    watch: {
      show (_show) {
        console.log(_show, this.id)
        if (_show && this.id > 0) {
          // 获取商品数据
          this.getData()
        }
      }
    },
    methods: {
      /**
       * @purpose 获取商品详情数据
       */
      getData () {
        this.showLoading(this.$refs.detail)
        this
          .$api
          .goods
          .infoById(this.id)
          .then(r => {
            if (r.article.indexOf(this.imageUrl) < 0) {
              r.article = r.article.split('src="').join('src="' + this.imageUrl)
            }
            this.goods = r
          })
      }
    },
    mounted () {
      if (this.show && this.id > 0) {
        this.getData()
      }
    }
  }
</script>

<style scoped lang="sass">
  .detail
    width: 100%
    height: 100%
    .hint
      width: 100%
      height: 40px
      display: flex
      align-items: center
      border-left: 4px solid #09bb07
      background-color: #ebebeb
      margin: 1.5rem 0
      .text
        font-size: 1rem
        margin-left: .5rem
        font-weight: bold
    .items
      width: 100%
      height: auto
      .item
        width: 100%
        height: 50px
        border: 1px solid #ebebeb
        display: flex
        align-items: center
        border-top: none
        &:first-child
          border-top: 1px solid #ebebeb
        .box
          flex: 1
          height: 100%
          display: flex
          align-items: center
          padding: 0 1rem
          border-right: 1px solid #ebebeb
          &:last-child
            border-right: none
        .field
          width: 150px
          height: 100%
          border-right: 1px solid #ebebeb
          display: flex
          align-items: center
          font-size: 1rem
          font-weight: bold
          justify-content: flex-end
          padding-right: 1rem
    .text-picture-detail
      width: 100%
      height: 500px
      display: flex
      justify-content: center
      .content
        width: 320px
        height: 100%
        overflow-x: hidden
        overflow-y: auto
        padding: 1rem
        border-radius: 5px
        background-color: #f4f4f4
</style>
