<template>
	<div style="position: relative;">
		<el-dialog :title="dialogName" :visible.sync="dialogFormVisible" width="25%">
			<el-form :model="form">
				<el-form-item label="商品分类名称" prop="title" label-width="110px">
					<el-input v-model="form.CategoryName" style="width: 75%;" size="small" placeholder="请输入商品分类名称"></el-input>
				</el-form-item>
				<el-form-item label="商品分类简称" prop="title" label-width="110px">
					<el-input v-model="form.CNickname" style="width: 75%;" size="small" placeholder="请输入商品分类简称"></el-input>
				</el-form-item>
				<el-form-item label="上  级  分  类" prop="title" label-width="110px">
					<el-select v-model="value" filterable placeholder="请选择" size="small" style="width: 75%;" @change="changeBtn">
						<el-option v-for="(item,index) in options" :key="index" :label="item.CategoryName" :value="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="缩略图" prop="title" label-width="110px">
					<div class="image-box" v-if="article.image">
						<img :src="article.image" class="image">
						<i class="el-icon-delete-solid" @click="deleteImage"></i>
					</div>
					<i v-else class="el-icon-plus image-uploader-icon" @click="uploadImage('article')"></i>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible= false">取 消</el-button>
				<el-button type="primary" @click="addCategoryBtn">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
				dialogName: "添加分类",
				form: {
					Pid: 0,
					CategoryName: "",
					CNickname: "",
					thumbnail: " ",
					showOrhide: true,
					delete_date: "0"
				},
				value:0,
				options: [],
				article: {
					image: " "
				}
			}
		},
		methods: {
			initBtn(e) {
				this.dialogFormVisible = e
				if (e == true) {
					this.getCategoryA()
					this.form = {
						Pid: 0,
						CategoryName: "",
						CNickname: "",
						thumbnail: " ",
						showOrhide: true,
						delete_date: "0"
					}
					this.value=0;
					this.deleteImage()
				}
			},
			uploadImage(type) {
				console.log(type)
				let that = this
				uni.chooseImage({
					count: 1,
					success: images => {
						that.uploading = true
						console.log(images.tempFiles[0].name)
						uniCloud.uploadFile({
							filePath: images.tempFilePaths[0],
							cloudPath: images.tempFiles[0].name,
							success(res) {
								that.uploading = false
								if (type === 'editor') {

									that.editorCtx.insertImage({
										src: res.fileID
									})
								} else {
									console.log(res)
									that.article.image = res.fileID
									console.log(that.article.image)
								}
							}
						})
					}
				})
			},
			deleteImage() {
				this.uploading = true
				let that = this
				uniCloud.deleteFile({
					fileList: [that.article.image],
					complete() {
						that.uploading = false
						that.article.image = ''
					}
				})
			},
			sub_caiji() {
				var that = this
				console.log(that.article.image)
			},
			getCategoryA() {
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.getCategoryA().then((res) => {
					uni.hideLoading()
					var obj = {}
					obj._id=0;
					obj.Pid=0
					obj.CategoryName= "顶级分类";
					obj.CNickname= "顶级分类";
					obj.thumbnail=" ";
					obj.showOrhide= true;
					obj.delete_date= "0";
					res.data.unshift(obj)
					this.options = res.data
					//console.log(this.navList)
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			changeBtn() {
				if(this.options[this.value]._id){
					this.form.Pid=this.options[this.value]._id
				}else{
					this.form.Pid=0
				}
				console.log(this.form.Pid)
			},
			addCategoryBtn() {
				var that = this
				that.form.thumbnail=that.article.image
				if (!that.form.CategoryName || !that.form.CNickname) {
					that.$message({
						showClose: true,
						message: '未填写分类名称或分类简称',
						type: 'error'
					})
					return
				}
				if (!that.article.image) {
					that.$message({
						showClose: true,
						message: '分类缩略图不能为空',
						type: 'error'
					})
					return
				}
				that.uploading = true
				let form = {
					...that.form
				}
				let url = 'addCategory'

				uniCloud.callFunction({
					name: url,
					data: {
						...form,
					}
				}).then((res) => {
					that.uploading = false
					that.dialogFormVisible = false
					that.$parent.fatherMethodS();
					that.$message({
						showClose: true,
						message: '操作成功',
						type: 'success'
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.dialog-box {
		width: 20%;
		margin: auto;
	}

	.image-box {
		position: relative;
		width: 120px;
		height: 120px;
		margin-left: 0px;

		.image {
			width: 120px;
			height: 120px;
			position: absolute;
			left: 0;
			top: 0;
		}

		.el-icon-delete-solid {
			color: red;
			position: absolute;
			bottom: 0;
			right: 0;
			font-size: 20px;
		}
	}

	.ql-editor {
		padding: 0;
	}

	.image-uploader-icon {
		border: 1px dashed #55aaff;
		font-size: 28px;
		color: #8c939d;
		width: 120px;
		height: 120px;
		line-height: 120px;
		text-align: center;
	}
</style>
