<template>
  <div class="interview-container">
    <el-alert
        class="title-container"
        title="目前只收集前端面试题，后端和linux/服务端待定"
        type="warning"
        show-icon>
    </el-alert>
    <div class="main-container">
      <el-card
          v-for="item in typeList"
          :key="item._id">
        <el-image
            @click="getList(item.art_type_id)"
            :src="item.art_type_img_url">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <h4 class="demonstration">{{item.art_type_name}}</h4>
        <p class="demonstration font-0-8">{{item.art_type_desc}}</p>
        <div class="container-time-scope">
          <span class="demonstration color-a7a7a7 font-0-6">{{item.art_type_create_time}}</span>
          <span class="font-0-8 color-e6e6e6 margin-l-r-1">至</span>
          <span class="demonstration color-a7a7a7 font-0-6">{{item.art_type_edit_time}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        typeList: []
      }
    },
    mounted() {
      this.$store.dispatch('getArtypes', {}).then(res => {
        if (res && res._data) {
          const {_data} = res
          this.typeList = _data
          console.log(`getArtypes : `, res)
        }
      })
    },
    methods: {
      getList(type) {
        console.log(`category type : `, type)
        return this.$nextTick(() => {
          this.$router.push({
            path: '/interviewList',
            query: {
              type: type
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '~@/style/views/interview/category'
</style>
