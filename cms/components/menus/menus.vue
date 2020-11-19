<template>
	<el-menu class="menu-nav" default-active="index" background-color="#20222A" text-color="#fff" active-text-color="#00ffff"
	 :collapse="isCollapse">
		<el-menu-item @click="openPage(item.index)" v-if="!item.children" v-for="item in menus" :index="item.index" :key="item.index" v-show="item.show">
			<i :class="item.icon"></i>
			<span slot="title">{{item.name}}</span>
		</el-menu-item>
		<el-submenu v-else :index="item.index" :key="item.index">
			<template slot="title">
				<i :class="item.icon"></i>
				<span slot="title">{{item.name}}</span>
			</template>
			<el-menu-item @click="openPage(children.index)" v-for="children in item.children" :index="children.index" :key="children.index">{{children.name}}</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	let user = uni.getStorageSync('user');
	export default {
		props: ['isCollapse','user'],
		data() {
			return {
				menus: [{
						name: '系统首页',
						index: 'index',
						icon: 'el-icon-s-home',
						show:true
					},
					{
						name: '商品管理',
						index: 'goodsManag',
						icon: 'el-icon-s-shop',
						show:user.isGoods,
						children: [{
							name: '商品列表',
							index: 'goodsManag'
						}, {
							name: '商品分类',
							index: 'Category'
						}]
					},
					{
						name: '订单管理',
						index: 'order',
						icon: 'el-icon-s-order',
						show:user.isOrder,
						children: [{
							name: '商品订单',
							index: 'getOrder'
						}]
					},
					{
						name: '文章管理',
						index: 'article',
						icon: 'el-icon-document-copy',
						index: 'article',
						show:user.isText,
					},
					// {
					// 	name: '角色管理',
					// 	index: 'roleManag',
					// 	icon: 'el-icon-user-solid',
					// 	children: [{
					// 		name: '角色管理',
					// 		index: 'roleManag'
					// 	}]
					// },
					{
						name: '系统设置',
						index: 'roleManag1',
						icon: 'el-icon-s-tools',
						show:user.isAdminof,
						children: [{
							name: '管理员',
							index: 'roleManag'
						}]
					}
				]
			}
		},
		methods: {
			openPage(page) {
				this.$emit('openPage', page)
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-menu {
		border: none;
	}

	.menu-nav:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
