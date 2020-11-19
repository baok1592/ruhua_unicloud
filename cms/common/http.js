export default function $http(options) {
	//const url = options
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: options
		}).then((res) => {
			if (res.result.code) {
				if (res.result.code == 1001) {
					reslove(res.result)
					uni.showModal({
						content: res.result.msg,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								});
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

					return true
				}
				uni.showModal({
					content: res.result.msg,
					showCancel: false,
				});
				return true
			}
			if (res.success == true) {
				reslove(res.result)
			} else {
				uni.showModal({
					content: res.result.msg,
					showCancel: false,
				});
			}


		}).catch((err) => {
			reject(err)
		})
	})
}
