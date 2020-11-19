<template>
	<view class="container">
		<!--header-->
		<view class="container-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="container-header" :style="{paddingTop:top+'px', opacity:opcity}">
				商品详情
			</view>
			<view class="containerheader-icon" :style="{marginTop:top+'px'}">
				<view class="container-icon container-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back">
					<u-icon name="arrow-left" size="35" :style="{color:opcity>=1?'#000':'#fff',marginTop:'7px',marginLeft:'5px'}"></u-icon>
				</view>
			</view>
		</view>
		<!--header-->
		<!--banner-->
		<view class="container-banner-swiper">
			<swiper :autoplay="is_auto" :interval="5000" :duration="150" :circular="true" :style="{height:scrollH + 'px'}"
			 @change="bannerChange">
				<swiper-item v-if="list.video">
					<video :style="{height:scrollH+'px'}" style="width: 100%;" id="myVideo" :src="getimg+list.video.url" @error="videoErrorCallback"
					 show-fullscreen-btn controls objectFit="fill" :poster="getimg+list.banner_imgs_url[0]"></video>

				</swiper-item>
				<block v-for="(item,index) in banner_imgs_url" :key="index">
					<swiper-item :data-index="index">
						<img :src="item.imgUrl" class="tui-slide-image" :style="{height:scrollH+'px'}" />
						{{item.imgUrl}}
					</swiper-item>
					
				</block>
			</swiper>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-tag :text="text" type="info" shape="circleLeft" :closeable="closeable" mode="dark" :show="show" size="default" />
			</view>

			<!-- <view class="xszk" v-if="label_name && zk_status=='start'">{{label_name}}</view> -->
		</view>
		<!--banner-->
		<!-- 商品简介 -->
		<view class="container-pro-detail">
			<view class="container-product-title container-border-radius">
				<view class="detail">
					<view>
						<view class="container-pro-pricebox container-padding red">
							<view class="container-pro-price">
								<view>￥<text class="container-price">{{DetailC.price}}</text></view>
								<!-- <view class="tag">新品</view> -->
							</view>
						</view>
						<!-- <view class="tui-original-price tui-gray">
								价格
								<text class="tui-line-through">￥123</text>
							</view> -->
					</view>
				</view>
				<view class="container-pro-titbox">
					<view class="container-pro-title">{{DetailC.goodsName}}</view>
					<view class="u-demo-area">
						<u-toast ref="uToast"></u-toast>
						<u-tag :text="text1" type="info" shape="circleLeft" :closeable="closeable" mode="dark" :show="show" size="default" />
					</view>
				</view>
			</view>
			<view class="container-basic-info container-mtop container-radius-all">
				<view class="container-list-cell container-last container-between">
					<view class="container-bold container-cell-title">评论</view>
					<view @click="cmtAllBtn">
						<text class="container-cmt-all">查看全部</text>
					</view>
				</view>
			</view>
			<view class="pro-content">
				<view class="pro-nomore-box">
					<view-nomore text="详情介绍" :visible="true" bgcolor="#f7f7f7"></view-nomore>
				</view>
				<view class="pro-product-img">
					<p>
						<img style="max-width: 100%; height: auto" :src="proImg">
					</p>
					<!-- <p>
						<img style="max-width: 100%; height: auto" src="https://api.ruhuashop.com//ue_upload/img/20191212/1576135226948393.jpg">
					</p> -->
				</view>
			</view>
		</view>
		<view-spec ref="mychild" :DetailC="DetailC"></view-spec>
		<view class="navigationBox">
			<view class="navigation">
				<view class="left">
					<view class="item" @click="homeBot()">
						<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">首页</view>
					</view>
					<view class="item">
						<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">客服</view>
					</view>
					<view class="item car" style="margin: 0 10px;" @click="shopCatBtn()">
						<u-badge class="car-num" :count="count" type="error" :offset="[-3, -6]"></u-badge>
						<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">购物车</view>
					</view>
				</view>
				<view class="right">
					<view class="cart btn u-line-1" @tap="clickParent(2)">加入购物车</view>
					<view class="buy btn u-line-1" @click="clickParent(1)">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import viewNomore from "@/components/nomore/nomore"
	export default {
		data() {
			return {
				height: 64,
				top: 0,
				opcity: 0,
				iconOpcity: 0.5,
				scrollH: 0,
				is_auto: '',
				list: {},
				bannerIndex: 0,
				label_name: '',
				text: '',
				closeable: false,
				show: true,
				text1: '分享',
				content: '',
				DetailC: {},
				goodsId: 0,
				banner_imgs_url: [],
				proImg: '',
				goodsList: [],
				count:0
			};
		},
		components: {
			viewNomore
		},
		onLoad(option) {
			this.count=this.$store.state.vuex_tabbar[2].count
			if (option.goodsId) {
				this.goodsId = option.goodsId
			}
			let obj = {};
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth //APP不支持css的vw，所以用这种
				}
			})
			this.text = this.bannerIndex + 1 + '/' + this.banner_length
			this.goodsDetail();
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			shopCatBtn(){
				uni.switchTab({
					url: '/pages/shoppingCart/shoppingCart'
				});
			},
			homeBot() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			clickParent(e) {;
				this.$refs.mychild.parentHandleclick(e);
			},
			cmtAllBtn() {
				uni.navigateTo({
					url: '/pages/comment/comment'
				});
			},
			cartBtn(){
				
			},
			goodsDetail() {
				var name = 'goodsDetail'
				uni.showLoading({
					title: '处理中...'
				})
				this.$api.callgoodsList().then((res) => {
					uni.hideLoading()
					for (var i in res.data) {
						// this.goodsList = res.result.data
						if (res.data[i].goodsId == this.goodsId) {
							this.DetailC = res.data[i]
							break;
						}
					}
					var obj = {}

					obj.imgUrl = this.DetailC.imgUrl;
					this.proImg = this.DetailC.imgUrl
					this.banner_imgs_url=this.DetailC.bannerUrl


				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current
			},
		},
		computed: {
			//轮播与视频个数
			banner_length() {
				if (this.banner_imgs_url.length>0) {
					const a = this.banner_imgs_url.length
					const b = this.list.video ? 1 : 0
					return a + b
				}
				return 1;
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $uni-bg-color-grey;

		.container-header-box {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9998;

			.container-header {
				width: 100%;
				font-size: 18px;
				line-height: 18px;
				font-weight: 500;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #000000;
			}

			.containerheader-icon {
				position: fixed;
				top: 0;
				left: 10px;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				height: 32px;
				transform: translateZ(0);
				z-index: 99999;

				.container-icon {
					border-radius: 16px;
				}


				.container-icon-back {
					height: 32px !important;
					width: 32px !important;
					display: block !important;
				}
			}
		}

		.container-banner-swiper {
			position: relative;

			.container-banner-swiper .container-tag-class {
				position: absolute;
				opacity: 0.5;
				color: #fff;
				bottom: 10upx;
				right: 0;
			}

			.tui-slide-image {
				width: 100%;
			}

			.u-demo-area {
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}

		.container-pro-detail {
			box-sizing: border-box;
			color: #333;
			margin-bottom: 120rpx;

			.container-product-title {
				padding: 30upx 0;
			}

			.container-border-radius {
				border-bottom-left-radius: 24upx;
				border-bottom-right-radius: 24upx;
				overflow: hidden;
				background: #fff;

				.container-pro-pricebox {
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					align-items: center;
					-webkit-box-pack: justify;
					-webkit-justify-content: space-between;
					justify-content: space-between;
					color: #ff201f;
					font-size: 36rpx;
					font-weight: bold;
					line-height: 44rpx;

				}

				.container-padding {
					padding: 0 15px;
					box-sizing: border-box;
				}

				.container-pro-price {
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					align-items: center;
				}

				.container-pro-titbox {
					font-size: 32rpx;
					font-weight: 500;
					position: relative;
					padding: 10rpx 150rpx 0 30rpx;
					box-sizing: border-box;
					background: #fff;

					.container-pro-title {
						padding: 4rpx 0px 0 0;
						line-height: 40rpx;
						margin-bottom: 20rpx;
						overflow: hidden;
					}

					.u-demo-area {
						position: absolute;
						right: 0;
						bottom: 50rpx;
					}
				}
			}

			.container-basic-info {
				background: #fff;

				.container-between {
					justify-content: space-between !important;
				}

				.container-list-cell {
					position: relative;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					align-items: center;
					font-size: 26rpx;
					line-height: 26rpx;
					padding: 36rpx 30rpx;
					box-sizing: border-box;

					.container-cell-title {
						width: 33px;
						padding-right: 15px;
						-webkit-flex-shrink: 0;
						flex-shrink: 0;
						// font-weight: bold;
						font-size: 30rpx;
					}
				}
			}

			.container-mtop {
				margin-top: 26upx;
			}

			.container-radius-all {
				border-radius: 24upx;
				overflow: hidden;
			}

			.pro-content {
				margin-top: 30rpx;
				background: #fff;
				padding: 0 2% 40rpx;

				.pro-nomore-box {
					padding-top: 10rpx;
				}

				.pro-product-img {
					transform: translateZ(0);
					height: auto;
				}

				.pro-product-img img {
					width: 100%;
					display: block;
				}
			}
		}

		.navigationBox {
			position: fixed;
			/* top: 0; */
			left: 0;
			right: 0;
			bottom: 0;

			.navigation {
				width: 100%;
				display: flex;
				margin-top: 100rpx;
				border: solid 2rpx #f2f2f2;
				background-color: #ffffff;
				padding: 16rpx 0;

				.left {
					display: flex;
					font-size: 20rpx;

					.item {
						margin: 0 30rpx;

						&.car {
							text-align: center;
							position: relative;

							.car-num {
								position: absolute;
								top: -10rpx;
								right: -10rpx;
							}
						}
					}
				}

				.right {
					display: flex;
					font-size: 28rpx;
					align-items: center;

					.btn {
						line-height: 66rpx;
						padding: 0 30rpx;
						border-radius: 36rpx;
						color: #ffffff;
					}

					.cart {
						background-color: #ed3f14;
						margin-right: 30rpx;
					}

					.buy {
						background-color: #ff7900;
					}
				}
			}
		}

	}
</style>
