<template>
  <el-card>
    <el-image
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
</template>

<script>
  export default {
    name: "index",
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/components/PanelCard"
</style>
