<template>
  <div id="app">
    <el-container>
      <el-container id="container">
        <Header/>
        <app-main/>
        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
      <!--侧边导航栏-->
      <Aside v-show="sidebar"/>
      <!--固定菜单栏-->
<!--      <FixedMenu/>-->
    </el-container>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Aside from './components/Aside'
  import Footer from './components/Footer'
  import AppMain from "./AppMain";
  import FixedMenu from "../component/FixedMenu/index";
  import {mapState, mapActions} from "vuex";

  export default {
    data() {
      return {
        mainStatus: 'articleList'
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
      })
    },
    components: {
      Header,
      Aside,
      Footer,
      AppMain,
      FixedMenu
    },
    created() {
      document.body.clientWidth < 960 ? this.$store.dispatch('toggleDevice', 'mobile') :
          this.$store.dispatch('toggleDevice', 'desktop')
    },
    methods: {
      ...mapActions([
        'toggleDevice'
      ])
    }
  }
</script>

<style lang="sass" scoped>
  @import "~@/style/layout/index.sass"
</style>
