<template>
	<view class="u-demo-area-box">
		<view class="u-demo-area">
			<view class="u-demo-area">
				<u-toast :type="typeG" ref="uToast1"></u-toast>
			</view>
			<u-popup border-radius="10" v-model="show" @close="close" @open="open" :mode="mode" length="45%" :mask="mask"
			 :closeable="closeable">
				<view class="goods-detail-box">
					<view class="goods-detail-log">
						<img :src="goodslog" class="home-new-img2" />
					</view>
					<view class="goods-detail-cont">
						<view class="text-left">￥<span>{{price}}</span></view>
						<view class="text-bottom"><span>{{colorL}}</span><span>{{sizeL}}</span><span v-if="sizeCont!=''">{{sizeCont}}</span><span>库存：</span><span>{{inventory}}</span></view>
					</view>
				</view>
				<view class="color-cont-box">
					<view class="color-cont-t" v-if="colorList.length>0">颜色</view>
					<view class="color-list">
						<view class="u-demo-area" v-for="(itme,index) in colorList" @click="areaBtn(index,itme)">
							<u-toast ref="uToast"></u-toast>
							<u-tag :text="itme.specLevel" :type="itme.types" shape="square" :closeable="closeable" :mode="modes" :show="show"
							 size="default" />
						</view>
					</view>
				</view>
				<view class="color-cont-box">
					<view class="color-cont-t" v-if="sizeList.length>0">大小</view>
					<view class="color-list">
						<view class="u-demo-area" v-for="(itmes,index) in sizeList" @click="areaBtn2(index,itmes)">
							<u-toast ref="uToast"></u-toast>
							<u-tag :text="itmes.specls" :type="itmes.types" shape="square" :closeable="closeable" :mode="modes" :show="show"
							 size="default" />
						</view>
					</view>
				</view>
				<view class="btn-click-Box">
					<view class="btn-click-cont">
						<u-button @click="btnClick123" data-name="3333" :plain="plain12" shape="circle" size="default" :ripple="ripple"
						 type="warning">确定</u-button>
					</view>
				</view>

			</u-popup>
		</view>
	</view>
</template>

