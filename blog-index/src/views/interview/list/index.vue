<template>
  <div>
    <list-template :item-list="articleList" :loading="false">
      <el-button icon="el-icon-d-arrow-left" @click="goBack">返回</el-button>
    </list-template>
  </div>
</template>

<script>
  import {isNullForObject} from "../../../utils/ObjectUtils";
  import ListTemplate from "../../article/ListTemplate";

  export default {
    name: "index",
    inject: ['reload'],
    data() {
      return {
        type: 0,
        articleList: []
      }
    },
    watch: {
      $route(to, from) {
        if (to.name === 'InterviewList') {
          this.reload()
        }
      }
    },
    components: {
      ListTemplate
    },
    mounted() {
      this.init().then(type => {
        this.getArticleList(type)
      }) // 初始化
    },
    methods: {
      init() {
        return new Promise(resolve => {
          if (!isNullForObject(this.$route.query)) {
            const {type} = this.$route.query
            resolve(type)
          }
        })
      },
      getArticleList(type) {
        const formData = {
          atc_type: type
        }
        return this.$store.dispatch('getByObj', formData).then(res => {
          if (res && res._data) {
            const {_data} = res
            this.articleList = _data
            console.log(`_data : `, _data)
          }
        })
      },
      goBack() {
        return this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '~@/style/views/interview/list'
</style>
