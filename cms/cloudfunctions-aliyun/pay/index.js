'use strict';
const {
	wxConfigMp,
	wxConfigApp,
	wxConfigH5,
	aliConfigMp,
	aliConfigApp,
	aliConfigH5,
	// aliConfigSandbox
} = require('config')

const uniPay = require('unipay')
const uniID = require('uni-id')

const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		provider,
		outTradeNo,
		uniIdToken
	} = event
	// context.CLIENTUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
	// context.PLATFORM = 'h5'
	// provider = 'alipay'
	// outTradeNo = '1596269911e39a6d9c'
	// uniIdToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjA2OTk0N2UwM2VhYzAwMDEzYjg3ODEiLCJjbGllbnRJZCI6IjE5NWY3N2MxODBjMjNlM2Y1YThhOGYzOGU0MjkwMTg2IiwiaWF0IjoxNTk2MjY3NDkzLCJleHAiOjE1OTYyNzQ2OTN9.dIGtnn3sY3KDI4L5pFXOIBjEaaFEcYUz6EBgPEfEooE'
	
	const payload = await uniID.checkToken(uniIdToken)
	if (payload.code > 0) {
		return {
			code: 1001,
			msg: '用户身份验证失败，请重新登录'
		}
	}
	const uid = payload.uid

	const orderList = await db.collection('order').where({
		outTradeNo,
		uid
	}).get()

	if (orderList.data.length !== 1 || orderList.data[0].status !== 1) {
		return {
			code: -2,
			msg: '订单状态不正确'
		}
	}

	await db.collection('order').where({
		outTradeNo,
		uid
	}).update({
		payment_channel: provider
	})

	const userList = await db.collection('uni-id-users').where({
		_id: uid
	}).get()
	const userInfo = userList.data[0]

	let uniPayInstance,
		notifyUrl =
		`https://8798e3c5-3cd6-4ecc-8b5c-f75aca13865b.bspapp.com/http/payment-notify/${provider}_${context.PLATFORM}`,
		openid,
		tradeType
	// notifyUrl为接收通知的云函数的url，云函数Url化请参考：https://uniapp.dcloud.io/uniCloud/http
	switch (provider + '_' + context.PLATFORM) {
		case 'wxpay_mp-weixin':
			uniPayInstance = uniPay.initWeixin(wxConfigMp)
			openid = userInfo.wx_openid['mp-weixin']
			tradeType = 'JSAPI'
			break;
		case 'alipay_mp-alipay':
			uniPayInstance = uniPay.initAlipay(aliConfigMp)
			openid = userInfo.ali_openid
			break;
		case 'wxpay_app-plus':
			uniPayInstance = uniPay.initWeixin(wxConfigApp)
			tradeType = 'APP'
			break;
		case 'alipay_app-plus':
			uniPayInstance = uniPay.initAlipay(aliConfigApp)
			break;
		case 'wxpay_h5':
			uniPayInstance = uniPay.initWeixin(wxConfigH5)
			tradeType = 'NATIVE'
			break;
		case 'alipay_h5':
			uniPayInstance = uniPay.initAlipay(aliConfigH5)
			// uniPayInstance = uniPay.initAlipay(aliConfigSandbox)
			tradeType = 'NATIVE'
			break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
	}

	const {
		totalFee,
	} = orderList.data[0]

	let orderInfo

	// 请填写对应平台接收通知云函数对应的云函数url化地址，云函数url化请参考：https://uniapp.dcloud.io/uniCloud/http
	try {
		// 获取支付信息
		orderInfo = await uniPayInstance.getOrderInfo({
			openid, // App端支付时不需要openid，传入个undefined也没有影响
			outTradeNo,
			totalFee,
			subject: "测试商城的测试订单标题",
			body: "测试商城的测试订单详情",
			notifyUrl,
			tradeType
		})
	} catch (e) {
		console.log(e.message)
		return {
			code: -3,
			msg: '获取支付信息失败，请稍后再试'
		}
	}
	return {
		outTradeNo,
		orderInfo
	}
};
