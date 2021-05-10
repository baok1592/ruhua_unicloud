'use strict';
const db = uniCloud.database()
const uniID = require('uni-id')

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
	console.log(uid)
	const collection = db.collection('order')
	const res = await collection.where({
		uid:uid
	}).get()
	return res
};
