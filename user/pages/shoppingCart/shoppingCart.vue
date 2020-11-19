<template>
	<view class="container">
		<view class="page-box">
			<view class="goods-section">
				<view class="g-item" v-for="(itme,index) in goodsListSi">
					<image :src="itme.imgUrl" mode="" class="g-item-img"></image>
					<view class="right">
						<text class="title clamp">
							{{itme.goodsName}}
						</text>
						<text class="spec">

						</text>
						<view class="price-box">
							<text class="price">￥{{itme.price}}</text>
							<!-- <text class="number">x 1</text> -->
							<text class="number" v-if="itme.specLevelname!=''">{{itme.specLevel}}</text>
							<text class="number" v-if="itme.speclsName!=''">{{itme.specls}}</text>
						</view>
						<view class="price-numer" v-if="itme.amount>0">
							<!-- <u-number-box @change="valChange(1)" v-model="value1" ></u-number-box> -->
							<u-number-box v-model="itme.amount" @change="valChange" bg-color="#ff6d00" color="#fff" :index='index' :min='value'></u-number-box>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2" v-if="this.goodsListSi.length>30"></u-loadmore>
		</view>
		<view class="action-section">
			<view class="checkbox">
				<view class="clear-btn" v-if="goodsListSi" @click="clearCart">
					清空
				</view>
			</view>
			<view class="total-box">
				<text class="price">¥{{allPrices}}</text>
			</view>
			<button type="primary" class="no-border confirm-btn" @click="payBtn">去结算</button>
		</view>
		<Tabbar></Tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				goodsListSi: [],
				allPrices: 0,
				value: 1,
				Datatime: ''
			};
		},
		onShow() {
			this.goodsListSi = [];
			try {
				const value = uni.getStorageSync('shopingCat_key');
				if (value) {
					this.goodsListSi = value
					this.allPrices = 0
					if (this.goodsListSi.length > 0) {

						for (var i = 0; i < this.goodsListSi.length; i++) {
							if (this.goodsListSi[i].specidLv2) {
								this.goodsListSi[i].specidLv2 = this.goodsListSi[i].specidLv2
							} else {
								this.goodsListSi[i].specidLv2 = ''
							}
							this.allPrices = this.allPrices + this.goodsListSi[i].price * this.goodsListSi[i].amount
						}
						if (this.goodsListSi.length > 0) {
							this.$store.state.vuex_tabbar[2].count = this.goodsListSi.length
						} else {
							this.$store.state.vuex_tabbar[2].count = 0
							this.allPrices = 0
						}
					}
				} else {
					//alert(1123)
					this.$store.state.vuex_tabbar[2].count = 0
					this.allPrices = 0
				}
			} catch (e) {
				// error
				this.$store.state.vuex_tabbar[2].count = 0
				this.allPrices = 0
				console.log(e);
			}

			//this.getShopCat()
			// console.log(this.$store.state.vuex_tabbar[2].count = this.goodsListSi.length)
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			getShopCat() {

				// uni.showLoading({
				// 	title: '处理中...'
				// })
				// this.$api.getShopCat().then((res) => {
				// 	uni.hideLoading()
				// 	if (res.data) {
				// 		if (res.data.length > 0) {
				// 			this.goodsListSi = res.data
				// 			for (var i = 0; i < this.goodsListSi.length; i++) {
				// 				this.allPrices = this.allPrices + this.goodsListSi[i].price * this.goodsListSi[i].amount
				// 			}
				// 			if (res.data.length > 0) {
				// 				this.$store.state.vuex_tabbar[2].count = res.data.length
				// 			}else{
				// 				this.$store.state.vuex_tabbar[2].count = 0
				// 			}
				// 		}
				// 	}
				// }).catch((err) => {
				// 	//console.log(err);
				// 	uni.hideLoading()
				// 	uni.showModal({
				// 		content: err.message || '获取订单信息失败',
				// 		showCancel: false
				// 	})

				// })
			},
			valChange(e) {
				this.goodsListSi[e.index].amount = e.value
				this.allPrices = 0
				for (var i = 0; i < this.goodsListSi.length; i++) {
					if (this.goodsListSi[i].specidLv2) {
						this.goodsListSi[i].specidLv2 = this.goodsListSi[i].specidLv2
					} else {
						this.goodsListSi[i].specidLv2 = ''
					}
					this.allPrices = this.allPrices + this.goodsListSi[i].price * this.goodsListSi[i].amount
				}
			},
			payBtn() {
				this.order()
			},
			order() {

				this.getOrderTime()
				this.$api.get_order_lot({
					//name: 'order',
					data: {
						goodsInOrder: this.goodsListSi.map((itme) => {
							return {
								id: itme._id,
								// 本示例为每种商品购买一件，方便演示
								specId: itme.specId,
								price: itme.price,
								amount: itme.amount,
								specidLv2: itme.specidLv2,
								createTime: this.Datatime
							}
							console.log(itme.price)
						})
					}
				}).then((res) => {
					if (res.outTradeNo) {
						try {
							uni.removeStorageSync('shopingCat_key');
						} catch (e) {
							// error
						}
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
			clearCart() {
				try {
					uni.removeStorageSync('shopingCat_key');
				} catch (e) {
					// error
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;

		.page-box {
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
					height: 160rpx;
					border-bottom: 1px solid #d9d9d9;

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

						.price-numer {
							float: right;
						}
					}
				}
			}
		}

		.action-section {
			/* #ifdef H5 */
			margin-bottom: 100upx;
			/* #endif */
			position: fixed;
			left: 30upx;
			bottom: 30upx;
			z-index: 95;
			display: flex;
			align-items: center;
			width: 690upx;
			height: 100upx;
			padding: 0 30upx;
			background: rgba(255, 255, 255, .9);
			box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
			border-radius: 16upx;

			.checkbox {
				height: 52upx;
				position: relative;

				image {
					width: 52upx;
					height: 100%;
					position: relative;
					z-index: 5;
				}
			}

			.clear-btn {
				position: absolute;
				left: 26upx;
				top: 0;
				z-index: 4;
				width: 110upx;
				height: 52upx;
				line-height: 52upx;
				padding-left: 20upx;
				font-size: $font-base;
				color: #fff;
				background: $font-color-disabled;
				border-radius: 0 50px 50px 0;

			}

			.total-box {
				flex: 1;
				display: flex;
				flex-direction: column;
				text-align: right;
				padding-right: 40upx;

				.price {
					font-size: $font-lg;
					color: $font-color-dark;
				}

				.coupon {
					font-size: $font-sm;
					color: $font-color-light;

					text {
						color: $font-color-dark;
					}
				}
			}

			.confirm-btn {
				padding: 0 38upx;
				margin: 0;
				border-radius: 100px;
				height: 76upx;
				line-height: 76upx;
				font-size: $font-base + 2upx;
				background: $uni-color-primary;
				box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
			}
		}
	}
</style>
