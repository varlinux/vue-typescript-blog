<template>
  <el-drawer
      :visible.sync="sidebar.opened"
      :size="asideWidth"
      direction="rtl">
    <el-avatar :size="80" :src="circleUrl"></el-avatar>
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
      <el-menu-item
          v-for="item in menuList"
          :key="item._id"
          @click="goTo(item.dir_menu_url)"
          :index="item._id">
        <i :class="iconMap[item.dir_menu_url]"></i>
        <span slot="title">{{item.dir_menu_name}}</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Aside",
    data() {
      return {
        childCloseAside: 'none',
        circleUrl: require('../../assets/img/github.png'),
        asideWidth: "20%",
        menuList: [],
        iconMap: {
          '/article/list': 'el-icon-files',
          '/tag': 'el-icon-price-tag',
          '/interview': 'el-icon-reading',
          '/note': 'el-icon-tickets',
          '/timeline': 'el-icon-time',
          '/task': 'el-icon-location'
        }
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device
      })
    },
    watch: {},
    mounted: function () {
      console.log(`this.device : `, this.device)
      this.$store.dispatch('getIndexMenu').then(res => {
        if (res) {
          console.log(`res : `, res)
          this.menuList = res._data.filter(item => item.dir_menu_url)
        }
      })
      this.device.toString() === 'mobile' ? this.asideWidth = '50%' : ''
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
      goTo(path) {
        return this.$router.push(path)
      },
    },
  }
</script>

<style scoped lang="sass">
  @import "~@/style/layout/index.sass"
</style>
