<template>
  <div class="main-content">
    <el-timeline>
      <el-timeline-item
          v-loading="loading"
          v-for="item in this.taskList"
          :key="item._id"
          :icon="item.site_task_icon"
          size="large"
          color="#000"
          :timestamp="item.site_task_edit_time" placement="top">
        <el-card>
          <h4 class="line-limit-length">{{item.site_task_name}}</h4>
          <p class="line-limit-length">{{item.site_task_desc}}</p>
          <el-steps :active="item.site_task_progress" finish-status="success">
            <el-step title="未开始" ></el-step>
            <el-step title="进行中" ></el-step>
            <el-step title="已完成" ></el-step>
            <el-step title="已结束" ></el-step>
          </el-steps>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import DateUtils from "@/utils/DateUtils";

  export default {
    name: "TimeLine",
    data() {
      return {
        taskList: [],
        loading: true
      }
    },
    mounted() {
      const formData = {
        site_task_type: 1,
        site_task_status: 1
      }
      this.$store.dispatch('getIndexTask', formData).then(res => {
        if (res._code === 200) {
          this.taskList = DateUtils.mySort(res._data, 'site_task_level', 'reverse')
          console.log(`this.taskList : `, this.taskList)
          this.loading = false
        }
      })
    },
    methods: {
    }
  }
</script>

<style scoped lang="sass">
  @import "~@/style/views/TimeLine.sass"
</style>
