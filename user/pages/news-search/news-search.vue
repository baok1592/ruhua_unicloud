<template>
	<view class="container">
		<view class="search-box">
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled"
				 :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
			</view>
		</view>
		<view class="container-old">
			历史记录
		</view>
		<view class="container-old-list">
			<view class="container-tag-class container-gray container-tag">
					12313
			</view>
			<view class="container-tag-class container-gray container-tag">
					12313
			</view>
			<view class="container-tag-class container-gray container-tag">
					12313
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				shape: 'round',
				clearabled: true,
				showAction: true,
				inputAlign: 'left'
			};
		},
		methods: {
			change(value) {
				// 搜索框内容变化时，会触发此事件，value值为输入框的内容
				//console.log(value);
			},
			custom(value) {
				//console.log(value);
				this.$u.toast('输入值为：' + value)
			},
			search(value) {
				this.$refs.uToast.show({
					title: '搜索内容为：' + value,
					type: 'success'
				})
			},
			clear() {
				// console.log(this.value);
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;

		.search-box {
			width: 90%;
			margin: auto;
			margin-top: 20rpx;
		}

		.container-old {
			padding: 0 25px 5px 25px;
			box-sizing: border-box;
			margin-top: 30rpx;
		}

		.container-old-list {
			padding: 0 25px 5px 25px;
			box-sizing: border-box;
			margin-top:10rpx;

			.container-tag-class{
				display: inline-block;
				margin-bottom: 10px;
				margin-right: 10px;
				font-size: 13px !important;
			}
			.container-gray {
			    background: #ededed !important;
			}
			.container-tag{
			    padding: 8px 13px;
			    font-size: 14px;
			    border-radius: 20px;
			    line-height: 14px;
			}
		}
	}
</style>
