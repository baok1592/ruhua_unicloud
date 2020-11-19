<template>
	<view class="wrap">
		<view class="u-demo-area">
			<u-toast :type="typeG" ref="uToast"></u-toast>
			<!-- <text class="no-mode-here">见弹出toast</text> -->
		</view>
		<!-- #ifdef H5 -->
		<view>
			<view class="top"></view>
			<view class="content">
				<view class="title">欢迎登录</view>
				<input class="u-border-bottom" style="border-bottom:1px solid #f0f1f3;" type="number" v-model="tel" placeholder="请输入手机号" />
				<view class="tips"></view>
				<input class="u-border-bottom" type="number" v-model="pwd" placeholder="请输入密码" />
				<button @click="login" class="getCaptcha">登录</button>
				<view class="alternative">
					<view class="password">忘记密码</view>
					<view class="issue" @click="issueBtn()">注册</view>
				</view>
			</view>
			<view class="buttom">
				<view class="loginType">
					<view class="wechat item">
						<view class="icon">
							<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
						</view>
						微信
					</view>
					<view class="QQ item">
						<view class="icon">
							<u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>
						</view>
						QQ
					</view>
				</view>
				<view class="hint">
					<span>登录代表同意</span>
					<text class="link" 用户协议、隐私政策，</text> <span>并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理</span>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="weixLogin">
			<view class="weixLoginBox">
				<button @click="WXlogin" class="getCaptcha" open-type="getUserInfo" v-if="!hasUserInfo">授权登录</button>
				 <!-- <button v-if="!hasUserInfo" open-type="getUserInfo" @getuserinfo="getuserinfo">授权登录</button> -->
			</view>

		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				pwd: '',
				typeG: '',
				title: '',
				position: 'center',
				icon: true,
				url: '',
				userInfo:{},
				hasUserInfo: false
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			issueBtn() {
				uni.reLaunch({
					url: '/pages/register/register'
				});
			},
			login() {
				//alert(1)
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				var resl = this
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'login',
						params: {
							username: resl.tel,
							password: resl.pwd
						}
					},
					success(res) {
						if (res.result.code == 0) {
							resl.typeG = 'success'
							uni.setStorageSync('uni_id_token', res.result.token)
							uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
							uni.setStorageSync('uid', res.result.uid)
							uni.setStorageSync('userInfo', res.result.userInfo)
							setTimeout(function() {
								uni.hideLoading()
								uni.switchTab({
									url: '/pages/index/index'
								});
							}, 700)
						} else {
							resl.typeG = 'error'
							uni.hideLoading()
						}
						resl.$refs.uToast.show({
							title: res.result.msg,
							position: resl.position,
							type: resl.typeG,
							icon: resl.icon,
							url: resl.url,
						});
					},
					fail(e) {
						uni.hideLoading()
						console.error(e)
						resl.title = '登录失败，请稍后再试'
						resl.$refs.uToast.show({
							title: resl.title,
							position: resl.position,
							type: resl.typeG,
							icon: resl.icon,
							url: resl.url,
						});
					}
				})
			},
			WXlogin() {
				var that = this
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				new Promise((resolve, reject) => {
					uni.getProvider({
						service: 'oauth',
						success(res) {
							resolve(res.provider)
						},
						fail(err) {
							reject(new Error(err.errMsg))
						}
					})
				}).then((provider) => {
					return new Promise((resolve, reject) => {
						uni.login({
							provider,
							success: (res) => {
								console.log(res);
								resolve({
									code: res.code,
									provider
								})
							},
							fail: (err) => {
								reject(new Error(err.errMsg))
							}
						})
					})
				}).then(({
					code,
					provider
				}) => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: provider.indexOf('weixin') > -1 ? 'loginByWeixin' : 'loginByAlipay',
							params: {
								code
							}
						}
					})
				}).then((res) => {
					console.log(res);
					if (res.result.code === 0) {
						uni.hideLoading()
						// 如果使用2.7.15及以上版本建议存为uni_id_token
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.setStorageSync('uid', res.result.uid)
						uni.setStorageSync('openid', res.result.openid)
					
						that.getuserinfo()
						uni.reLaunch({
							url: '/pages/index/index'
						})
					} else {
						throw new Error(res.result.msg)
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: err.message || '登录失败',
						showCancel: false
					})
				})
			},
			/*获取用户信息*/
			getuserinfo() {
				let openid;
				try {
					const openidV = uni.getStorageSync('openid');
					if (openidV) {
						console.log(openidV)
						openid = openidV

					} else {
						//alert(1123)

					}
				} catch (e) {
					// error
				}
				uni.showLoading({
						title: '处理中...'
					}),
					console.log(1);
					// 获取微信用户信息
					uni.getUserInfo({
						success: (userRes) => {
							if (openid) {
								console.log("getUserInfo接口返回：", userRes.userInfo)
								this.userInfo = userRes.userInfo
								uni.setStorageSync('userInfo1', this.userInfo)
								this.userInfo.score = 0 // 初始化自定义的用户信息
								this.hasUserInfo = true // 隐藏授权按钮
								uni.hideLoading()
								
							}
							console.log(2);
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								title: "为了更好的功能体验，请先登录授权！",
								icon: "none"
							})
							console.log("请点击授权进行登录！")
							console.log(3);
						}
					})
			},
			// getShopCat() {
			// 	this.allPrices = 0
			// 	uni.showLoading({
			// 		title: '处理中...'
			// 	})
			// 	this.$api.getShopCat().then((res) => {
			// 		uni.hideLoading()
			// 		if (res.data) {
			// 			if (res.data.length > 0) {
			// 				console.log(res)
			// 				this.$store.state.vuex_tabbar[2].count = res.data.length
			// 				try {
			// 					const Value = uni.getStorageSync('shopingCat_key');
			// 					if (Value) {
			// 						uni.removeStorageSync('shopingCat_key');
			// 						console.log(Value)
			// 					} else {
			// 						//alert(1123)

			// 					}
			// 					uni.setStorageSync('shopingCat_key', res.data);
			// 				} catch (e) {
			// 					// error
			// 					uni.setStorageSync('shopingCat_key', res.data);
			// 					console.log(e);
			// 				}
			// 			} else {
			// 				this.$store.state.vuex_tabbar[2].count = 0
			// 			}
			// 		}
			// 	}).catch((err) => {
			// 		//console.log(err);
			// 		uni.hideLoading()
			// 		uni.showModal({
			// 			content: err.message || '获取订单信息失败',
			// 			showCancel: false
			// 		})

			// 	})
			// }
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;
		position: absolute;
		top: 0;
		width: 100%;

		.weixLogin {
			width: 100%;
			margin-top: 50%;

			.weixLoginBox {
				width: 300px;
				margin: 40px auto 0;
			}

			.getCaptcha {
				background-color: #19be6b;
				color: $uni-text-color-inverse;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}
		}

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
