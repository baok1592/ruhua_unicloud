<template>
	<div class="article-box">
		<div class="btn-box">
			<el-button class="btn" type="danger" size="small" @click="delArticle('all')" :disabled="checkedIds.length === 0">删除选中</el-button>
			<el-button class="btn" type="primary" size="small" @click="articleOperate('add')">添加文章</el-button>
		</div>
		<el-table :data="list" border @selection-change="handleSelectionChange" v-loading="loading">
			<el-table-column align="center" type="selection" width="50">
			</el-table-column>
			<el-table-column prop="title" label="标题">
			</el-table-column>
			<el-table-column prop="image" align="center" width="150px" label="缩略图">
				<template slot-scope="scope">
					<el-popover placement="right" trigger="hover">
						<img :src="scope.row.image" style="max-height: 300px;max-width: 500px" />
						<img slot="reference" :src="scope.row.image" style="max-height: 30px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="create_date" align="center" label="发布日期" width="200">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="articleOperate('edit',scope.row)">编辑</el-button>
					<el-button @click.native="delArticle('one', scope.row._id)" type="text" size="small" style="color: red;">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="limit"
		 layout="total,pager" :total="total">
		</el-pagination>
		<el-dialog :title="operateName" :visible.sync="articleFormVisible" :close-on-press-escape="false"
		 :close-on-click-modal="false" width="60%" top="4vh">
			<el-form :model="article" ref="articleForm" :rules="rules" v-loading="uploading">
				<el-form-item label="标题" prop="title" label-width="50px">
					<el-input v-model="article.title"></el-input>
				</el-form-item>
				<el-form-item label="缩略图" style="margin-bottom: 0;">
					<div class="image-box" v-if="article.image">
						<img :src="article.image" class="image">
						<i class="el-icon-delete-solid" @click="deleteImage"></i>
					</div>
					<i v-else class="el-icon-plus image-uploader-icon" @click="uploadImage('article')"></i>
				</el-form-item>
				<el-form-item>
					<view class='editor'>
						<view class='toolbar' @click="format">
							<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
							<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
							<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
							<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
							<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
							 data-value="left"></view>
							<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
							 data-value="center"></view>
							<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
							 data-value="right"></view>
							<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
							 data-value="justify"></view>
							<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
							 data-value="2"></view>
							<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
							 data-value="2em"></view>
							<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
							 data-value="20px"></view>
							<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
							 data-name="marginBottom" data-value="20px"></view>
							<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
							<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily"
							 data-value="Pacifico"></view>
							<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
							 data-value="24px"></view>
							<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
							 data-value="#0000ff"></view>
							<view :class="formats.backgroundColor === '#00ffff' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
							 data-name="backgroundColor" data-value="#00ffff"></view>
							<view class="iconfont icon-date" @tap="insertDate"></view>
							<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
							<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
							 data-value="ordered"></view>
							<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
							 data-value="bullet"></view>
							<view class="iconfont icon-undo" @tap="undo"></view>
							<view class="iconfont icon-redo" @tap="redo"></view>
							<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
							<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
							<view class="iconfont icon-charutupian" @tap="uploadImage('editor')"></view>
							<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
							 :data-value="1"></view>
							<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
							 data-value="sub"></view>
							<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
							 data-value="super"></view>
							<view class="iconfont icon-shanchu" @tap="clearEditor"></view>
							<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
							 data-value="rtl"></view>
						</view>
						<editor id="editor" class="ql-container" placeholder="在这里输入文章内容..." showImgSize showImgToolbar showImgResize
						 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
						</editor>
					</view>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="articleFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 1, // 当前页数
				total: 0, // 总条数
				limit: 5, // 每页显示条数
				list: [],
				loading: false,
				checkedIds: [], // 选中的文章ID
				articleFormVisible: false,
				article: {},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}]
				},
				operateName: '添加文章',
				uploading: false,
				readOnly: false,
				formats: {}
			}
		},
		created() {
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
			this.getList()
		},
		methods: {
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clearEditor() {
				this.editorCtx.clear()
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			getList() {
				this.loading = true
				uniCloud.callFunction({
					name: "getArticleList",
					data: {
						page: this.currentPage,
						limit: this.limit
					}
				}).then((res) => {
					if (res.success) {
						console.log(res.result.data)
						this.loading = false
						this.total = res.result.total
						this.list = res.result.data
					}
				})
			},
			// 翻页
			handleCurrentChange(val) {
				this.page = val
				this.getList()
			},
			// 获取选中
			handleSelectionChange(val) {
				this.checkedIds = []
				val.forEach(item => {
					this.checkedIds.push(item._id)
				})
			},
			// 删除文章
			delArticle(type, id) {
				this.$confirm('此操作将删除选中的文章, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					uniCloud.callFunction({
						name: "updateArticle",
						data: {
							id: type === 'one' ? id : this.checkedIds,
							delete_date: new Date().toLocaleDateString()
						}
					}).then((res) => {
						this.$message({
							type: 'success',
							message: '删除成功',
							duration: 800,
							offset: 200,
							onClose: () => {
								this.getList()
							}
						})
					})
				}).catch(() => {
					// 取消
				})
			},
			articleOperate(type, article) {
				this.article = {}
				if (this.editorCtx) {
					this.clearEditor()
				}
				if (type === 'add') {
					this.operateName = '添加文章'
				}
				if (type === 'edit') {
					this.operateName = '编辑文章'
					this.article = {
						...article
					}
					this.uploading = true
					uniCloud.callFunction({
						name: "getArticle",
						data: {
							id: article._id
						}
					}).then((res) => {
						this.editorCtx.setContents({
							html: res.result.data[0].content,
							complete: () => {
								this.uploading = false
							}
						})
					})
				}
				this.articleFormVisible = true
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
			submitForm() {
				let that = this
				let article = {
					...that.article
				}
				if (!article.title) {
					this.$message({
						showClose: true,
						message: '文章标题不能为空',
						type: 'warning'
					})
					return
				}
				that.editorCtx.getContents({
					success: res => {
						if (res.html === '<p><br></p>') {
							this.$message({
								showClose: true,
								message: '文章内容不能为空',
								type: 'warning'
							})
						} else {
							that.uploading = true
							let url = 'addArticle'
							if (article._id) {
								url = 'updateArticle'
								article.id = article._id
								delete(article["_id"])
								article.update_date = new Date().toLocaleString()
							} else {
								article.create_date = new Date().toLocaleString()
							}
							uniCloud.callFunction({
								name: url,
								data: {
									...article,
									delete_date: '0',
									content: res.html
								}
							}).then((res) => {
								that.uploading = false
								that.articleFormVisible = false
								that.getList()
								this.$message({
									showClose: true,
									message: '操作成功',
									type: 'success'
								})
							})
						}
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "@/static/css/editor-icon.css";

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		margin-top: 5px;
	}


	.ql-container {
		box-sizing: border-box;
		padding: 10px 10px;
		width: 100%;
		min-height: 20vh;
		height: auto;
		background: #fff;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}

	.article-box {
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

	.image-box {
		position: relative;
		width: 120px;
		height: 120px;
		margin-left: 50px;

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
