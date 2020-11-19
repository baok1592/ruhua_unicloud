<template>
	<div class="order-box">
		<div class="btn-box">

			<!-- 	<el-button class="btn" type="primary" size="small" @click="articleOperate('add')">添加员工</el-button> -->
		</div>
		<el-table :data="list">
			<el-table-column prop="sort" label="序号" width="60">
			</el-table-column>
			<el-table-column prop="outTradeNo" label="订单号">
			</el-table-column>
			<el-table-column prop="goodsName" align="center" label="商品名称">
			</el-table-column>
			<el-table-column prop="price" align="center" label="订单价格">
			</el-table-column>
			<el-table-column prop="pay" align="center" label="支付方式">
			</el-table-column>
			<el-table-column prop="createDate" align="center" label="创建日期">
			</el-table-column>
			<el-table-column prop="Pays" align="center" label="支付状态">
			</el-table-column>
			<el-table-column prop="OrderS" align="center" label="订单状态">
			</el-table-column>
			<!-- <el-table-column label="">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="articleOperate('edit',scope.row)">编辑</el-button>
					<el-button @click.native="delArticle('one', scope.row._id)" type="text" size="small" style="color: red;">删除</el-button>
				</template>
			</el-table-column> -->
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="limit"
		 layout="total,pager" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	let arr = [];
	let arr1 = []
	export default {
		data() {
			return {
				list: [],
				currentPage: 1, // 当前页数
				total: 0, // 总条数
				limit: 5,
				OrderList: []
			};
		},
		mounted() {
			this.getOrderCms()
		},
		methods: {
			getOrderCms() {
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callOrder().then((res) => {
					uni.hideLoading()
					console.log(res)
					for (var s =0; s < res.data.length; s++) {
						res.data[s].sort = s + 1
					
					}
					arr = res.data
					console.log(res.data)
					this.total=res.total
					this.getGoods()
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			getGoods() {
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callgoodsList().then((res) => {
					uni.hideLoading()
					console.log(res)
					arr1 = res.data
					var Object;
					for (var i = 0; i < arr.length; i++) {
						var arr2 = arr[i].goodsInOrder
						for (var n = 0; n < arr2.length; n++) {
							//console.log(arr3[n])
							for (var k = 0; k < arr1.length; k++) {
								Object = {}
								if (arr2[n].id == arr1[k]._id) {
									Object.outTradeNo = arr[i].outTradeNo
									Object.goodsName = arr1[k].goodsName
									Object.price = arr[i].totalFee
									Object.pay = arr[i].payment_channel
									Object.createDate = arr2[n].createTime
									if(arr[i].status==1){
										Object.Pays = "未支付"
									}else{
										Object.Pays = "已支付"
									}
									
									if(arr[i].status==2){
										Object.OrderS = "待收货"
									}else{
										Object.OrderS = "待付款"
									}
									
									Object.sort=arr[i].sort
									this.OrderList.push(Object)
								}
							}
						}
					}
					this.list=this.OrderList
					console.log(this.OrderList)
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			}
		}
	}
</script>

<style lang="less">
	.order-box {
		.btn-box {
			margin-bottom: 10px;

			.btn {
				margin-right: 10px;
			}
		}

		.el-pagination {
			margin-top: 20px;
		}
	}
</style>
