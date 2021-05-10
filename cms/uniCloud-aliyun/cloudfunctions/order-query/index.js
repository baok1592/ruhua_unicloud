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
	const {
		outTradeNo,
		uniIdToken
	} = event
	const payload = await uniID.checkToken(uniIdToken)
	if (payload.code > 0) {
		return {
			code: 1001,
			msg: '用户身份验证失败，请重新登录'
		}
	}
	const uid = payload.uid
	const order = db.collection('order')
	let orderDetail = await order.where({
		outTradeNo,
		uid
	}).get()

	if (orderDetail.data.length === 0) {
		return {
			code: -2,
			msg: '订单不存在'
		}
	}

	// 订单状态可能已经被接收平台通知的接口修改
	if (orderDetail.data[0].status === 2) {
		return {
			orderPaid: true
		}
	}
	
	const provider = orderDetail.data[0].payment_channel
	
	let uniPayInstance
	switch (provider + '_' + context.PLATFORM) {
		case 'wxpay_mp-weixin':
			uniPayInstance = uniPay.initWeixin(wxConfigMp)
			break;
		case 'wxpay_app-plus':
			uniPayInstance = uniPay.initWeixin(wxConfigApp)
			break;
		case 'wxpay_h5':
			uniPayInstance = uniPay.initWeixin(wxConfigH5)
			break;
		case 'alipay_mp-alipay':
			uniPayInstance = uniPay.initAlipay(aliConfigMp)
			break;
		case 'alipay_app-plus':
			uniPayInstance = uniPay.initAlipay(aliConfigApp)
			break;
		case 'alipay_h5':
			uniPayInstance = uniPay.initAlipay(aliConfigH5)
			// uniPayInstance = uniPay.initAlipay(aliConfigSandbox)
			break;
		default:
			return {
				code: -1,
				msg: '参数错误'
			}
	}

	let queryResult = await uniPayInstance.orderQuery({
		outTradeNo
	})

	if (queryResult.tradeState === 'SUCCESS' || queryResult.tradeState === 'FINISHED') {
		await order.where({
			outTradeNo
		}).update({
			status: 2,
			transactionId: queryResult.transactionId
		})
		return {
			orderPaid: true
		}
	}
	return {
		orderPaid: false
	}
};
