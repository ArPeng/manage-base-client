<template>
  <div class="main">
    <el-row>
      <el-col :span="14" :offset="3">
        <el-alert
          title="注意: 分类缩略图必须是500x500的大小,且不能超过500kb,且只能是jpg格式,否则会上传失败!"
          type="info"
          show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          缩略图
        </div>
      </el-col>
      <el-col :span="18" style="margin-top: 1.5rem">
        <template v-for="(image,idx) in goodsData.images">
          <div class="images">
            <img :src="imageUrl + image">
            <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
              <div class="v-font delete" @click="removeImage(idx)">&#xe629;</div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="设置为封面" placement="top-end">
              <div class="v-font set-thumb" @click="setThumb(image)">&#xe616;</div>
            </el-tooltip>
            <div class="cover" v-if="image === goodsData.thumb">封面</div>
          </div>
        </template>
        <div class="thumb" @click="showUpload = true">
          <img :src="img">
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1rem">
      <el-col :span="3">
        <div class="field">
          商品分类
        </div>
      </el-col>
      <el-col :span="7">
        <el-select
          style="margin-top: 25px;width: 100%"
          v-model="goodsData.category"
          placeholder="请选择">
          <create-infinite
            :select-last="true"
            :items="categorys"></create-infinite>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1rem">
      <el-col :span="3">
        <div class="field">
          商品品牌
        </div>
      </el-col>
      <el-col :span="7">
        <el-select
          style="margin-top: 25px;width: 100%"
          v-model="goodsData.brand"
          placeholder="请选择">
          <el-option
            v-for="(brand, idx) in brands"
            :key="'brand-' + idx"
            :label="brand.name"
            :value="brand.id">
            <span style="float: left">{{ brand.name }}</span>
            <img :src="imageUrl + brand.thumb" style="float: right;width: 20px;height: 20px;margin: .5rem 0 0 .5rem">
            <span style="float: right; color: #8492a6; font-size: 13px">{{ brand.english }}</span>
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          商品价格
        </div>
      </el-col>
      <el-col :span="7">
        <el-input style="margin-top: 25px" type="number" placeholder="请输入内容" v-model="goodsData.price">
          <template slot="append">元</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          商品库存
        </div>
      </el-col>
      <el-col :span="7">
        <el-input style="margin-top: 25px" type="number" placeholder="请输入内容" v-model="goodsData.stock">
          <template slot="append">件</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          商品标题
        </div>
      </el-col>
      <el-col :span="18">
        <el-input style="margin-top: 1.5rem" v-model="goodsData.title"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          图文详情
        </div>
      </el-col>
      <el-col :span="18">
        <ui-editor
          :editor.sync="editor"
          :init-content="initContent"
          :content.sync="goodsData.article"
          style="margin-top: 2rem"></ui-editor>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          商品参数
        </div>
      </el-col>
      <el-col :span="18">
        <el-row v-for="(parameter,idx) in goodsData.parameter" :key="'parameter-'+idx">
          <el-col :span="10">
            <material-input v-model="parameter.key" type="text">参数名称</material-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <material-input v-model="parameter.val" type="text">参数值</material-input>
          </el-col>
          <el-col :span="3">
            <el-button
              @click="removeOneParameter(idx)"
              style="margin-top: 1.5rem;float: right"
              type="danger"
              icon="el-icon-delete"></el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button
              @click="addOneParameter"
              style="margin-top: 1.5rem;"
              icon="el-icon-plus"
              type="default">添加一组</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="field">
          商品属性
        </div>
      </el-col>
      <el-col :span="18" style="margin-top: 1.5rem">
        <template v-for="(attr,idx) in goodsAttribute">
          <el-row :key="'select-attr-' + idx">
            <el-col :span="3">
              <div
                class="filed"
                style="height: 40px;display: flex;align-items: center;justify-content: center">{{attr.name}}</div>
            </el-col>
            <el-col :span="18" style="padding-top: .5rem">
            <template v-for="attach in attr.attach">
              <el-checkbox
                v-model="attach.checked"
                style="margin: 0 .5rem .5rem 0"
                :label="attach.id"
                size="mini"
                @change="checkedAttribute"
                border>{{attach.name}}</el-checkbox>
            </template>
            </el-col>
          </el-row>
        </template>
          <el-row>
            <el-col :span="24">
              <el-button
                v-if="goodsAttribute.length > 0"
                style="margin-top: 1.8rem;"
                icon="el-icon-edit"
                @click="showSelectAttribute = true"
                type="default">选择属性</el-button>
              <el-button
                v-else
                icon="el-icon-edit"
                @click="showSelectAttribute = true"
                type="default">选择属性</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <table class="attribute" v-if="goodsData.attribute_attach.length > 0">
                <tr>
                  <template v-for="attribute in goodsData.attribute">
                    <th>{{attribute.name}}</th>
                  </template>
                  <th>
                    库存
                    <el-button
                      size="little"
                      style="margin-left: .5rem"
                      icon="el-icon-edit"
                      @click="batchStock"
                      type="primary"></el-button>
                  </th>
                  <th>
                    价格
                    <el-button
                      size="little"
                      style="margin-left: .5rem"
                      icon="el-icon-edit"
                      @click="batchPrice"
                      type="primary"></el-button>
                  </th>
                  <th>缩略图</th>
                </tr>
                <tr v-for="(attribute,idx) in goodsData.attribute_attach">
                  <template v-for="attr in attribute.attach">
                    <td>{{attr.name}}</td>
                  </template>
                  <td>
                    <el-input
                      size="mini"
                      v-model="attribute.stock"
                      type="number" :value="0"></el-input>
                  </td>
                  <td>
                    <el-input
                      size="mini" type="number" v-model="attribute.price"></el-input>
                  </td>
                  <td>
                    <img
                      v-if="attribute.thumb.indexOf('/') === 0"
                      :src="imageUrl + attribute.thumb"
                      @click="showAttributeUpload = true;attributeUploadIndex = idx" />
                    <img
                      v-else
                      :src="img"
                      @click="showAttributeUpload = true;attributeUploadIndex = idx" />

                  </td>
                </tr>
              </table>
            </el-col>
          </el-row>
          <el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="buttons">
          <el-button type="primary" style="margin-left: 1rem" @click="submit">保存</el-button>
          <el-button type="default" @click="clearLocalData">清空</el-button>
        </div>
      </el-col>
    </el-row>
    <ui-upload
      :limit-width="500"
      :limit-height="500"
      :limit-size="500"
      @image="image => {goodsData.images.push(image)}"
      :show.sync="showUpload"></ui-upload>
    <ui-upload
      :limit-width="500"
      :limit-height="500"
      :limit-size="500"
      @image="attributeImage"
      :show.sync="showAttributeUpload"></ui-upload>
    <template>
      <el-dialog
        title="选择商品属性"
        :close-on-click-modal="false"
        :visible.sync="showSelectAttribute"
        width="30%">
        <el-checkbox-group v-model="selectedAttribute" size="small">
          <template v-for="attr in attribute">
            <el-checkbox :label="attr.id" border>{{attr.name}}</el-checkbox>
          </template>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showSelectAttribute = false">取 消</el-button>
          <el-button type="primary" @click="getAttributeChecked">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import uiEditor from '@components/editor'
  import config from '@config'
  import uiUpload from '@components/upload'
  import MaterialInput from '@components/material/materialInput'
  import createInfinite from '@components/createInfinite.vue'
  export default {
    components: {
      MaterialInput,
      uiUpload,
      createInfinite,
      uiEditor
    },
    data () {
      return {
        attributeUploadIndex: null, // 上传图像时的属性的位置
        showAttributeUpload: false, // 显示属性上传商品
        selectedAttribute: [], // 选中的商品属性
        attribute: [], // 所有商品属性
        goodsAttribute: [], // 当前商品所使用的商品属性
        categorys: [], // 分类
        showSelectAttribute: false, // 显示选择属性弹窗
        imageUrl: config.imageUrl, // 图片域名
        img: require('@assets/upload.png'), // 默认显示图片
        showUpload: false, // 显示上传弹窗
        goodsData: {}, // 商品数据
        autoSave: null, // 自动保存
        firstLoading: true, // 是否是第一次加载
        initContent: '', // 编辑器初始化内容
        editor: null, // 编辑器示例
        brands: [] // 品牌列表
      }
    },
    watch: {
      goodsData () {
        this.storage().set('goodsData', this.goodsData)
      },
      'goodsData.images' () {
        this.storage().set('goodsData', this.goodsData)
      },
      'goodsData.parameter' () {
        this.storage().set('goodsData', this.goodsData)
      },
      'goodsData.attribute_attach' () {
        this.storage().set('goodsData', this.goodsData)
      },
      'goodsData.attribute' (attribute) {
        if (this.firstLoading) {
          this.firstLoading = false
          return false
        }
        this.goodsData.attribute_attach = []
        let _attribute = this.level(attribute)
        _attribute.map(item => {
          let data = {}
          data.stock = 0
          data.price = '0.00'
          data.thumb = ''
          data.attach = item
          this.goodsData.attribute_attach.push(data)
        })
        this.storage().set('goodsData', this.goodsData)
      }
    },
    methods: {
      /**
       *  批量设置库存
       */
      batchStock () {
        this.$prompt('请输入库存数量', '批量设置库存', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\d+/
        }).then(({ value }) => {
          this.goodsData.attribute_attach =
            this.goodsData.attribute_attach.map(item => {
              item.stock = value
              return item
            })
        })
      },
      /**
       *  批量设置价格
       */
      batchPrice () {
        this.$prompt('请输入单价', '批量设置单价', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.goodsData.attribute_attach =
            this.goodsData.attribute_attach.map(item => {
              item.price = value
              return item
            })
        })
      },
      /**
       *  获取属性上传时的图片
       */
      attributeImage (image) {
        this.goodsData.attribute_attach =
          this.goodsData.attribute_attach.map((item, idx) => {
            if (idx === this.attributeUploadIndex) {
              item.thumb = image
            }
            return item
          })
      },
      /**
       *  选择完属性之后的排列组合
       */
      level (attribute) {
        let rows = []
        attribute.map((items, idx) => {
          items = items.attach.concat()
          if (rows.length > 0) {
            // 2、将第一列作为模板
            let clone = rows.concat()
            // 3、置空当前列表,因为只有第一列，组合不完整
            rows = []
            items.map(item => {
              let tmp = clone.concat()
              tmp.map((_item, index) => {
                _item = _item.concat()
                _item.push({name: item.name, id: item.id})
                tmp[index] = _item
              })
              rows = rows.concat(tmp)
            })
          } else {
            // 1、计算出第一列
            items.map((item) => {
              let arr = []
              arr.push({name: item.name, id: item.id})
              rows.push(arr)
            })
          }
        })
        return rows
      },
      /**
       *  选择属性是触发事件,用于计算排列组合
       */
      checkedAttribute () {
        this.goodsData.attribute = []
        this.goodsAttribute.map(item => {
          let data = {id: item.id, name: item.name, attach: []}
          item.attach.map(item => {
            if (item.checked) {
              data.attach.push({id: item.id, name: item.name})
            }
          })
          this.goodsData.attribute.push(data)
        })
        this.goodsData.attribute = this.goodsData.attribute.filter((item) => {
          return item.attach.length
        })
      },
      /**
       *  获取当前选择的商品属性
       */
      getAttributeChecked () {
        this.goodsAttribute = this.attribute.filter((item, idx) => {
          if (this.inArray(item.id, this.selectedAttribute)) {
            return true
          }
          return false
        })
        this.showSelectAttribute = false
      },
      /**
       *  删除一组产品参数
       */
      removeOneParameter (idx) {
        this.$confirm('确定要删除吗?删除之后不可恢复!', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsData.parameter =
            this.goodsData.parameter.filter((_, index) => {
              return idx !== index
            })
        })
      },
      /**
       *  新增一组产品参数
       */
      addOneParameter () {
        this.goodsData.parameter.push({
          key: '',
          val: ''
        })
      },
      /**
       *  设置为封面
       */
      setThumb (image) {
        this.goodsData.thumb = image
      },
      /**
       *  移出已上传的图片
       */
      removeImage (idx) {
        this.$confirm('确定要删除吗?删除之后不可恢复!', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsData.images = this.goodsData.images.filter((_, index) => {
            return idx !== index
          })
        })
      },
      /**
       * 获取属性列表
       */
      getAttribute () {
        this.showLoading()
        this
          .$api
          .attribute
          .items()
          .then(r => {
            this.attribute = r
            let checkedAttributeIds = []
            let attachIds = {}
            this.goodsData.attribute.map(item => {
              attachIds[item.id] = []
              item.attach.map(attach => {
                attachIds[item.id].push(attach.id)
              })
              checkedAttributeIds.push(item.id)
            })
            this.attribute.map(attr => {
              attr.attach = attr.attach.map(attach => {
                if (this.inArray(attach.id, attachIds[attr.id])) {
                  attach.checked = true
                } else {
                  attach.checked = false
                }
                return attach
              })
              if (this.inArray(attr.id, checkedAttributeIds)) {
                this.goodsAttribute.push(attr)
              }
            })
          })
      },
      /**
       *  获取分类
       */
      getCategory () {
        this
          .$api
          .category
          .infinite()
          .then(r => {
            this.categorys = r
          })
      },
      /**
       * @立即发布
       * @returns {boolean}
       */
      submit () {
        if (!this.goodsData.title) {
          this.toast('请填写商品标题', 'warning')
          return false
        }
        if (this.goodsData.images.length < 1) {
          this.toast('请上传商品缩略图', 'warning')
          return false
        }
        if (!this.goodsData.thumb) {
          this.toast('请设置商品封面图', 'warning')
          return false
        }
        if (!this.goodsData.category) {
          this.toast('请选择商品分类', 'warning')
          return false
        }
        if (!this.goodsData.price) {
          this.toast('缺少商品展示价格', 'warning')
          return false
        }
        if (!this.goodsData.article) {
          this.toast('缺少商品图文详情', 'warning')
          return false
        }
        this.showLoading()
        // 去除文章里面图片的域名
        this.goodsData.article = this.goodsData.article.split(this.imageUrl).join('')
        this
          .$api
          .goods
          .create(this.goodsData)
          .then(r => {
            this.toast('保存成功!', () => {
              // 发布成功,重置表单数据
              this.resetGoodsData()
            })
          })
      },
      getBrand () {
        this
          .$api
          .brand
          .itemByCreateGoods()
          .then(r => {
            this.brands = r
          })
      },
      /**
       * @purpose 重置数据
       */
      resetGoodsData () {
        this.goodsData = {
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
          brand: 0
        }
        if (this.editor) {
          this.editor.txt.clear()
        }
        this.goodsAttribute = []
        this.checkedAttribute = []
      },
      /**
       * 清空本地缓存数据以及表单数据
       */
      clearLocalData () {
        this.$confirm('确定要清空吗', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resetGoodsData()
        })
      },
      start () {
        // 自动保存 十秒钟保存一次
        this.autoSave = setInterval(() => {
          this.storage().set('goodsData', this.goodsData)
        }, 10000)
        this.showLoading()
        this.getAttribute()
        this.getCategory()
        this.getBrand()
      },
      // 检测本地是否有缓存数据
      checkLocalData (data) {
        if (data.article) {
          return true
        }
        if (data.attribute.length > 0) {
          return true
        }
        if (data.attribute_attach.length > 0) {
          return true
        }
        if (data.brand > 0) {
          return true
        }
        if (data.category) {
          return true
        }
        if (data.images.length > 0) {
          return true
        }
        if (data.parameter.langth > 0) {
          return true
        }
        if (Number(data.price) > 0) {
          return true
        }
        if (data.stock > 0) {
          return true
        }
        if (data.thumb) {
          return true
        }
        if (data.title) {
          return true
        }
      }
    },
    mounted () {
      let data = this.storage().get('goodsData')
      if (!this.isEmptyObject(data) && this.checkLocalData(data)) {
        this.$confirm('检测到上次编辑数据,是否要载入', '温馨提示', {
          confirmButtonText: '载入',
          cancelButtonText: '不载入',
          type: 'warning'
        }).then(() => {
          this.start()
          if (data.article.indexOf(this.imageUrl) < 0) {
            data.article = data.article.split('src="').join('src="' + this.imageUrl)
          }
          this.initContent = data.article
          this.goodsData = data
        }).catch(() => {
          this.resetGoodsData()
          this.start()
        })
      } else {
        this.resetGoodsData()
        this.start()
      }
    },
    beforeDestroy () {
      clearInterval(this.autoSave)
    }
  }
