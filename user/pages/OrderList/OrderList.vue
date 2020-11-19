<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store"><span>订单号：</span> <span>{{ res.outTradeNo }}</span></view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right" v-if="res.status==1">待付款</view>
									<view class="right" v-if="res.status==2">待发货</view>
									<view class="right" v-if="res.status==3">待收货</view>
									<view class="right" v-if="res.status==4">待评价</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsInOrder" :key="index">
									<view class="left">
										<image :src="item.imgUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.goodsName }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.amount }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsInOrder) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsInOrder)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsInOrder)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看物流</view>
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<view class="evaluate btn">去支付</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
					<scroll-view scroll-y style="height: 100%;width: 100%;" v-if="orderList[0].length<1">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" v-if="orderList[1].length>0">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store"><span>订单号：</span> <span>{{ res.outTradeNo }}</span></view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsInOrder" :key="index">
									<view class="left">
										<image :src="item.imgUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.goodsName }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.amount }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsInOrder) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsInOrder)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsInOrder)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">提醒发货</view>
									<!-- <view class="evaluate btn">发货</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
					<scroll-view scroll-y style="height: 100%;width: 100%;" v-if="orderList[1].length<1">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" v-if="orderList[2].length>0">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[2]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store"><span>订单号：</span> <span>{{ res.outTradeNo }}</span></view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsInOrder" :key="index">
									<view class="left">
										<image :src="item.imgUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.goodsName }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.amount }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsInOrder) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsInOrder)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsInOrder)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">确认收货</view>
									<!-- <view class="evaluate btn">发货</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
					<scroll-view scroll-y style="height: 100%;width: 100%;" v-if="orderList[2].length<1">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" v-if="orderList[3].length>0">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orderList[3]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="order" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store"><span>订单号：</span> <span>{{ res.outTradeNo }}</span></view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsInOrder" :key="index">
									<view class="left">
										<image :src="item.imgUrl" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.goodsName }}</view>
										<!-- <view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.amount }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsInOrder) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsInOrder)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsInOrder)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
					<scroll-view scroll-y style="height: 100%;width: 100%;" v-if="orderList[3].length<1">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	let arry = [];
	export default {
		data() {
			return {
				orderList: [
					[],
					[],
					[],
					[]
				],
				dataList: [],
				list: [{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				goodsList: [],
				OrderInfo: 0
			};
		},
		onShow() {
			this.getgoodsList();
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
			//获取订单详情
			getgoodsList() {
				//var name = 'goodsList'
				const data = {};
				// uni.showLoading({
				// 	title: '处理中...'
				// })
				this.$api.getOrderDetail(data).then((res) => {
					
					uni.hideLoading()
					console.log(res)
					if (res.goodsList.length > 0) {
						arry = res.goodsList
						this.getOrderInfo()
					}
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			getOrderInfo() {
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.getOrderInfo().then((res) => {
					uni.hideLoading()
					let goodsList = [];
					let arrylV2 = []
					let spec = []
					goodsList = res.data
					if (goodsList.length > 0) {
						for (var i = 0; i < arry.length; i++) {
							for (var j = 0; j < goodsList.length; j++) {
								arrylV2 = goodsList[j].goodsInOrder
								if (arrylV2.length > 0) {
									for (var n = 0; n < arrylV2.length; n++) {

										if (arrylV2[n].id == arry[i]._id) {
											arrylV2[n].imgUrl = arry[i].imgUrl
											arrylV2[n].goodsName = arry[i].goodsName

											spec = arry[i].spec
											if (spec.length > 0) {
												for (var k = 0; k < spec.length; k++) {
													if (spec[k].specId == arrylV2[n].specId) {
														arrylV2[n].specLevel = spec[k].specLevel
														arrylV2[n].price = spec[k].price
														if (spec[k].specLevel1.length > 0) {
															for (var s = 0; s < spec[k].specLevel1.length; s++) {
																if (arrylV2[n].specidLv2 == spec[k].specLevel1[s].specidLv2) {
																	arrylV2[n].specls = spec[k].specLevel1[s].specls
																	arrylV2[n].price = spec[k].specLevel1[s].price
																}
															}
														} else {
															arrylV2[n].specls = ''
															arrylV2[n].price = spec[k].price
														}
													}

												}
											} else {
												arrylV2[n].specls = ''
												arrylV2[n].specLevel = ''
												arrylV2[n].price = arry[i].price
											}
										}
									}
								}

							}
						}
						// console.log(goodsList)
						this.dataList = goodsList
						this.getOrderList(0);
							console.log(goodsList)
					}


				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			//
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getOrderList(idx) {
				var data = {}
				this.orderList[0] = [];
				this.orderList[1] = [];
				this.orderList[2] = [];
				this.orderList[3] = [];
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].status == 1) { //待付款
						data = this.dataList[i]
						this.orderList[0].push(data);
					}
					if (this.dataList[i].status == 2) { //待发货
						data = this.dataList[i]
						this.orderList[1].push(data);
						console.log(data)
					}
					if (this.dataList[i].status == 4) { //待评价
						data = this.dataList[i]
						this.orderList[3].push(data);
					}
					if (this.dataList[i].status == 3) { //待收货
						data = this.dataList[i]
						this.orderList[2].push(data);
					}
				}

				this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price * val.amount);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.amount;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 28rpx;
					// font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
