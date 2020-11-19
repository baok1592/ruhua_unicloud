<template>
	<el-container class="index-box">
		<el-aside width="asideWidth">
			<menus @openPage="openPage" :isCollapse="isCollapse" />
		</el-aside>
		<el-container>
			<el-header>
				<headers :user="user" :isCollapse="isCollapse" />
			</el-header>
			<el-main>
				<Index v-if="currentPage === 'index'" />
				<Article v-if="currentPage === 'article'" />
				<roleManag v-if="currentPage === 'roleManag'"></roleManag>
				<GoodsManag v-if="currentPage==='goodsManag'"></GoodsManag>
				<Category v-if="currentPage==='Category'"></Category>
				<getOrder v-if="currentPage==='getOrder'"></getOrder>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import Menus from '@/components/menus/menus'
	import Headers from '@/components/header/header'
	import Index from '@/components/page/index'
	import Article from '@/components/page/article'
	import roleManag from '@/components/page/roleManag'
	import GoodsManag from '@/components/page/goodsManag'
	import Category from '@/components/page/Category'
	import getOrder from '@/components/page/order'
	export default {
		data() {
			return {
				isRouterAlive: true,
				currentPage: 'index'
			}
		},
		computed: {
			...mapState(['user', 'isCollapse'])
		},
		components: {
			Menus,
			Headers,
			Index,
			Article,
			roleManag,
			GoodsManag,
			Category,
			getOrder
		},
		onLoad() {
			if (!this.user._id) {
				uni.redirectTo({
					url: '../login/login'
				})
			}
		},
		methods: {
			openPage(page) {
				this.currentPage = page
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-box {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100%;

		.el-container {
			height: 100%;

			.el-main {
				height: 100%;
			}
		}

		.el-aside {
			background-color: #20222A;
			height: 100vh;
			min-height: 100%;
		}

		.el-header {
			border-bottom: 1px solid #f6f6f6;
			box-sizing: border-box;
			background-color: #fff;
			line-height: 60px;
		}
	}
</style>
