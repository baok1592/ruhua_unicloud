<template>
	<div class="goodsManag-box">
		<div class="div-h">
			<div class="tab-btn">
				<el-button type="warning" @click="IsStopC">全部商品</el-button>
				<el-button type="success" @click="IsStopB">在售商品</el-button>
				<el-button type="danger" @click="IsStopA">下架商品</el-button>
			</div>
			<div class="tab-btn1">
				<div class="tab-btn-c">
					<el-button type="primary" @tap="articleOperate('add')">添加商品</el-button>
					<!-- <el-button type="warning">警告按钮</el-button> -->
					<el-button type="success" icon="el-icon-refresh" circle @click="getListB()"></el-button>
					<div class="input-box">
						<el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
					</div>
					<el-button type="info" @click="Inquire">查询</el-button>
					<span style="color: rgb(115 115 115);display: inline-block;margin-left: 15px;">(注:输入商品名称或序号搜索查询)</span>
				</div>
			</div>
		</div>
		<div class="div-c">
			<el-table :data="list1">
				<!-- 	<el-table-column align="center" type="selection">
				</el-table-column> -->
				<el-table-column prop="title" label="排序">
				</el-table-column>
				<el-table-column prop="imgUrl" label="缩略图">
					<template slot-scope="scope">
						<el-popover placement="right" trigger="hover">
							<img :src="scope.row.imgUrl" style="max-height: 300px;max-width: 500px" />
							<img slot="reference" :src="scope.row.imgUrl" style="max-height: 30px;max-width: 130px">
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称">
					<template slot-scope="scope">
						<el-popover placement="right" trigger="hover">
							<!-- <img :src="scope.row.goodsName" style="max-height: 300px;max-width: 500px" />
							<img slot="reference" :src="scope.row.goodsName" style="max-height: 30px;max-width: 130px"> -->
							<span>{{scope.row.goodsName}}</span>
							<span slot="reference" style="word-break: break-all;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:1;">{{scope.row.goodsName}}</span>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="price" align="center" label="价格">
				</el-table-column>
				<el-table-column prop="create_date" align="center" label="总库存">
				</el-table-column>
				<el-table-column prop="image" align="center" label="销量">
				</el-table-column>
				<el-table-column label="是否热销">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.isHot" active-color="#13ce66" inactive-color="#ff4949" @change="changeBtn(scope.row)"
						 :disabled="disabled">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="是否新品">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.isNew" active-color="#13ce66" inactive-color="#ff4949" @change="changeBtn1(scope.row)"
						 :disabled="disabled">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="是否下架">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.isStop" active-color="#13ce66" inactive-color="#ff4949" @change="changeBtn2(scope.row)"
						 :disabled="disabled">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="articleOperate('edit',scope.row)">编辑</el-button>
						<el-button @click.native="delArticle(scope.row._id)" type="text" size="small" style="color: red;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<!-- <span class="demonstration">完整功能</span> -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				 :page-sizes="[5, 10, 20, 50,100]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<GoodEit ref="isShow" :arrS="arrS"></GoodEit>
	</div>
</template>

