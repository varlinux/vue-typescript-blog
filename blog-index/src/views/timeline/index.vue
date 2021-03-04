<template>
  <div class="main-content">
    <el-timeline>
<!--      todo 2\增加切换正反按钮-->
      <el-timeline-item
          v-for="item in this.articleList"
          :key="item.atc_id"
          color="#2E93FA"
          :timestamp="item.atc_create_time" placement="top">
        <el-card>
          <h4 class="line-limit-length">{{item.atc_title}}</h4>
          <p>{{item.atc_author || 'default'}} 提交于 {{item.atc_create_time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import DateUtils from "@/utils/DateUtils";

  export default {
    name: "TimeLine",
    data() {
      return {
        articleList: []
      }
    },
    mounted() {
      this.getAllArticle().then(res => {
        if (res._code === 200) {
          this.articleList = DateUtils.mySort(res._data, 'atc_create_time')
          console.log(`this.articleList : `, this.articleList)
        }
      })
    },
    methods: {
      ...mapActions([
        'getAllArticle'
      ])
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/TimeLine.sass"
</style>
