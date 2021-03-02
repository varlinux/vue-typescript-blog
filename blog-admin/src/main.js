import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

// 权限校验
import './controller/permission'

// markdown插件
import mavonEdit from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI);
Vue.use(mavonEdit);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
