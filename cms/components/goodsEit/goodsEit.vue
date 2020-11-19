<template>
	<view style="position: relative;">
		<el-dialog :title="dialogName" :visible.sync="dialogFormVisible.msg">
			<div class="H-c">
				<div class="H-d">
					<el-button type="primary" icon="el-icon-arrow-left" circle @click="dialogFormVisible.msg = false"></el-button>
				</div>
				<el-form :model="form">
					<!-- <el-form-item label="商  品  ID  " prop="title" label-width="90px">
						<el-input v-model="form.goodsId" style="width: 75%;" size="small" placeholder="请输入商品id"></el-input>
					</el-form-item> -->
					<el-form-item label="商 品 名 称" prop="title" label-width="90px">
						<el-input v-model="form.goodsName" style="width: 75%;" size="small" placeholder="请输入商品名称"></el-input>
					</el-form-item>
					<el-form-item label="商 品 类 型" prop="title" label-width="90px">
						<el-radio v-model="form.radio" label="1" @change="changeS">实物商品(物流)</el-radio>
						<el-radio v-model="form.radio" label="2" @change="changeX">虚拟商品(验证码)</el-radio>
					</el-form-item>
					<el-form-item label="商 品 分 类" prop="title" label-width="90px">
						<el-select v-model="value" filterable placeholder="请选择" size="small" style="width: 75%;" @change="changeBtn">
							<el-option v-for="(item,index) in options" :key="index" :label="item.CategoryName" :value="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品销售价" prop="title" label-width="90px">
						<el-input v-model="form.price" style="width: 29%;" size="small" placeholder="请输入商品价格"></el-input>
					</el-form-item>
					<el-form-item label="商品促销语" prop="title" label-width="90px">
						<el-input v-model="form.goodsNameT" style="width: 75%;" size="small" placeholder="请输入促销文案"></el-input>
					</el-form-item>
					<el-form-item label="商品封面图" prop="title" label-width="90px">
						<div class="demo-image__preview" style="overflow:hidden;">

							<div class="image-box" v-if="form.bannerUrl.length>0" v-for="(itme,index) in form.bannerUrl">
								<!-- <img :src="article.image" class="image"> -->
								<el-image style="width: 100px; height: 100px" :src="itme.imgUrl" :preview-src-list="srcList">
								</el-image>
								<i class="el-icon-delete-solid" @click="deleteImage(index)"></i>
							</div>
							<i class="el-icon-plus image-uploader-icon" @click="uploadImage('article')" v-if="form.bannerUrl.length<5"></i>
						</div>

					</el-form-item>
					<el-form-item label="商 品 规 格" prop="title" label-width="90px">
						<el-radio v-model="form.radio2" label="1" @change="changeY">无</el-radio>
						<el-radio v-model="form.radio2" label="2" @change="changeW">有</el-radio>
					</el-form-item>
					<el-form-item>
						<skuv v-show="show_sku" :sub="sub" :del="sku_comfirm" :rdata="rdata" @pro_sku="pro_sku"></skuv>
					</el-form-item>
				</el-form>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible.msg = false">取 消</el-button>
				<el-button type="primary" @click="sub_caiji">确 定</el-button>
			</div>
		</el-dialog>
	</view>
</template>

