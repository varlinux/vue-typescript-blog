<template>
  <div class="list-template-container">
    <slot></slot>
    <div class="list-template-main">
        <el-card v-for="item in itemList"
                 :key="item.id">
          <el-image
              class="bgs-60"
              @click="getDetail(item)"
              :src="item.first_img"></el-image>
          <div class="article-simple-content display-f flex-direction-c justify-content-sb"
               @click="getDetail(item)">
            <div>
              <el-tag v-for="tag in item.tags"
                      :type="tag.tag_color"
                      :key="tag.tag_id">
                {{ tag.tag_name }}
              </el-tag>
            </div>
            <div :id="item.atc_id">
              <p class="line-limit-length">{{ item.atc_title }}</p>
              <p class="line-limit-length color-a7a7a7">
                <i class="el-icon-timer">{{ item.atc_edit_time ? item.atc_edit_time : item.atc_create_time}}</i>
              </p>
            </div>
          </div>
        </el-card>
    </div>
    <div class="loading-container">
      <div v-show="loading"
           class="list-template-loading">
      </div>
    </div>
  </div>
</template>

<script>
  import PanelCard from '@/component/PanelCard'

  export default {
    name: "index",
    props: {
      itemList: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    components: {
      PanelCard
    },
    watch: {
      itemList: async function () {
        await this.appendImg(this.itemList)
      }
    },
    mounted() {
      this.triggerLoading(document.querySelector('.list-template-loading'))
    },
    methods: {
      getDetail: function (data) {
        console.log(`data : `, data)
        this.$router.push({
          path: '/article/details',
          query: data
        })
      },
      appendImg(arr) {
        let imgIsExist,
          imgReg = /!\[.*]\(.*\)/g
        arr.forEach(item => {
          imgIsExist = item.atc_content.match(imgReg)
          item.first_img = !imgIsExist ?
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1033744486,3975974304&fm=26&gp=0.jpg' :
            imgIsExist[0].slice(imgIsExist[0].indexOf('http'), imgIsExist[0].length - 1)
          item.simple_content = item.atc_content.replace(imgReg, '')
        })
        console.log(`this.appendImg : `, arr)
        return arr
      },
      triggerLoading(ele) {
        let timer = null, // 节流定时器
            time = 1 // 3s触发一次
        const intersectionObserver = new IntersectionObserver(entries => {
          if (entries[0].intersectionRatio <= 0)
            return
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            this.$emit('trigger-loading', true)
            console.log(`Loaded new items`)
          }, time * 1000)
        })
        intersectionObserver.observe(ele)
      },
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/ArticleList.sass"
</style>
