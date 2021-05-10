'use strict';
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
	const dbCmd = db.command
	// 获取订单中的商品信息
	const orderList = await order.aggregate().match({
		outTradeNo,
		uid
	}).unwind('$goodsInOrder').lookup({
		from: 'goods-list',
		localField: 'goodsInOrder.id',
		foreignField: '_id',
		as: 'goodsDetail'
	}).unwind('$goodsDetail').end()
		console.log(orderList.data)
	if (orderList.data.length === 0) {
		return {
			code: -1,
			msg: '暂无订单快去购物吧'
		}
	}
	let orderDetail = Object.assign({}, orderList.data[0])
	delete orderDetail.goodsDetail
	delete orderDetail.goodsInOrder

	orderDetail.goodsList = orderList.data.map((item) => {
		return item.goodsDetail
	})
	//console.log(payload)
	return orderDetail
};
