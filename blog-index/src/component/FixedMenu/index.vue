<template>
  <div class="fixed-menu-content">
    <div class="menu-card">
      <el-button v-for="item in menuList"
                 v-show="item.dir_menu_url"
                 class="hide"
                 type="primary"
                 :key="item._id"
                 @click="goTo(item)">{{item.dir_menu_name}}
      </el-button>
    </div>
    <el-button icon="el-icon-menu"
               class="menu-button"
               @click="openSidebar"
               v-show="showMenuBtn"
               circle></el-button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {PopInterval} from '../../utils/css/ElePopUtils'
  export default {
    name: "index",
    data() {
      return {
        menuMobile: false,
        showMenuBtn: true,
        menuList: []
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device
      })
    },
    mounted() {
      this.$store.dispatch('getIndexMenu').then(res => {
        if (res) {
          this.menuList = res._data.filter(item => item.dir_menu_url)
        }
      })
    },
    methods: {
      openSidebar() {
        if (this.device.toString() === 'mobile') {
          const arr = Array.prototype.slice.apply(document.querySelectorAll('.menu-card button'))
          if (!this.menuMobile) {
            PopInterval(arr, arr.length - 1, 200)
          } else {
            arr.forEach(item => {
              item.style.display = 'none'
            })
          }
          this.menuMobile = !this.menuMobile
        } else {
          this.$store.dispatch('toggleSideBar')
        }
      },
      goTo(item) {
        if (this.device.toString() === 'mobile') {
          this.$router.push(item.dir_menu_url)
        } else {
          this.$store.dispatch('toggleSideBar')
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/components/FixedMenu.sass"
</style>
