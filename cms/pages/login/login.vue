<template>
	<div class="login-box">
		<el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
			<h3 class="title">系 统 登 录</h3>
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" autocomplete="off" placeholder="账 号: admin" prefix-icon="el-icon-user">
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input :type="textType" v-model="loginForm.password" @keyup.native.enter="login('loginForm')" autocomplete="off"
				 placeholder="密 码: 123456" prefix-icon="el-icon-key">
					<i slot="suffix" class="el-input__icon el-icon-view btn-eye" @click="changeType"></i>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="login('loginForm')" class="login-btn" :loading="loading">登 录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				loading: false,
				textType: 'password'
			}
		},
		methods: {
			login(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true
						uniCloud.callFunction({
							name: "login",
							data: this.loginForm
						}).then((res) => {
							var res = res.result
							if (res.status === 1) {
								this.$store.commit('login', res.data)
								this.$message({
									message: res.msg,
									type: 'success',
									duration: 1000,
									onClose: () => {
										uni.redirectTo({
											url: '../index/index'
										})
									}
								})
							} else {
								this.loading = false
								this.$message({
									showClose: true,
									message: res.msg,
									type: 'warning',
									duration: 1000
								})
							}
						})
					}
				})
			},
			changeType() {
				this.textType = (this.textType === 'password' ? 'text' : 'password')
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #20222A;

		.login-form {
			border-radius: 5px;
			background-clip: padding-box;
			margin: 180px auto;
			width: 350px;
			padding: 35px 35px 15px 35px;
			background: #f5f5f5;
			border: 1px solid #eaeaea;
			box-shadow: 0 0 5px #cac6c6;

			.title {
				margin: 0px auto 40px auto;
				text-align: center;
				color: #505458;
			}

			.btn-eye {
				cursor: pointer;
			}

			.text-danger {
				color: #F56C6C;
			}

			.login-btn {
				margin: 35px 0 10px 0;
				width: 100%;
			}
		}
	}
</style>
