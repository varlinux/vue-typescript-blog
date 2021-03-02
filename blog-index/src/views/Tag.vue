<template>
  <ListTemplate class="list-template"
                v-if="hideListFlag"
                :loading="false"
                :item-list="articleList">
    <el-button
        class="border-0"
        icon="el-icon-d-arrow-left"
        @click="goBack">返回</el-button>
  </ListTemplate>
  <div v-else
       class="tag-content">
    <el-tag :type="item.tag_color"
            v-for="item in this.tagList"
            @click="getArticleByTag(item.tag_id)"
            :key="item.tag_id">
      {{ item.tag_name }}
    </el-tag>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import ListTemplate from "./article/ListTemplate"
  import LoadingHandler from "./mixin/LoadingHandler"
  export default {
    data() {
      return {
        tagType: ['default', 'success', 'info', 'warning', 'danger'],
        tagList: [],
        articleList: [],
        hideListFlag: false
      }
    },
    components: {
      ListTemplate
    },
    mixins: [LoadingHandler],
    mounted() {
      this.getAllTag().then(res => {
        if (res._code === 200) {
          this.tagList = res._data
        }
      })
    },
    methods: {
      ...mapActions([
        'getAllTag',
        'getByTagId'
      ]),
      getArticleByTag(tagId) {
        this.loadingStart(document.querySelector('.loadingStart'))
        this.getByTagId(tagId).then(data => {
          let { _code, _data, _msg } = data
          if (_code === 200 && _data.length > 0) {
            console.log(`data : `, data)
            this.articleList = _data
            this.hideListFlag = true  // 显示文章列表
          } else if (_data.length <= 0) {
            _msg = '暂时没有文章使用该标签'
          } else if (_code !== 200) {
            _msg = '请求发送失败'
          }
          if (_data.length <= 0 || _code !== 200) {
            this.$message({
              type: 'error',
              message: _msg,
              duration: 1500
            })
          }
          this.loadingEnd()
        })
      },
      goBack() {
        this.hideListFlag = false
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/Tag.sass"
</style>
