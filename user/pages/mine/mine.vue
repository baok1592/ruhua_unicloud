<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
		
			<view class="u-m-r-10" v-if="userInfo1.avatarUrl">
				<u-avatar :src="userInfo1.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-m-r-10" v-else>
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1" v-if="phone!=''">
				<view class="u-font-18 u-p-b-20">{{nickname}}</view>
				<view class="u-font-14 u-tips-color">账号:<span>{{phone}}</span></view>
			</view>
			<view class="u-flex-1" v-else>
				<view class="u-font-18 u-p-b-20">{{userInfo1.nickName}}</view>
			<!-- 	<view class="u-font-14 u-tips-color">微信号:<span>{{userInfo1}}</span></view> -->
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>


		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="订单" @click="OrderBtn()"></u-cell-item>
				<!-- <u-cell-item icon="coupon" title="优惠券" @click="CouponBtn()"></u-cell-item> -->
			</u-cell-group>
		</view>

		<view class="u-m-t-20" @click="SetupBtn()">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- #ifdef H5 -->
		<view class="u-m-t-20" @click="tuichu">
			<u-cell-group>
				<u-cell-item icon="info-circle-fill" title="退出登录"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- #endif -->
		<Tabbar></Tabbar>
	</view>
</template>

<script>
	import imgUrl from '../../static/img/potu.png'
	export default {
		data() {
			return {
				pic: imgUrl,
				show: true,
				userInfo:{},
				imuurl:'',
				nickname:'',
				phone:"",
				wxcode:'',
				userInfo1:{}
			}
		},
		onLoad() {
			
		},
		onShow() {
			try {
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
				const value = uni.getStorageSync('uni_id_token');
				if (value) {
					//console.log(value);
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
				console.log(e);
			}
			try {
				const value2 = uni.getStorageSync('userInfo1');
				if (value2) {
					console.log(value2)
					this.userInfo1=value2
				} else {
					//alert(1123)
					
				}
			} catch (e) {
				// error
				
				console.log(e);
			}
			try {
				const value1 = uni.getStorageSync('userInfo');
				if (value1) {
					console.log(value1)
					this.userInfo=value1
					let srt;
					if(this.userInfo.username!=''){
						let str=this.userInfo.username
						srt=str.substring(str.length-4);
					}
					this.phone=this.userInfo.username;
					this.nickname="Ruhua_"+srt
				} else {
					//alert(1123)
					
				}
			} catch (e) {
				// error
				
				console.log(e);
			}
		},
		methods: {
			SetupBtn() {
				uni.showModal({
					showCancel: false,
					content: '开发中',
				})
			},
			OrderBtn() {
				uni.navigateTo({
					url: '/pages/OrderList/OrderList'
				});
			},
			CouponBtn() {
				uni.navigateTo({
					url: '/pages/couponList/couponList'
				});
			},
			tuichu() {
				uni.showModal({
					showCancel: true,
					content: '是否退出登录?',
					success: function(res) {
						if (res.confirm) {
							try {
								uni.removeStorageSync('uni_id_token');
							} catch (e) {
								// error
							}
							try {
								uni.removeStorageSync('uni_id_token_expired');
							} catch (e) {
								// error
							}
							uni.reLaunch({
								url: '/pages/index/index'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;

	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
