<template>
  <div class="footer-content">
    <div class="footer-container">
      <div class="footer-item">路漫漫其修远兮♥吾将上下而求索</div>
      <div class="footer-item">本站已安全运行 {{ timeDate }} 天 {{times}}</div>
      <div class="footer-item">
        <span style="line-height: 14px;display: inline-block">友情链接：</span>
        <el-link href="https://www.bilibili.com/" target="_blank">B站</el-link>
        <el-link href="https://www.github.com/" target="_blank">github</el-link>
        <el-link href="https://www.youtube.com/" target="_blank">Youtube</el-link>
      </div>
      <div class="footer-item">
        <el-image
            class="safe-icon"
            :src="beiImg"></el-image>
        <span>豫公网安备 41108102000344号</span>
      </div>
    </div>
  </div>
</template>

<script>
  let _this = this;
  let now = new Date();
  export default {
    name: "Footer",
    data() {
      return {
        timeDate: 0,
        times: '00 小时 00 分 00 秒',
        curYear: 2020,
        beiImg: require('../../assets/img/beian.png'),
        background: 'https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/background.webp',
        foreground: 'https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/foreground.webp'
      };
    },
    mounted() {
      _this = this;
      _this.runTime()
      _this.timer()
    },
    created() {
    },
    methods: {
      timer() {
        return setInterval(() => {
          _this.runTime()
        }, 1000)
      },
      destroyed() {
        clearInterval(this.timer)
      },
      runTime() {
        let grt = new Date("06/01/2020 00:00:00");
        now.setTime(now.getTime() + 250);
        let days = (now - grt) / 1000 / 60 / 60 / 24;
        let dnum = Math.floor(days);
        let hours = (now - grt) / 1000 / 60 / 60 - (24 * dnum);
        let hnum = Math.floor(hours);

        if (String(hnum).length === 1) {
          hnum = "0" + hnum;
        }
        let minutes = (now - grt) / 1000 / 60 - (24 * 60 * dnum) - (60 * hnum);
        let mnum = Math.floor(minutes);
        if (String(mnum).length === 1) {
          mnum = "0" + mnum;
        }
        let seconds = (now - grt) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
        let snum = Math.round(seconds);
        if (String(snum).length === 1) {
          snum = "0" + snum;
        }
        _this.timeDate = dnum;
        _this.times = hnum + " 小时 " + mnum + " 分 " + snum + " 秒"
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import "~@/style/layout/index.sass"
</style>
