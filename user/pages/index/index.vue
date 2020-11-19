<template>
	<view class="container">
		<view class="container-box">
			<view class="container-home">
				<!-- 头部搜索栏样式 -->
				<view class="home-header">
					<view class="home-header-cont">
						<image class="img-iocn" src="../../static/img/qunbu.png" mode=""></image>
						<span>所有</span>
					</view>
					<view class="search-box" @click="searchBtn()">
						<span>搜索</span>
						<view class="icon-box">
							<!-- <image class="icon-img" src="../../static/img/shousuo.png" mode=""></image> -->
							<u-icon name="search" size="40" color="#909399"></u-icon>
						</view>
					</view>
				</view>
				<view class="hot-search">
					<view style="width: 50px;flex-shrink: 0;">热搜</view>
					<view class="hot-search-cont">
						<view class="search-hot-tag">
							<view>手机</view>
						</view>
						<view class="search-hot-tag">
							<view>美食</view>
						</view>
						<view class="search-hot-tag">
							<view>鞋</view>
						</view>
					</view>
				</view>
				<view class="banner-bg">
					<view class="banner-primary-bg banner-route-left"></view>
					<view class="banner-primary-bg banner-route-right"></view>
					<view class="banner-bg-box">
						<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="banner-bg-swiper"
						 :circular="true" indicator-color="rgba(255, 255, 255, 0.8)" indicator-active-color="#fff">
							<swiper-item v-for="itme in banner">
								<image class="banner-bg-image" :src="itme.imgUrl" />
							</swiper-item>
							<!-- <swiper-item>
								<image class="banner-bg--image" src="https://api.ruhuashop.com//uploads/other/5df31035de0c5.png" />
							</swiper-item> -->
						</swiper>
					</view>
				</view>
				<view class="home-product-category">
					<swiper :indicator-dots="true" :interval="5000" :duration="150" class="home-banner-swiper" style='height:160px'
					 :circular="true" indicator-color="#ccc" indicator-active-color="rgba(251,88,106, 0.8)">
						<swiper-item>
							<view style="display: flex;flex-wrap: wrap;">
								<view class="home-category-item" v-for="itme in navList">
									<img :src="itme.imgUrl" class="home-category-img"></img>
									<view class="home-category-name">{{itme.navName}}</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item>
							<view style="display: flex;flex-wrap: wrap;">
								<view class="home-category-item" v-for="itme in navList1">
									<img :src="itme.imgUrl" class="home-category-img" mode="scaleToFill"></img>
									<view class="home-category-name">{{itme.navName}}</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="home-product-box">
					<view class="home-group-name">
						<text>热门推荐</text>
					</view>
					<view class="home-new-box">
						<view class="home-new-item" v-for="itme in hotList" @click="hotListBtn(itme)">
							<view class="home-title-box">
								<view class="home-new-title">{{itme.goodsName}}</view>
								<view class="home-new-price">
									<text class="home-new-present"><span>￥</span>{{itme.price}}</text>
								</view>
							</view>
							<img :src="itme.imgUrl" class="home-new-img2" />
						</view>
					</view>
				</view>
				<view class="home-product-box" style="background-color:#f8f8f8;">
					<view class="home-group-name">
						<text>新品推荐</text>
					</view>
				</view>
				<view class="hot-goods">
					<view class="hot-goods-cont" @click="goodsBtn(itme)" v-for="itme in goodsList">
						<view class="goods-list-img">
							<image class="icon-img" :src="itme.imgUrl" mode=""></image>
						</view>
						<view class="goods-name">
							<span style="margin-left:20rpx;">{{itme.goodsName}}</span>
						</view>
						<view class="goods-price">
							<span style="margin-left:20rpx;">￥</span><span style="font-size: 18px;">{{itme.price}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<Tabbar></Tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				navList: [],
				navList1: [],
				hotList: [],
				goodsList: [],
				type: 'reLaunch',
				// jumpUrl: '/pages/goodsDetail/goodsDetai'
			}
		},
		onLoad() {
			this.getbanner();
			this.getnavList();
			this.getgoodsList();
			// this.gethotList();
		},
		onShow() {
			//this.getShopCat()
			try {
				const value = uni.getStorageSync('shopingCat_key');
				if (value) {
					if (value.length > 0) {
						this.$store.state.vuex_tabbar[2].count = value.length
					} else {
						this.$store.state.vuex_tabbar[2].count = 0
					}
				} else {
					//alert(1123)
					this.$store.state.vuex_tabbar[2].count = 0
				}
			} catch (e) {
				// error
				this.$store.state.vuex_tabbar[2].count = 0
				console.log(e);
			}
		},
		methods: {
			searchBtn() {

			},
			goodsBtn(e) {
				this.$u.route({
					url: '/pages/goodsDetail/goodsDetail',
					params: {
						goodsId: e.goodsId
					}
				})
			},
			hotListBtn(e) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?goodsId=' + e.goodsId
				});
			},
			getbanner() {
				//var name = 'banner'
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callFun().then((res) => {
					uni.hideLoading()
					this.banner = res.data
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			//导航栏列表请求数据
			getnavList() {
				//var name = 'sortNav'
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callNav().then((res) => {
					uni.hideLoading()
					this.navList = res.data.slice(0, 8)
					this.navList1 = res.data.slice(8, 16)
					//console.log(this.navList)
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})

			},
			getgoodsList() {
				//var name = 'goodsList'
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callgoodsList().then((res) => {
					uni.hideLoading()
					//console.log(res)
					this.hotList = res.data.slice(0, 4)
					this.goodsList = res.data
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			}
		}
	};
</script>

<style lang="scss">
	.container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $uni-bg-color-grey;

		.container-box {
			width: 100%;
			height: 100%;
			position: relative;

			.container-home {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 4rpx;
				overflow: auto;

				//首页头样式
				.home-header {
					position: relative;
					width: 100%;
					height: 90rpx;
					background-color: $uni-her-color;
					padding-top: 10rpx;

					.search-box {
						width: 80%;
						height: 70rpx;
						background-color: #fff;
						margin: auto;
						border-radius: 30px;
						// margin-top: 20rpx;
						border-radius: 20px;
						font-size: 15px;
						line-height: 70rpx;
						padding-left: 50px;
						color: rgb(144, 147, 153);

						.icon-box {
							position: absolute;
							width: 40rpx;
							height: 40rpx;
							top: 15rpx;
							left: 100rpx;
							/* background: red; */
						}

						.icon-img {
							width: 100%;
							height: 100%;
						}
					}

					.home-header-cont {
						position: absolute;
						top: 0;
						left: 10rpx;
						width: 60rpx;
						height: 90rpx;

						.img-iocn {
							position: absolute;
							top: 15rpx;
							left: 10rpx;
							width: 60%;
							height: 40%;
						}

						span {
							float: left;
							text-align: center;
							// line-height: 130rpx;
							transform: scale(0.7);
							color: #fff;
							margin-top: 45rpx;
						}
					}
				}

				.hot-search {
					width: 100%;
					height: 50rpx;
					border-bottom: 10rpx solid $uni-her-color;
					background-color: $uni-her-color;
					padding-left: 20rpx;
					padding-right: 20rpx;
					display: flex;
					color: #fff;

					.hot-search-cont {
						width: 80%;
						height: 100%;
						margin: auto;
						display: flex;

						.search-hot-tag {
							background: rgba(255, 255, 255, 0.15);
							padding: 10rpx 24rpx;
							border-radius: 30rpx;
							display: flex;
							white-space: nowrap;
							align-items: center;
							margin-right: 15px;
							justify-content: center;
							line-height: 24rpx;
							/* margin-left: 20rpx; */
						}
					}
				}

				.banner-bg {
					width: 100%;
					height: 180rpx;
					background-color: $uni-her-color;
					position: relative;

					.banner-primary-bg {
						width: 50%;
						display: inline-block;
						height: 224rpx;
						border: 1px solid transparent;
						position: relative;
						z-index: 1;
						background: #FB586A;
						top: 4rpx;
					}

					.banner-route-left {
						transform: skewY(8deg);
					}

					.banner-route-right {
						transform: skewY(-8deg);
					}

					.banner-bg-box {
						width: 100%;
						padding: 0 20rpx;
						box-sizing: border-box;
						position: absolute;
						/* overflow: hidden; */
						z-index: 99;
						bottom: -80rpx;
						left: 0;

						// background-color:#007AFF;
						.banner-bg-swiper {
							width: 100%;
							height: 240rpx;
							border-radius: 12rpx;
							overflow: hidden;
							transform: translateY(0);
						}

						.banner-bg-image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}

				.home-product-category {
					background: #fff;
					padding: 45px 20rpx 0rpx 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					font-size: 24rpx;
					color: #555;
					margin-bottom: 20rpx;

					.home-banner-swiper {
						width: 100%;
						height: 120px;
						border-radius: 6px;
						overflow: hidden;
						-webkit-transform: translateY(0);
						transform: translateY(0);
					}

					.home-category-item {
						width: 25%;
						height: 120rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex-direction: column;
						margin: 0px 0 0px;
						margin: 10px 0 0;

						.home-category-img {
							height: 80rpx;
							width: 80rpx;

						}

						.home-category-name {
							line-height: 20px;
							text-align: center;
							color: #555;
						}
					}
				}

				.home-product-box {
					margin-top: 20rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					background: #fff;
					padding-bottom: 20rpx;

					.home-group-name {
						font-size: 16px;
						font-weight: bold;
						text-align: center;
						padding: 12px 0;
					}

					.home-new-box {
						display: -webkit-box;
						display: -webkit-flex;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						align-items: center;
						-webkit-box-pack: justify;
						-webkit-justify-content: space-between;
						justify-content: space-between;
						-webkit-flex-wrap: wrap;
						flex-wrap: wrap;

						.home-new-item {
							width: 49%;
							height: 100px;
							padding: 0px 7px 0;
							box-sizing: border-box;
							display: -webkit-box;
							display: -webkit-flex;
							display: flex;
							-webkit-box-pack: justify;
							-webkit-justify-content: space-between;
							justify-content: space-between;
							-webkit-box-align: center;
							-webkit-align-items: center;
							align-items: center;
							background: #f5f2f9;
							position: relative;
							border-radius: 6px;
							margin-bottom: 20rpx;

							.home-title-box {
								width: 55%;
								font-size: 12px;

								.home-new-title {
									line-height: 16px;
									word-break: break-all;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
								}

								.home-new-price {
									padding-top: 18rpx;
								}

								.home-new-present {
									color: #ff201f;
									font-weight: bold;
								}
							}

							.home-new-img2 {
								width: 62px;
								height: 62px;
								display: block;
								-webkit-flex-shrink: 0;
								flex-shrink: 0;
								border-radius: 5px;
								margin-left: 2px;
							}
						}
					}
				}

				.hot-goods {
					width: 100%;
					// display: flex;
					// align-items: center;
					// justify-content: space-between;

					.hot-goods-cont {
						width: 350rpx;
						height: 490rpx;
						background-color: #fff;
						border-radius: 5px 5px 5px 5px;
						overflow: hidden;
						float: left;
						margin-left: 18rpx;
						margin-top: 20rpx;

						.goods-list-img {
							width: 350rpx;
							height: 350rpx;

							.icon-img {
								width: 100%;
								height: 100%;
							}
						}

						.goods-name {
							width: 100%;
							height: 60rpx;
							line-height: 70rpx;
							font-size: 15px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.goods-price {
							width: 100%;
							height: 75rpx;
							line-height: 75rpx;
							font-size: 15px;
							color: #de6969;
						}
					}
				}
			}
		}
	}
</style>