<script>
	var specId;
	var specidLv2;
	var objects = {};
	export default {
		props: ['DetailC'],
		data() {
			return {
				current: 0,
				show: false,
				mode: 'bottom',
				mask: true, // 是否显示遮罩
				closeable: false,
				closeIconPos: 'top-right',
				text12: '黑色',
				sizeCont: '',
				colorL: '',
				sizeL: '',
				colorList: [],
				sizeList: [],
				modes: 'light',
				plain12: false,
				ripple: true,
				typeG: 'error',
				position: 'center',
				icon: true,
				url: '',
				title: "",
				goodsList: [],
				price: 0,
				goodslog: '',
				shopingCat: [],
				numm: 0,
				inventory: 0,
				Datatime: '',
				uidValue: ''
			};
		},
		methods: {
			parentHandleclick(e) {
				this.numm = e
				this.show = true;
				try {
					const uidValue = uni.getStorageSync('uid');
					if (uidValue) {
						this.uidValue = uidValue
						if (uidValue == '') {

						}
					} else {
						//alert(1123)

					}
				} catch (e) {
					// error

					console.log(e);
				}
				try {
					const value = uni.getStorageSync('shopingCat_key');
					if (value) {
						this.shopingCat = value
						if (value == '') {

						}
					} else {
						//alert(1123)

					}
				} catch (e) {
					// error

					console.log(e);
				}
				console.log(this.uidValue)
				objects = this.DetailC
				objects.uid = this.uidValue
				this.goodslog = this.DetailC.imgUrl
				if (this.DetailC.spec.length > 0) {
					for (var k in this.DetailC.spec) {
						this.DetailC.spec[k].types = "info"
						//specId=this.DetailC.spec[k].specId
					}
					this.colorList = this.DetailC.spec
					this.sizeList = []
				} else {
					specId = ''
					this.inventory = this.DetailC.inventory
				}
				this.price = this.DetailC.price
				this.colorL = ""
				this.sizeL = ""

				var obj1 = {}
				obj1._id = this.DetailC._id
				obj1.amount = 1
				this.goodsList.push(obj1)
				objects.amount = 1
			},
			close() {

			},
			open() {

			},
			areaBtn(e, n) {
				if (this.colorList.length > 0) {
					for (var i in this.colorList) {
						if (i == e) {
							this.colorList[i].types = "error"
						} else {
							this.colorList[i].types = "info"
						}
						specId = this.colorList[e].specId
						objects.specId = this.colorList[e].specId
						objects.specLevel = this.colorList[e].specLevel
					}
					this.colorL = n.specLevel
					this.inventory = n.inventory
					this.sizeList = this.colorList[e].specLevel1
					if (this.colorList[e].specLevel1.length > 0) {
						this.sizeList = []
						for (var n in this.colorList[e].specLevel1) {
							this.colorList[e].specLevel1[n].types = "info"
						}

						this.sizeList = this.colorList[e].specLevel1

					} else {
						specidLv2 = ''
						this.price = this.colorList[e].price
						objects.price = this.colorList[e].price
					}
				}
			},
			areaBtn2(e, n) {
				for (var k in this.sizeList) {
					if (k == e) {
						this.sizeList[k].types = "error"
					} else {
						this.sizeList[k].types = "info"
					}
				}
				if (this.sizeList.length > 0) {
					this.price = this.sizeList[e].price
					objects.price = this.sizeList[e].price
					specidLv2 = this.sizeList[e].specidLv2
					objects.specidLv2 = this.sizeList[e].specidLv2
					objects.specls = this.sizeList[e].specls
				}
				this.sizeL = this.sizeList[e].specls
				this.inventory = this.sizeList[e].inventory
			},
			btnClick123() {
				let flag = true;
				if (this.numm == 1) {
					if (this.colorList.length > 0) {
						if (this.sizeList.length > 0) {
							if (this.colorL != "" && this.sizeL) {
								this.order()
								this.show = false;
							} else {
								this.title = "请选择规格"
								this.$refs.uToast1.show({
									title: this.title,
									position: this.position,
									type: this.typeG,
									icon: this.icon,
									url: this.url,
								});
							}
						} else {
							if (this.colorL != "") {
								this.show = false;
								this.order()
							} else {
								this.title = "请选择规格"
								this.$refs.uToast1.show({
									title: this.title,
									position: this.position,
									type: this.typeG,
									icon: this.icon,
									url: this.url,
								});
							}
						}

					} else {
						this.show = false;
						this.order()
					}
				} else {
					// 大叔大婶多
					if (this.colorList.length > 0) {
						if (this.sizeList.length > 0) {
							if (this.colorL != "" && this.sizeL) {
								this.show = false;
								if (this.shopingCat.length > 0) {
									this.shopingCat.forEach(item => {
										if (item._id == objects._id) {
											this.title = "该商品已在购物车中请勿重复添加"
											this.$refs.uToast1.show({
												title: this.title,
												position: this.position,
												type: this.typeG,
												icon: this.icon,
												url: this.url,
											});
											flag = false;
											this.show = false;
											//break;
										}
										if (this.shopingCat.length > 3) {
											this.title = "购物车商品不能超过4件"
											this.$refs.uToast1.show({
												title: this.title,
												position: this.position,
												type: this.typeG,
												icon: this.icon,
												url: this.url,
											});
											flag = false;
											this.show = false;
										}
									})
									if (flag) {
										this.shopingCat.push(objects)
										//this.addGoodsBtn(objects)
										this.title = "商品添加成功";
									
										this.typeG = "success"
										this.$refs.uToast1.show({
											title: this.title,
											position: this.position,
											type: this.typeG,
											icon: this.icon,
											url: this.url,
										});
										uni.switchTab({
											url: '/pages/shoppingCart/shoppingCart'
										});
										//this.addGoodsBtn(objects)
										try {
											uni.setStorageSync('shopingCat_key', this.shopingCat);
										} catch (e) {
											// error
										}
										this.show = false;
									}
								} else {
									this.shopingCat.push(objects)
									//this.addGoodsBtn(objects)
									this.title = "商品添加成功";
									this.typeG = "success"
									this.$refs.uToast1.show({
										title: this.title,
										position: this.position,
										type: this.typeG,
										icon: this.icon,
										url: this.url,
									});
									uni.switchTab({
										url: '/pages/shoppingCart/shoppingCart'
									});
									//this.addGoodsBtn(objects)
									try {
										uni.setStorageSync('shopingCat_key', this.shopingCat);
									} catch (e) {
										// error
									}
									this.show = false;
								}
							} else {
								this.title = "请选择规格"
								this.$refs.uToast1.show({
									title: this.title,
									position: this.position,
									type: this.typeG,
									icon: this.icon,
									url: this.url,
								});
							}
						} else {
							if (this.colorL != "") {
								this.show = false;
								if (this.shopingCat.length > 0) {
									this.shopingCat.forEach(item => {
										if (item._id == objects._id) {
											this.title = "该商品已在购物车中请勿重复添加"
											this.$refs.uToast1.show({
												title: this.title,
												position: this.position,
												type: this.typeG,
												icon: this.icon,
												url: this.url,
											});
											flag = false;
											this.show = false;
											//break;
										}
										if (this.shopingCat.length > 3) {
											this.title = "购物车商品不能超过4件"
											this.$refs.uToast1.show({
												title: this.title,
												position: this.position,
												type: this.typeG,
												icon: this.icon,
												url: this.url,
											});
											flag = false;
											this.show = false;
										}
									})
									if (flag) {
										this.shopingCat.push(objects)
										//this.addGoodsBtn(objects)
										this.title = "商品添加成功";
										this.typeG = "success"
										this.$refs.uToast1.show({
											title: this.title,
											position: this.position,
											type: this.typeG,
											icon: this.icon,
											url: this.url,
										});
										uni.switchTab({
											url: '/pages/shoppingCart/shoppingCart'
										});
										//this.addGoodsBtn(objects)
										try {
											uni.setStorageSync('shopingCat_key', this.shopingCat);
										} catch (e) {
											// error
										}
										this.show = false;
									}
								} else {
									this.shopingCat.push(objects)
									//this.addGoodsBtn(objects)
									this.title = "商品添加成功";
								
									this.typeG = "success"
									this.$refs.uToast1.show({
										title: this.title,
										position: this.position,
										type: this.typeG,
										icon: this.icon,
										url: this.url,
									});
									uni.switchTab({
										url: '/pages/shoppingCart/shoppingCart'
									});
									//this.addGoodsBtn(objects)
									try {
										uni.setStorageSync('shopingCat_key', this.shopingCat);
									} catch (e) {
										// error
									}
									this.show = false;
								}
							} else {
								this.title = "请选择规格"
								this.$refs.uToast1.show({
									title: this.title,
									position: this.position,
									type: this.typeG,
									icon: this.icon,
									url: this.url,
								});
							}
						}

					} else {
						this.show = false;
						if (this.shopingCat.length > 0) {
							this.shopingCat.forEach(item => {
								if (item._id == objects._id) {
									this.title = "该商品已在购物车中请勿重复添加"
									this.$refs.uToast1.show({
										title: this.title,
										position: this.position,
										type: this.typeG,
										icon: this.icon,
										url: this.url,
									});
									flag = false;
									this.show = false;
									//break;
								}
								if (this.shopingCat.length > 3) {
									this.title = "购物车商品不能超过4件"
									this.$refs.uToast1.show({
										title: this.title,
										position: this.position,
										type: this.typeG,
										icon: this.icon,
										url: this.url,
									});
									flag = false;
									this.show = false;
								}
							})
							if (flag) {
								this.shopingCat.push(objects)
								//this.addGoodsBtn(objects)
								this.title = "商品添加成功";
							
								this.typeG = "success"
								this.$refs.uToast1.show({
									title: this.title,
									position: this.position,
									type: this.typeG,
									icon: this.icon,
									url: this.url,
								});
								uni.switchTab({
									url: '/pages/shoppingCart/shoppingCart'
								});
								//var arrs = this.shopingCat;
								//this.addGoodsBtn(objects)
								try {
									uni.setStorageSync('shopingCat_key', this.shopingCat);
								} catch (e) {
									// error
								}
								this.show = false;
							}
						} else {
							this.shopingCat.push(objects)
							//this.addGoodsBtn(objects)
							this.title = "商品添加成功";
							this.typeG = "success"
							this.$refs.uToast1.show({
								title: this.title,
								position: this.position,
								type: this.typeG,
								icon: this.icon,
								url: this.url,
							});
							uni.switchTab({
								url: '/pages/shoppingCart/shoppingCart'
							});
							//this.addGoodsBtn(objects)
							try {
								uni.setStorageSync('shopingCat_key', this.shopingCat);
							} catch (e) {
								// error
							}
							this.show = false;
						}
					}
				}
			},
			getOrderTime() {
				var date = new Date();
				var year = date.getFullYear(); //获取当前年份
				var mon = date.getMonth() + 1; //获取当前月份
				var da = date.getDate(); //获取当前日
				var day = date.getDay(); //获取当前星期几
				var h = date.getHours(); //获取小时
				var m = date.getMinutes(); //获取分钟
				var s = date.getSeconds(); //获取秒
				var d;
				this.Datatime =
					year +
					"-" +
					mon +
					"-" +
					da +
					" " +
					" " +
					" " +
					h +
					":" +
					m +
					":" +
					s;
			},
			order() {
				this.getOrderTime()
				this.$api.get_order({
					//name: 'order',
					data: {
						goodsInOrder: this.goodsList.map((itme) => {
							return {
								id: itme._id,
								// 本示例为每种商品购买一件，方便演示
								specId: specId,
								price: this.price,
								amount: 1,
								specidLv2: specidLv2,
								createTime: this.Datatime
							}
						})
					}
				}).then((res) => {
					if (res.outTradeNo) {
						uni.navigateTo({
							url: '/pages/CreateOrder/CreateOrder?outTradeNo=' + res.outTradeNo
						});
					} else {
						throw new Error(res.msg)
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '下单失败',
						showCancel: false
					})
				})
			},
			// addGoodsBtn(e) {
			// 	uni.showLoading({
			// 		title: '处理中...'
			// 	})
			// 	uniCloud.callFunction({
			// 		name: 'add-goods',
			// 		data: e
			// 	}).then((res) => {
			// 		uni.hideLoading()
			// 		this.title = "添加商品成功"
			// 		this.typeG = "success"
			// 		this.$refs.uToast1.show({
			// 			title: this.title,
			// 			position: this.position,
			// 			type: this.typeG,
			// 			icon: this.icon,
			// 			url: this.url,
			// 		});
			// 		uni.switchTab({
			// 			url: '/pages/shoppingCart/shoppingCart'
			// 		});
			// 		console.log(res)
			// 	}).catch((err) => {
			// 		uni.hideLoading()
			// 		this.title = "添加商品失败"
			// 		this.$refs.uToast1.show({
			// 			title: this.title,
			// 			position: this.position,
			// 			type: this.typeG,
			// 			icon: this.icon,
			// 			url: this.url,
			// 		});
			// 		console.error(err)
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.goods-detail-box {
		width: 100%;
		height: 200rpx;
		// background-color: #dd6161;
		overflow: hidden;

		.goods-detail-log {
			width: 160rpx;
			height: 160rpx;
			background-color: #dd6161;
			float: left;
			margin-top: 30rpx;
			margin-left: 30rpx;
			border-radius: 5px;
			overflow: hidden;

			.home-new-img2 {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

		.goods-detail-cont {
			float: left;
			width: 50%;
			height: 160rpx;
			margin-top: 30rpx;
			margin-left: 5rpx;

			// background-color: #dd6161;
			.text-left {
				margin-top: 65rpx;
				text-align: left;
				font-size: 40rpx;
				color: #fa3534;
			}

			.text-bottom {
				margin-top: 10rpx;
				text-align: left;
				font-size: 24rpx;
				color: #c0c4cc;
			}
		}
	}

	.color-cont-box {
		width: 100%;

		// padding-left:30rpx;
		// background-color: #dd6161;
		.color-cont-t {
			padding-left: 30rpx;
			padding-top: 20rpx;
			padding-bottom: 15rpx;
			text-align: left;
			font-size: 30rpx;
		}

		.color-list {
			width: 100%;
			// height: 50rpx;
			// background-color: red;
			padding-left: 15rpx;
			padding-right: 30rpx;
			padding-bottom: 10rpx;
			overflow: hidden;

			.u-demo-area {
				float: left;
				margin-left: 20rpx;
				margin-top: 10rpx;
			}
		}
	}

	.btn-click-Box {
		width: 100%;
		height: 100rpx;
		// background-color: red;
		position: absolute;
		bottom: 0;

		.btn-click-cont {
			width: 85%;
			height: 100%;
			margin: auto;
		}
	}
</style>
