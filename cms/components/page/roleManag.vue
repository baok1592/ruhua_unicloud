<template>
	<div class="roleManag-box">
		<div class="btn-box">
			<!-- <el-button class="btn" type="danger" size="small" @click="delArticle('all')" :disabled="checkedIds.length === 0">删除选中</el-button> -->
			<el-button class="btn" type="primary" size="small" @click="articleOperate('add')">添加管理员</el-button>
		</div>
		<el-table :data="list">
			<!-- 	<el-table-column align="center" type="selection">
			</el-table-column> -->
			<el-table-column prop="adminName" label="员工姓名">
			</el-table-column>
			<el-table-column prop="username" align="center" label="登录账号">
			</el-table-column>
			<el-table-column prop="password" align="center" label="登录密码">
			</el-table-column>
			<el-table-column prop="status" align="center" label="状态">
			</el-table-column>
			<el-table-column label="权限编辑">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="articleOperate('edit',scope.row)" :disabled="scope.row.Pid==0">编辑</el-button>
					<el-button @click="delArticle(scope.row._id)" type="text" size="small" style="color: red;" :disabled="scope.row.Pid==0">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="limit"
		 layout="total,pager" :total="total">
		</el-pagination>
		<el-dialog el-dialog :title="typeName" :visible.sync="articleFormVisible" :close-on-press-escape="false"
		 :close-on-click-modal="false" width="25%" top="4vh">
			<el-form>
				<el-form-item label="姓名" prop="title" label-width="50px">
					<el-input v-model="adminName" style="width: 30%;" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="title" label-width="50px">
					<el-input v-model="username" :disabled="true" style="width:50%;"></el-input>
					<el-button type="primary" style="margin-left: 15px;" @click="createBtb()" :disabled="disabled">生成账号</el-button>
				</el-form-item>
				<el-form-item label="密码" prop="title" label-width="50px" v-if="Name!='添加员工'">
					<el-input v-model="password" style="width: 30%;"></el-input>
				</el-form-item>
				<el-form-item label="权限" prop="title" label-width="50px">
					<el-checkbox-group v-model="checkList">
						<el-checkbox label="商品管理" v-model="isGoods" @change="isGoodsC()"></el-checkbox>
						<el-checkbox label="订单管理" v-model="isOrder" @change="isOrderC()"></el-checkbox>
						<el-checkbox label="文章管理" v-model="isText" @change="isTextC()"></el-checkbox>
						<el-checkbox label="系统管理" v-model="isAdminof" @change="isAdminofC()"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="状态" prop="title" label-width="50px">
					<el-radio v-model="radio" label="1" @change="changeOne()">启用</el-radio>
					<el-radio v-model="radio" label="2" @change="changeT()">禁用</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="articleFormVisible= false">取 消</el-button>
				<el-button type="primary" @click="addCategoryBtn">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkedIds: [],
				list: [],
				currentPage: 1, // 当前页数
				total: 0, // 总条数
				limit: 5,
				adminName: '',
				username: '',
				password: "123456",
				articleFormVisible: false,
				Name: "添加员工",
				checkList: [],
				radio: "1",
				form: {},
				isAdminof: false,
				isGoods: false,
				isOrder: false,
				isText: false,
				tyep: "",
				typeName: "",
				disabled: false
			};
		},
		mounted() {
			this.getAadmin();
		},
		methods: {
			delArticle(e) {
				var data = {}
				data._id = e
				this.$api.DelAdmin(data).then((res) => {
					uni.hideLoading()
					console.log(res)
					this.disabled = false
					this.getAadmin();
					this.$message({
						type: 'success',
						message: res.msg,
						duration: 800,
						offset: 200,
					})
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
			articleOperate(e, res) {
				var that = this
				that.articleFormVisible = true
				that.tyep = e
				//console.log(that.tyep)
				if (e == "add") {
					this.disabled = false
					that.typeName = "添加管理员"
					that.username = "";
					that.adminName = "";
					that.password ="123456";
					that.isAdminof = false;
					that.isGoods = false;
					that.isOrder = false;
					that.isText = false;
					that.delete_date = "0";
					that.Enable = "1"
					that.form={}
				} else {
					console.log(res)
					that.disabled = true
					that.typeName = "修改权限"
					that.username = res.username;
					that.adminName = res.adminName;
					that.password = res.password;
					that.isAdminof = res.isAdminof;
					that.isGoods = res.isGoods;
					that.isOrder = res.isOrder;
					that.isText = res.isText;
					that._id = res._id;
					that.Pid =res.Pid
					that.delete_date = "0";
					that.Enable = res.Enable.toString()
				}


			},
			// 翻页
			handleCurrentChange(val) {
				// this.page = val

			},
			createBtb() {
				this.username = 'QY' + this.GenNonDuplicateID()

			},
			GenNonDuplicateID: function() { //生成ID
				// let idStr = Date.now().toString(36)
				// idStr += Math.random().toString(36).substr(3, 4)
				// return idStr
				let idStr = Math.random().toString(36).substr(3, 4)
				return idStr
			},
			isGoodsC() {
				this.isGoods = !this.isGoods
			},
			isOrderC() {
				this.isOrder = !this.isOrder

			},
			isTextC() {
				this.isText = !this.isText
			},
			isAdminofC() {
				this.isAdminof = !this.isAdminof
			},
			changeOne() {
				console.log(this.radio)
			},
			changeT() {
				console.log(this.radio)
			},
			getAadmin() {
				var that = this
				that.uploading = true
				let url = 'uni-admin'
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: url
				}).then((res) => {
					console.log(res.result)
					that.total = res.result.affectedDocs

					for (var i = 0; i < res.result.data.length; i++) {
						if (res.result.data[i].Enable == 1) {
							res.result.data[i].status = "启用"
						} else {
							res.result.data[i].status = "禁用"
						}
					}
					that.list = res.result.data
					that.uploading = false
					uni.hideLoading()
					// that.$message({
					// 	showClose: true,
					// 	message: '操作成功',
					// 	type: 'success'
					// })
				})
			},
			addCategoryBtn() {
				var that = this
				let user = uni.getStorageSync('user');
				if (!that.username || !that.adminName) {
					that.$message({
						showClose: true,
						message: '管理员姓名或者账号为空',
						type: 'error'
					})
					return
				}

				if (that.tyep == "add") {
					that.form.username = that.username;
					that.form.adminName = that.adminName;
					that.form.password = that.password;
					that.form.isAdminof = that.isAdminof;
					that.form.isGoods = that.isGoods;
					that.form.isOrder = that.isOrder;
					that.form.isText = that.isText;
					if (user) {
						that.form.Pid = user._id;
					} else {
						that.form.Pid = 0;
					}
					that.form.delete_date = "0";
					that.form.Enable = parseInt(that.radio)
					that.uploading = true
					that.articleFormVisible = false
					let form = {
						...that.form
					}
					let url = 'addAdmin'

					uniCloud.callFunction({
						name: url,
						data: {
							...form,
						}
					}).then((res) => {
						that.uploading = false
						that.articleFormVisible = false
						that.getAadmin();
						that.$message({
							showClose: true,
							message: '操作成功',
							type: 'success'
						})
					})
				} else {
		
					that.form.username = that.username;
					that.form.adminName = that.adminName;
					that.form.password = that.password;
					that.form.isAdminof = that.isAdminof;
					that.form.isGoods = that.isGoods;
					that.form.isOrder = that.isOrder;
					that.form.isText = that.isText;
					that.form._id = that._id;
					that.form.Pid = that.Pid;
					that.form.delete_date = "0";
					that.form.Enable = parseInt(that.radio)
					if (user) {
						
					} else {
						that.form.Pid = 0;
					}
					that.form.delete_date = "0";
					console.log(that.form)
					let form = {
						...that.form
					}
					let url = 'ediAdmin'
					uniCloud.callFunction({
						name: url,
						data: {
							...form,
						}
					}).then((res) => {
						that.uploading = false
						that.articleFormVisible = false
						that.getAadmin();
						that.$message({
							showClose: true,
							message: '修改成功',
							type: 'success'
						})
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.roleManag-box {
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
