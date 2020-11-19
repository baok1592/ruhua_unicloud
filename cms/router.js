import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routelis = [{
	path: '/',
	redirect: '/login'
},
{
	path: '/login',
	component: () => import('./pages/login/login.vue')
}]

export default new Router({
	routes: routelis
})