<script>
	import skuv from "../sku.vue"
	export default {
		props: ['arrS'],
		data() {
			return {
				dialogFormVisible: {
					msg: false
				},
				dialogName: "添加商品",
				form: {
					radio: '1',
					radio2: '1',
					onePick: '',
					goodsNameT: '',
					assortId: 1,
					Shelves: 0,
					isHot: 0,
					isNew: 0,
					isStop: 0,
					pName: "",
					goodsId: "",
					imgUrl: '',
					bannerUrl: [],
					goodsName: "",
					price: "",
					spec: [],
					inventory: 33,
					storeId: 0,
					storeName: "测试四号店铺",
					delete_date: "0"
				},
				sub: 0,
				sku_comfirm: 0,
				rdata: {},
				value:0,
				options: [],
				input123: '',
				// url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				// srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
				disabled: false,
				disabled1: false,
				standData: [],
				show_sku: false,
				article: {
					image: ""
				},
				article1: [],
				srcList: [],
				type: ""
			};
		},
		components: {
			skuv
		},
		mounted() {
			
		},
		methods: {
		
			initBtn(msge, type, article) {
				
				this.srcList = []
				this.dialogFormVisible = msge
				this.standData = []
				this.options=this.arrS
				if (type == "add") {
					this.getGoods()
					this.type = type
					var forms = {
						radio: '1',
						radio2: '1',
						onePick: '',
						goodsNameT: '',
						assortId: 1,
						Shelves: 0,
						isHot: 0,
						isNew: 0,
						isStop: 0,
						pName: "",
						goodsId: "",
						imgUrl: '',
						bannerUrl: [],
						goodsName: "",
						price: "",
						spec: [],
						inventory: 33,
						storeId: 1,
						storeName: "测试四号店铺",
						delete_date: "0"
					}
					this.value=0
					this.form = forms
				}
				
				if (type == "edit") {
					this.type = type
					this.form = article
					for (var i = 0; i < this.form.bannerUrl.length; i++) {

						this.srcList.push(this.form.bannerUrl[i].imgUrl)
					}
				}


			},
			getGoods() {
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callgoodsList().then((res) => {
					uni.hideLoading()
					this.form.goodsId =res.data.length+1
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			addStand(i) {
				if (this.standData.length > 3) {
					//this.$message('不能超过四行')
					this.disabled = true
				} else {
					this.standData.push({
						title: '',
						attrs: []
					})
				}
			},
			addAtrr(i) {
				//  限制属性值不超过5个
				if (this.standData[i].attrs.length > 4) {
					this.$message('不能超过5个')
					// this.disabled1=true
				} else {
					// 存的时候是存的对象
					this.standData[i].attrs.push({
						attr: ''
					})
				}
			},
			pro_sku(e) {
				console.log(e, this.show_sku)
				if (this.show_sku == true) {

					this.form['sku'] = e['list']
					console.log('ssku:', this.form['sku'])
				} else {
					console.log('end--sku:', this.form['sku'])
					this.form['sku'] = []
				}


			},
			changeY() {
				console.log(this.form.radio2)
				this.show_sku = false
			},
			changeW() {
				console.log(this.form.radio2)
				this.show_sku = true
			},
			changeS() {
				console.log(this.form.radio)
			},
			changeX() {
				console.log(this.form.radio)
			},
			changeBtn(e){
				this.form.assortId=this.options[this.value]._id
			},
			//采集
			sub_caiji() {
				if (this.form.isHot == 0) {
					this.form.isHot = false
				} else {
					this.form.isHot = true
				}
				if (this.form.isNew == 0) {
					this.form.isNew = false
				} else {
					this.form.isNew = true
				}
				if (this.form.isStop == 0) {
					this.form.isStop = false
				} else {
					this.form.isStop = true
				}

				this.fullscreenLoading = true;
				// this.is_caiji = 1
				if (this.type == "add") {
					this.form.goodsId = parseInt(this.form.goodsId)
					this.form.price = parseInt(this.form.price)
					this.sub++
					var that = this;
					that.form.imgUrl = that.form.bannerUrl[0].imgUrl
					that.uploading = true
					let form = {
						...that.form
					}
					let url = 'addGoods'

					uniCloud.callFunction({
						name: url,
						data: {
							...form,
						}
					}).then((res) => {
						that.uploading = false
						that.$parent.fatherMethod();
						this.dialogFormVisible = false
						this.$message({
							showClose: true,
							message: '操作成功',
							type: 'success'
						})
					})
				}
				if (this.type == "edit") {
					this.form.goodsId = parseInt(this.form.goodsId)
					this.form.price = parseInt(this.form.price)
					var that = this;
					let form = {
						...that.form
					}
					let url = 'editGoods'
					uniCloud.callFunction({
						name: url,
						data: {
							...form,
						}
					}).then((res) => {
						that.uploading = false
						that.$parent.fatherMethod();
						this.dialogFormVisible = false
						this.$message({
							showClose: true,
							message: '操作成功',
							type: 'success'
						})
					})
				}

			},
			uploadImage(type) {
				console.log(type)
				let that = this
				let obj = {};
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

									that.srcList.push(that.article.image)
									obj.imgUrl = res.fileID
									// that.article1.push(res)
									that.form.bannerUrl.push(obj)
									console.log(that.form.bannerUrl)
								}
							}
						})
					}
				})
			},
			deleteImage(e) {
				this.uploading = true
				let that = this
				console.log(e)
				uniCloud.deleteFile({
					fileList: [that.form.bannerUrl[e].imgUrl],
					complete() {
						that.uploading = false
						that.form.bannerUrl.splice(e)
						console.log(that.form.bannerUrl)
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.H-c {
		width: 90%;
		margin: auto;

		.H-d {
			width: 100%;
			height: 50px;
		}

		.el-button {
			padding: 10px 10px;
		}

		.stand {
			width: 100%;
			height: 50px;

			.grid-content {
				border-radius: 4px;
				min-height: 36px;
				height: 50px;
			}

			.bg-purple-dark {
				background: #f8f8f8;
				position: relative;
			}

			.indexBox {
				position: relative;
				width: 170px;
				height: 40px;
				top: 5px;
				left: 10px;
			}

			.delete-box {
				position: absolute;
				top: 15px;
				right: 5px;
				width: 20px;
				height: 20px;
				background-color: #d9d9d9;
				border-radius: 100%;

			}

			.putt {
				display: inline-block;
				position: relative;
				margin-left: 10px;
				margin-top: 10px;

				.inputbox {
					width: 90px;
					height: 40px;
					top: 5px;
					left: 10px;
				}
			}

			.putt1 {
				margin-left: 10px;
				display: inline-block;

				.el-button {
					padding: 9px 9px;
				}
			}

			.add {
				margin-top: 10px;

				.grid-content {
					border-radius: 4px;
					min-height: 36px;
					height: 50px;
				}

				.bg-purple-dark {
					background: #f8f8f8;
				}

				.indexBox {
					position: relative;
					width: 170px;
					height: 40px;
					top: 5px;
					left: 10px;
				}
			}
		}
	}

	.image-box {
		position: relative;
		width: 100px;
		height: 100px;
		margin-left: 10px;
		margin-bottom: 10px;
		float: left;

		.image {
			width: 100px;
			height: 100px;
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
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		float: left;
		margin-left: 10px;
	}

	.el-image {
		float: left;
		border: 1px dashed #55aaff;
	}
</style>
