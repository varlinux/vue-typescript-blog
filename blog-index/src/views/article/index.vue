<template>
  <div class="list-content"
       v-if="showElement === 'list'">
    <ListTemplate
        ref="childList"
        :loading="loading"
        @trigger-loading="selectArticles"
        :item-list="articleList"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ListTemplate from "./ListTemplate"
  import {mapArray} from '@/utils/js/ArrayUtils'

  export default {
    name: "ArticleList",
    data() {
      return {
        showElement: 'list', //showDetail
        articleList: [],
        pageIndex: 0,
        size: 10,
        loading: true
      }
    },
    components: {
      ListTemplate
    },
    props: {
      isLocation: false,
      anchor: "",
    },
    computed: {
      ...mapState({
        device: state => state.app.device
      })
    },
    created() {
      if (this.location) {
        location.href = this.anchor;
        this.isLocation = false;
      }
      // this.selectArticles()
    },
    mounted: function () {
    },
    methods: {
      selectArticles() {
        const formData = {
          pageIndex: this.pageIndex,
          size: this.size
        }
        this.$store.dispatch('getByLimit', formData).then(async res => { // 前台文章列表展示一般不会发生变化，所以放在created生命周期里面
          if (res) {
            const {_code, _data} = res
            if (_code === 200) {
              if (_data.length <= 0) {
                this.$message({
                  type: 'warning',
                  message: '加载不出来更多的文章了！'
                })
                this.loading = false
              }
              if (this.articleList.length > 0) {
                console.log(`if this.articleList : `, this.articleList)
                this.articleList = Array.from(this.articleList).concat(Array.from(_data))
              } else {
                this.articleList = _data
              }
              await this.tagMap()
              this.pageIndex++
            }
          }
        })
      },
      appendImg(arr) {
        let imgIsExist,
          imgReg = /!\[.*]\(.*\)/g
        arr.forEach(item => {
          imgIsExist = item.atc_content.match(imgReg)
          item.first_img = !imgIsExist ? 'https://nimg.ws.126.net/?url=http%3A%2F%2Fspider.ws.126.net%2F672c5eb415ab51a0622215f192066ca3.jpeg&thumbnail=650x2147483647&quality=80&type=jpg' :
            imgIsExist[0].slice(imgIsExist[0].indexOf('http'), imgIsExist[0].length - 1)
          item.simple_content = item.atc_content.replace(imgReg, '')
        })
        return arr
      },
      tagMap() {
        this.$store.dispatch('getAllTag').then(res => {
          if (res) {
            const {_data} = res
            this.articleList.forEach(item => {
              if (item.tag_ids) {
                const ids = item.tag_ids.split(',')
                item.tags = mapArray(ids, _data)
              }
            })
            console.log(`this.articleList : `, this.articleList)
          }
        })
      },
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/ArticleList.sass"
</style>
