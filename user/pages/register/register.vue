<template>
	<view class="content">

		<view class="u-demo-area">
			<u-toast :type="typeG" ref="uToast"></u-toast>
			<!-- <text class="no-mode-here">见弹出toast</text> -->
		</view>

		<input type="text" v-model="username" placeholder="用户名/邮箱/手机号" />
		<input type="text" v-model="username1" placeholder="再次输入用户名/邮箱/手机号" />
		<input type="text" v-model="password" password="true" placeholder="密码" />
		<button type="default" @click="register">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				username1: '',
				typeG: '',
				title: '',
				position: 'center',
				icon: true,
				url: ''
			}
		},
		methods: {
			register() {
				var resl = this
				if (resl.username == '') {
					resl.typeG = 'error'
					resl.$refs.uToast.show({
						title: '用户名/邮箱/手机号不能为空',
						position: resl.position,
						type: resl.typeG,
						icon: resl.icon,
						url: resl.url,

					});
				} else {
					if (resl.username == resl.username1) {
						if (resl.password != '') {
							uniCloud.callFunction({
								name: 'user-center',
								data: {
									action: 'register',
									params: {
										username: resl.username,
										password: resl.password
									}
								},
								success(res) {
									if (res.result.code == 0) {
										resl.typeG = 'success'
										setTimeout(function() {
											uni.reLaunch({
												url: '/pages/index/index'
											});
										}, 1000)
									} else {
										resl.typeG = 'error'
									}

									resl.$refs.uToast.show({
										title: res.result.msg,
										position: resl.position,
										type: resl.typeG,
										icon: resl.icon,
										url: resl.url,
									});
									console.log(res.result.msg)
									uni.setStorageSync('uni_id_token', res.result.token)
									uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
								},
								fail(e) {
									resl.typeG = 'error'
									resl.$refs.uToast.show({
										title: res.result.msg,
										position: resl.position,
										type: resl.typeG,
										icon: resl.icon,
										url: resl.url,
									});
								}
							})
						} else {
							resl.typeG = 'error'
							resl.$refs.uToast.show({
								title: '密码不能为空',
								position: resl.position,
								type: resl.typeG,
								icon: resl.icon,
								url: resl.url,
							});
						}

					} else {
						resl.typeG = 'error'
						resl.$refs.uToast.show({
							title: '俩次用户名/邮箱/手机号必须相同',
							position: resl.position,
							type: resl.typeG,
							icon: resl.icon,
							url: resl.url,
						});
					}
				}
			}
		}
	}
</script>

<style>
	.content {
		padding: 15px;
		position: relative;
	}

	.content input {
		height: 46px;
		border: solid 1px #DDDDDD;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0px 15px;
	}

	.content button {
		margin-bottom: 15px;
	}

	.content navigator {
		display: inline-block;
		color: #007AFF;
		border-bottom: solid 1px #007AFF;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 15px;
	}

	.tips {
		text-align: center;
		line-height: 20px;
		font-size: 14px;
		color: #999999;
		margin-bottom: 20px;
	}
</style>
