<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="isRouterAlive">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  provide: function() {
    return {
      reload: this.reload
    }
  },
  data: function() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/style/layout/index.sass"
  // @import "~@/plugsin/magic/changeColor.css"
</style>
