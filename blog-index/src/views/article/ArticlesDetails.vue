<template>
  <div class="detail-content">
    <el-card>
      <div class="detail-back">
        <el-button
            class="border-0"
            icon="el-icon-d-arrow-left"
            @click="goBack">返回</el-button>
      </div>
      <div class="detail-con-title">
        <h1>{{ detail.atc_title }}</h1>
      </div>
      <div class="detail-con-info">
        <div class="detail-con-date" v-if="detail.atc_edit_time">
          <span class="el-icon-date">最后修： {{ detail.atc_edit_time }}</span>
        </div>
        <div class="detail-con-author" v-if="detail.atc_author">
          <span class="el-icon-user-solid">{{ detail.atc_author}}</span>
        </div>
      </div>
<!--      todo markdown内容美化-->
      <div ref="atc_content" class="detail-con-main">
      </div>
    </el-card>
  </div>
</template>

<script>
  const hljs = require('highlight.js') // https://highlightjs.org/
  // Actual default values
  const md = require('markdown-it')({
    html: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      } else {
        try {
          return hljs.highlightAuto(str).value;
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
    linkify: true,
  });
  export default {
    data() {
      return {
        isStart: false,
        list: [],
        detail: {}
      }
    },
    watch: {
      $route(to, from) {
        this.refreshDetail()
      }
    },
    mounted() {
      this.refreshDetail()
    },
    methods: {
      goBack() {
        return this.$router.go(-1)
      },
      refreshDetail() {
        this.detail = this.$route.query
        if (this.detail.atc_content) {
          const result = md.render(this.detail.atc_content)
          md.disable('table')
          md.renderer.rules.code_block = md.renderer.rules.fence
          this.$refs.atc_content.innerHTML = result
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/ArticlesDetails.sass"
  /*/deep/ p*/
  /*  color: #000*/
</style>