<script>
	import GoodEit from "../goodsEit/goodsEit.vue"
	export default {
		data() {
			return {
				input: '',
				value: false,
				value1: false,
				value2: false,
				msge: {
					msg: false
				},
				list1: [],
				currentPage: 0,
				limit: 5, // 每页显示条数
				total: 0,
				currentPage: 1, // 当前页数，
				isStop: 0,
				disabled: false,
				clickNum: 0,
				arrS:[]
			}
		},
		components: {
			GoodEit
		},
		mounted() {
			this.getGoodsList()
			this.getCategoryBtn()
		},
		methods: {
			articleOperate(type, article) {
				this.msge.msg = true;
				this.$refs.isShow.initBtn(this.msge, type, article);
			},
			fatherMethod() {
				this.getGoodsList()
			},
			handleCurrentChange(val) {
				if (this.clickNum == 0) {
					this.page = val
					this.getGoodsList()
				}
				if (this.clickNum == 1) {
					this.page = val
					this.getGoodsList1()
				}
			},
			handleSizeChange(val) {
				if (this.clickNum == 0) {
					this.limit = val
					this.currentPage = 1;
					this.getGoodsList()
				}
				if (this.clickNum == 1) {
					this.limit = val
					this.currentPage = 1;
					this.getGoodsList1()
				}
				console.log(val)
			},
			getGoodsList() {
				var data = {};
				data.page = this.currentPage;
				data.limit = this.limit;
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.getGoodsList(data).then((res) => {
					uni.hideLoading()
					// for (var i = 0; i < res.data.length; i++) {
					// 	res.data[i].title = i + 1
					// }
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].title = i + 1
					}
					this.total = res.total
					this.list1 = res.data
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			getSortFun(order, sortBy) {
			    var ordAlpah = (order == 'asc') ? '>' : '<';
			    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
			    return sortFun;
			},
			getGoodsList1() {
				var data = {};
				data.page = this.currentPage;
				data.limit = this.limit;
				data.isStop = this.isStop
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.getGoodsList1(data).then((res) => {
					uni.hideLoading()
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].title = i + 1
					}
					this.total = res.total
					this.list1 = res.data
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			changeBtn(e) {
				console.log(e)
				var data = {}
				data.id = e._id
				data.isHot = e.isHot
				this.disabled = true
				uni.hideLoading()
				this.$api.IsHot(data).then((res) => {
					uni.hideLoading()
					this.disabled = false
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
					this.getGoodsList()
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
					this.disabled = false
					this.$message({
						type: 'error',
						message: res.msg,
						duration: 800,
						offset: 200,

					})
				})
			},
			changeBtn1(e) {
				console.log(e)
				var data = {}
				data.id = e._id
				data.isNew = e.isNew
				uni.hideLoading()
				this.disabled = true
				this.$api.IsNew(data).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.disabled = false
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
					this.getGoodsList()
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
					this.disabled = false
					this.$message({
						type: 'error',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
				})
			},
			changeBtn2(e) {
				console.log(e)
				var data = {}
				data.id = e._id
				data.isStop = e.isStop
				uni.hideLoading()
				this.disabled = true
				this.$api.IsStop(data).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.disabled = false
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
					this.getGoodsList()
				}).catch((err) => {
					uni.hideLoading()
					this.disabled = false
					console.error(err)
					this.$message({
						type: 'error',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
				})
			},
			IsStopA() {
				this.list1 = [];
				this.isStop = true
				this.clickNum = 1
				this.currentPage = 1
				this.getGoodsList1()
			},

			IsStopB() {
				this.list1 = [];
				this.isStop = false
				this.clickNum = 1
				this.currentPage = 1
				this.getGoodsList1()
			},
			IsStopC() {
				this.clickNum = 0
				this.currentPage = 1
				this.getGoodsList()
			},
			getListB() {
				this.clickNum = 0
				this.currentPage = 1
				this.getGoodsList()
			},
			delArticle(e) {
				var data = {}
				data._id = e
				console.log(e)
				this.$api.IsDel(data).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.disabled = false
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
					this.getGoodsList()
				}).catch((err) => {
					uni.hideLoading()
					this.disabled = false
					console.error(err)
					this.$message({
						type: 'error',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
				})
			},
			Inquire(){
				this.getGoodsList()
			},
			getCategoryBtn(){
				let url = 'get-category1'
				
				uniCloud.callFunction({
						name: url
					}).then((res) => {
					console.log(res)
					this.arrS=res.result.data
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodsManag-box {
		.div-h {
			line-height: 30px;
			background-color: #fff;
			padding: 15px;
			text-align: left;

			.tab-btn {
				margin: 0 0 20px;

				.el-button {
					padding: 9px 10px;
				}
			}

			.tab-btn1 {
				.tab-btn-c {
					.input-box {
						width: 12%;
						display: inline-block;
						margin-left: 25px;
						margin-right: 5px;
					}
				}

				.el-button {
					padding: 7px 7px;
				}
			}

		}

		.div-c {
			line-height: 30px;
			background-color: #fff;
			padding: 15px;
			text-align: left;
		}

		.block {
			margin-top: 10px;
		}
	}
</style>
