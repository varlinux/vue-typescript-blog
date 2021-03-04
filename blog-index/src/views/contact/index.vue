<template>
  <el-card>
    <el-form
        ref="form"
        :model="form">
      <h3>当您有更好的想法可以联系博主哦...</h3>
      <el-form-item class="suggest-email">
        <el-input v-model="form.contact" placeholder="联系方式"></el-input>
      </el-form-item>
      <el-form-item class="suggest-title">
        <el-input v-model="form.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item class="suggest-content">
        <el-input type="textarea" v-model="form.content" placeholder="这里填写你想要说的话..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "EmailNote",
    data() {
      return {
        form: {
          contact: '',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      ...mapState({
        device: state => state.app.device
      })
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'addSuggest'
      ]),
      onSubmit() {
        let _this = this
        this.addSuggest(_this.form).then(res => {
          let popType = 'error',
            popInfo = '失败'
          if (res._code === 200) {
            popType = 'success'
            popInfo = '成功'
          }
          this.$message({
            type: popType,
            message: '建议提交' + popInfo
          })
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/EmailNote.sass"
</style>
