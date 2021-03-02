<template>
  <div>
    <div
        class="container-mobile"
        v-show="device.toString() === 'mobile'">
      <el-button
          class="border-0 bgco-0"
          @click="toggleSearch"
          icon="el-icon-search"></el-button>
      <el-autocomplete
          ref="search"
          v-model="state"
          v-show="isShowSearchInput"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入搜索内容"
          @select="handleSelect"></el-autocomplete>
      <el-button
          class="border-0 bgco-0"
          @click="openSidebar"
          icon="el-icon-s-fold"></el-button>
    </div>
    <div
        class="el-menu-demo"
        v-show="device.toString() !== 'mobile'">
      <el-menu
          background-color="rgba(0, 0, 0, 0)"
          mode="horizontal">
        <el-image
            class="github-icon"
            @click="forwardGithub"
            :src="url"
            :fit="fit"></el-image>
        <el-menu-item
            v-for="item in menuList"
            :index="item.dir_menu_url"
            :key="item._id"
            @click="goTo(item.dir_menu_url)">{{ item.dir_menu_name}}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Header",
    data() {
      return {
        fit: 'contain',    // fill / contain / cover / none / scale-down
        url: require("../../assets/img/github.png"),
        showHeader: true,
        menuList: [],
        state: '',        // 搜索条件,
        isShowSearchInput: false
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        userInfo: state => state.user.userInfo
      })
    },
    created() {
      // if (this.device.toString() === 'mobile') {
      //   this.showHeader = false
      // }
    },
    mounted() {
      this.$store.dispatch('getIndexMenu').then(res => {
        if (res) {
          console.log(`res : `, res)
          this.menuList = res._data.filter(item => item.dir_menu_url).reverse()
        }
      })
    },
    methods: {
      forwardGithub() {
        location.href = 'https://github.com/varlinux'
      },
      goTo(path) {
        return this.$router.push(path)
      },
      openSidebar() {
        this.$store.commit('TOGGLE_SIDEBAR')
      },
      toggleSearch() {
        this.isShowSearchInput = !this.isShowSearchInput
      },
      querySearchAsync() {

      },
      handleSelect() {

      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/layout/index.sass"
</style>