</script>
<style lang="sass">
  td
    .el-input
      margin: 1rem
      width: calc(100% - 1rem)
      input
        text-align: center
        padding: 0
        width: 100%
    img
      height: 100%
      cursor: pointer
      &:hover
        background-color: #efefef
</style>
<style scoped lang="sass">
  .thumb,.images
    width: 150px
    height: 150px
    background-color: #ebebeb
    cursor: pointer
    border-radius: 5px
    float: left
    margin: 10px 10px 0 0
    &:hover
      background-color: #f4f4f4
    > img
      width: 100%
      height: 100%
      border-radius: 5px
  .images
    cursor: auto
    position: relative
    .delete,.set-thumb,.cover
      width: 50%
      height: 2rem
      background-color: #ff5700
      align-items: center
      justify-content: center
      position: absolute
      color: #ffffff
      display: none
      cursor: pointer
    &:hover
      .delete,.set-thumb
        display: flex
    .delete
      top: 0
      left: 0
      border-top-left-radius: 5px
    .set-thumb
      top: 0
      right: 0
      border-top-right-radius: 5px
      background-color: #09bb07
    .cover
      width: 100%
      display: flex
      bottom: 0
      right: 0
      border-bottom-right-radius: 5px
      border-bottom-left-radius: 5px
      background-color: rgba(255,87,0, .5)
      font-size: .8rem
      cursor: default
  .field
    width: 100%
    text-align: right
    padding: 36px 1rem 0 0
    color: #666
  .buttons
    width: 100%
    margin-top: 3rem
    display: flex
    flex-direction: row-reverse
  .attribute
    width: 100%
    margin-top: 2rem
    tr
      width: 100%
      display: flex
      th,td
        flex: 1
        height: 40px
        display: flex
        align-items: center
        justify-content: center
        border: 1px solid #cccccc
        border-right: none
        font-size: .8rem
        &:last-child
          border-right: 1px solid #cccccc
    tr td
        border-top: none
        height: 50px
</style>
