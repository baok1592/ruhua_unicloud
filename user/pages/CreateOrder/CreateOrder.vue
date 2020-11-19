<template>
	<view class="container">
		<view class="goods-section">
			<view class="g-item" v-for="itme in goodsListSi">
				<image :src="itme.imgUrl" mode="" class="g-item-img"></image>
				<view class="right">
					<text class="title clamp">
						{{itme.goodsName}}
					</text>
					<text class="spec">

					</text>
					<view class="price-box">
						<text class="price">￥{{itme.price}}</text>
						<text class="number">x 1</text>
						<text class="number" v-if="itme.specLevelname!=''">{{itme.specLevelname}}</text>
						<text class="number" v-if="itme.speclsName!=''">{{itme.speclsName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<view class="cell-icon">券</view>
				<text class="cell-tit clamp">优惠券</text>
				<view class="cell-tip active">
					暂无优惠券
				</view>
			</view>
		</view>
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{totalFee}}</text>
			</view>
		</view>
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">免运费</text>
			</view>
		</view>
		<view class="yt-list">
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="obj.msg" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="u-button-box">
			<!-- #ifndef H5 -->
			<view class="u-button-box1">
				<u-button data-name="3333" :plain="plain12" shape="circle" size="default" :ripple="ripple" :hairLine="hairLine"
				 type="warning" @click="pay()">支付</u-button>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="u-button-box1" v-if="!codeUrl && status !== 2">
				<u-button data-name="3333" :plain="plain12" shape="circle" size="default" :ripple="ripple" :hairLine="hairLine"
				 type="warning" @click="pay()">二维码支付</u-button>
			</view>
			<view class="u-button-box1" v-if="codeUrl && status !== 2">
				<u-button data-name="3333" :plain="plain12" shape="circle" size="default" :ripple="ripple" :hairLine="hairLine"
				 type="warning" @click="orderQuery()">我已经支付</u-button>
			</view>
			<!-- #endif -->
		</view>
		<view class="qr-box" v-if="iSshow" @click="qrBoxBtn()">
			<view class="qr-box-c">
				<view class="qr-box-d">
					<div class="qr-box-h">
						<canvas style="width:320upx;height:320upx;" canvas-id="couponQrcode"></canvas>
					</div>
					<div class="qr-box-t">二维码支付</div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const qrCode = require('@/common/weapp-qrcode.js')
	export default {
		data() {
			return {
				obj: {
					msg: '',
				},
				plain12: false,
				ripple: '',
				hairLine: false,
				providerList: [1, 2],
				goodsListSi: [],
				goodsList: [],
				totalFee: 0,
				status: 0,
				outTradeNo: '',
				codeUrl: "",
				OrderInfo: {},
				myprice: 0,
				specLevelname: '',
				speclsName: '',
				iSshow: false
			};

		},
		onLoad(options) {
			let outTradeNo = options.outTradeNo
			this.outTradeNo = outTradeNo

		},
		onShow() {
			try {
				const value = uni.getStorageSync('uni_id_token');
				if (value) {
					// console.log(value);
					if (value == '') {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				} else {
					//alert(1123)
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			} catch (e) {
				// error
				uni.navigateTo({
					url: '/pages/login/login'
				});
				//console.log(e);
			}
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail() {
				uni.showLoading({
					title: '正在获取商品列表',
					mask: true
				})

				const data = {};
				//console.log(this.$api.get_allFun)
				//const name = 'get-order-detail'
				data.outTradeNo = this.outTradeNo
				this.$api.getOrderDetail(data).then((res) => {
					uni.hideLoading()
					//console.log(res)
					uni.hideLoading()
					if (res.goodsList && res.goodsList.length > 0) {
						this.goodsList.splice(0, 0, ...res.goodsList)
						this.totalFee = res.totalFee
						this.status = res.status
						this.getOrderInfo()
					} else {
						//console.log(err);
						uni.hideLoading()
						uni.showModal({
							content: err.message || '获取商品列表失败',
							showCancel: false
						})
					}

				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			getOrderInfo() {
				//获取订单信息
				this.$api.getOrderInfo().then((res) => {
					for (var i in res.data) {
						if (res.data.length > 0) {
							if (res.data[i].outTradeNo == this.outTradeNo) {
								this.OrderInfo = res.data[i]
								break;
							}
						}
					}
					if (this.goodsList.length > 0) {
						for (var i in this.OrderInfo.goodsInOrder) {
							if (this.OrderInfo.goodsInOrder.length > 0) {
								for (var n in this.goodsList) {
									if (this.OrderInfo.goodsInOrder[i].id == this.goodsList[n]._id) {
										if (this.goodsList[n].spec.length > 0) {
											for (var k in this.goodsList[n].spec) {
												if (this.goodsList[n].spec[k].specId == this.OrderInfo.goodsInOrder[i].specId) {
													//this.specLevelname = this.goodsList[n].spec[k].specLevel
													this.goodsList[n].specLevelname = this.goodsList[n].spec[k].specLevel
													if (this.goodsList[n].spec[k].specLevel1.length > 0) {

														for (var l in this.goodsList[n].spec[k].specLevel1) {

															if (this.goodsList[n].spec[k].specLevel1[l].specidLv2 == this.OrderInfo.goodsInOrder[i].specidLv2) {

																//this.speclsName = this.goodsList[n].spec[k].specLevel1[l].specls
																this.goodsList[n].speclsName = this.goodsList[n].spec[k].specLevel1[l].specls
																//this.myprice = this.goodsList[n].spec[k].specLevel1[l].price
																this.goodsList[n].price = this.goodsList[n].spec[k].specLevel1[l].price
															}
														}
													} else {
														this.goodsList[n].price = this.goodsList[n].spec[k].price
													}
												}
											}
										} else {
											//this.myprice = this.goodsList[n].price
											///this.goodsList[n].specLevelname =''
										}

									}
								}
							}
						}
						this.goodsListSi = this.goodsList
					}

				}).catch((err) => {
					//console.log(err);
					uni.hideLoading()
					uni.showModal({
						content: err.message || '获取订单信息失败',
						showCancel: false
					})

				})
			},
			// #ifdef H5
			pay() {
				const providerList = ['wxpay', 'alipay']
				let selectedProvider = ''
				//let name = 'pay'
				let data = {}
				new Promise((resolve, reject) => {
					uni.showActionSheet({
						itemList: providerList,
						success(res) {
							resolve(providerList[res.tapIndex])
						},
						fail() {
							reject(new Error('取消支付'))
						}
					})
				}).then((provider) => {
					selectedProvider = provider
					data.provider = provider
					data.outTradeNo = this.outTradeNo
					return this.$api.referPay(data)
				}).then((res) => {
					this.codeUrl = res.orderInfo.codeUrl
					setTimeout(() => {
						this.couponQrCode()
					}, 50)
					this.iSshow = true

				}).catch((err) => {
					uni.showModal({
						content: err.message || '获取支付二维码失败',
						showCancel: false
					})
				})
			},
			couponQrCode() {
				new qrCode('couponQrcode', {
					text: this.codeUrl,
					width: 160,
					height: 160,
					colorDark: "#333333",
					colorLight: "#FFFFFF",
					correctLevel: qrCode.CorrectLevel.H
				})
			},
			qrBoxBtn(){
				this.iSshow = false
			},
			orderQuery() {
				//let name = 'order-query'
				let data = {}
				data.outTradeNo = this.outTradeNo
				this.$api.orderQuery(data).then((res) => {
					if (res.orderPaid) {
						this.status = 2
						uni.showModal({
							content: '订单已支付',
							showCancel: false
						})
						uni.navigateTo({
							url: '/pages/OrderList/OrderList'
						});
					} else {
						uni.showModal({
							content: '订单未支付',
							showCancel: false
						})
					}
				}).catch((e) => {
					uni.showModal({
						content: '查询订单状态失败，请稍后再试',
						showCancel: false
					})
				})
			},
			// #endif
			// #ifndef H5
			pay() {
				let selectedProvider = ''
				new Promise((resolve, reject) => {
					uni.getProvider({
						service: 'payment',
						success(res) {
							resolve(res.provider)
						},
						fail() {
							reject(new Error('获取支付方式失败'))
						}
					})
				}).then((providerList) => {
					return new Promise((resolve, reject) => {
						uni.showActionSheet({
							itemList: providerList,
							success(res) {
								resolve(providerList[res.tapIndex])
							},
							fail() {
								reject(new Error('取消支付'))
							}
						})
					})

				}).then((provider) => {
					//let name = 'pay'
					let data = {}
					selectedProvider = provider
					data.provider = provider
					data.outTradeNo = this.outTradeNo
					return this.$api.referPay(data)
				}).then((res) => {
					console.log(res);
					if (res.orderInfo) {
						return new Promise((resolve, reject) => {
							uni.requestPayment({
								// #ifdef APP-PLUS
								provider: selectedProvider,
								// #endif
								// #ifdef MP-WEIXIN
								...res.orderInfo,
								// #endif
								// #ifdef APP-PLUS || MP-ALIPAY
								orderInfo: res.orderInfo,
								// #endif
								complete() {
									resolve(res.outTradeNo)
								}
							})
						})
					} else {
						throw new Error(res.msg)
					}
				}).then((outTradeNo) => {
					let data = {}
					//let name = 'order-query'
					data.outTradeNo = outTradeNo
					return this.$api.referPay(data)
				}).then((res) => {
					if (res.orderPaid) {
						this.status = 2
						uni.showModal({
							content: '订单已支付',
							showCancel: false
						})
					} else {
						uni.showModal({
							content: '订单未支付',
							showCancel: false
						})
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '支付失败',
						showCancel: false
					})
				})

			}

			// #endif
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.black {
		.container {
			background-color: #000000;
			position: fixed;
			top: 0;
			opacity: 0.6;
			width: 100%;
			height: 100%;
			z-index: 999;
		}

	}

	.container {
		width: 100%;

		.goods-section {
			margin-top: 16rpx;
			background: #fff;
			padding-bottom: 2rpx;
			padding-top: 20rpx;

			.g-item {
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				margin: 20rpx 30rpx;

				.g-item-img {
					-webkit-flex-shrink: 0;
					flex-shrink: 0;
					display: block;
					width: 140rpx;
					height: 140rpx;
					border-radius: 4rpx;

				}

				.right {
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					flex: 1;
					padding-left: 24rpx;
					overflow: hidden;

					.title {
						font-size: 30rpx;
						color: #303133;
					}

					.clamp {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: block;
						box-shadow: 0 0 black;
					}

					.spec {
						font-size: 26rpx;
						color: #909399;
					}

					.price-box {
						display: flex;
						align-items: center;
						font-size: 32rpx;
						color: $font-color-dark;
						padding-top: 10rpx;

						.price {
							margin-bottom: 4rpx;
						}

						.number {
							font-size: 24rpx;
							color: $font-color-base;
							margin-left: 20rpx;
						}
					}
				}
			}
		}

		.yt-list {
			margin-top: 16rpx;
			background: #fff;

			.yt-list-cell {
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				padding: 10rpx 30rpx 10rpx 40rpx;
				line-height: 70rpx;
				position: relative;

				.cell-icon {
					height: 32upx;
					width: 32upx;
					font-size: 22upx;
					color: #fff;
					text-align: center;
					line-height: 32upx;
					background: #f85e52;
					border-radius: 4upx;
					margin-right: 12upx;

					&.hb {
						background: #ffaa0e;
					}

					&.lpk {
						background: #3ab54a;
					}

				}

				.cell-tit {
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					flex: 1;
					font-size: 26rpx;
					color: #909399;
					margin-right: 10rpx;
				}

				.desc {
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					flex: 1;
					font-size: 28rpx;
					color: #303133;
				}

				.clamp {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
				}

				.cell-tip {
					font-size: 26rpx;
					color: #303133;
				}

				.active {
					color: #fa436a;
				}
			}

			.desc-cell .cell-tit {
				max-width: 45px;
			}
		}

		.u-button-box {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 150rpx;

			.u-button-box1 {
				width: 90%;
				height: 100%;
				margin: auto;
			}
		}

		.qr-box {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.1803921568627451);
			z-index: 999;

			.qr-box-c {
				width: 100%;
				height: 100%;

				.qr-box-d {
					width: 180px;
					height: 210px;
					background-color: #fff;
					margin: auto;
					margin-top: 20%;
					border-radius: 5px;

					.qr-box-h {
						position: relative;
						width: 160px;
						height: 160px;
						margin: auto;
						top: 10px
					}

					.qr-box-t {
						width: 100%;
						height: 30px;
						text-align: center;
						line-height: 40px;
						margin-top: 10px;
					}
				}
			}
		}
	}
</style>
