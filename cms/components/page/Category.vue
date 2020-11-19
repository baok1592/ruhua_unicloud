<template>
	<div class="Category-box">
		<div class="h-box">
			<div class="b-box" @click="addCBtn()">
				<el-button type="primary">添加商品分类</el-button>
			</div>
		</div>
		<div class="table-box">
			<template>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="sort" label="序号" width="50">
					</el-table-column>
					<el-table-column prop="CategoryName" label="商品分类名称" width="120">
					</el-table-column>
					<el-table-column prop="CNickname" label="商品分类简称" width="120">
					</el-table-column>
					<el-table-column prop="thumbnail" label="缩略图" width="65">>
						<template slot-scope="scope">
							<el-popover placement="right" trigger="hover">
								<img :src="scope.row.thumbnail" style="max-height: 300px;max-width: 500px" />
								<img slot="reference" :src="scope.row.thumbnail" style="max-height: 30px;max-width: 130px">
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="Pid" label="Pid">
					</el-table-column>
					<el-table-column prop="_id" label="分类id">
					</el-table-column>
					<el-table-column prop="showOrhide" label="是否显示" width="80">
						<template slot-scope="scope">
							<el-switch v-model="scope.row.showOrhide" active-color="#13ce66" inactive-color="#ff4949" @change="changeBtn6(scope.row)"
							 :disabled="disabled">
							</el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="60">
						<template slot-scope="scope">
							<!-- <el-button type="text" size="small" @click="articleOperate('edit',scope.row)">编辑</el-button> -->
							<el-button @click.native="delCategory(scope.row._id)" type="text" size="small" style="color: red;">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
		<div class="block">
			<!-- <span class="demonstration">完整功能</span> -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
			 :page-sizes="[5, 10, 20, 50,100]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<CategoryAdd ref="isShowC" :CategoryList="CategoryList"></CategoryAdd>
	</div>
</template>

<script>
	import CategoryAdd from "../CategoryAdd/CategoryAdd.vue"
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1,
				limit: 5,
				total: 0,
				Cmsge: false,
				clickNum: 0,
				CategoryList: [],
				disabled: false
			}
		},
		created() {

		},
		components: {
			CategoryAdd
		},
		mounted() {
			this.getCategory()
		},
		methods: {
			handleSizeChange(val) {
				if (this.clickNum == 0) {
					this.limit = val
					this.currentPage = 1;
					this.getCategory()
				}
				if (this.clickNum == 1) {
					this.limit = val
					this.currentPage = 1;
					this.getCategory()
				}
				//console.log(val)
			},
			handleCurrentChange(val) {
				if (this.clickNum == 0) {
					this.page = val
					this.getCategory()
				}
				if (this.clickNum == 1) {
					this.page = val
					this.getCategory()
				}
			},
			addCBtn() {
				this.Cmsge = true;
				this.$refs.isShowC.initBtn(this.Cmsge);
			},
			fatherMethodS() {
				this.getCategory()
			},
			getCategory() {
				var data = {};
				data.page = this.currentPage;
				data.limit = this.limit;
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.getCategory(data).then((res) => {
					uni.hideLoading()
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].sort = i + 1
						if (res.data[i].Pid != 0) {
							res.data[i].CategoryName = "   |——" + res.data[i].CategoryName
						}
					}
					this.total = res.total
					this.tableData = res.data
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			changeBtn6(e) {
				var data = {}
				data.id = e._id
				data.showOrhide = e.showOrhide
				uni.hideLoading()
				this.disabled = true
				this.$api.showOrhide(data).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.disabled = false
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
					this.getCategory()
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
			delCategory(e) {
				var data = {}
				data._id = e
				this.$api.delCategory(data).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.disabled = false
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
					this.getCategory()
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
			}
		}
	}
</script>
<style lang="less" scoped>
	.Category-box {
		background-color: #fff;

		.h-box {
			width: 100%;
			height: 75px;

			.b-box {
				position: relative;
				top: 18px;
				left: 15px;
			}
		}

		.table-box {
			width: 96%;
			margin: auto;
			margin-bottom: 20px;
		}
	}
</style>
