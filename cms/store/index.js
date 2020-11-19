import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let user = uni.getStorageSync('user') || {}
const store = new Vuex.Store({
	state: {
		user: user,
		isCollapse: false
	},
	mutations: {
		login(state, user) {
			state.user = user
			uni.setStorageSync('user', user)
		},
		logout(state) {
			state.user = {}
			uni.removeStorageSync('user')
		},
		changeCollapse(state) {
			state.isCollapse = !state.isCollapse
		}
	}
})

export default store
