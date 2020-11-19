import Vue from 'vue'
import App from './App'
import store from './store'
import Utils from './common/utils'
import ElementUI from 'element-ui'
import api from '@/common/api/api'
//import router from './router.js'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
	...App
})


Vue.use(ElementUI)
Vue.prototype.Utils = Utils

app.$mount()
