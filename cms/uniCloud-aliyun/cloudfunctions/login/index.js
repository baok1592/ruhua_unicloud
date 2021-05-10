'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('admin')
	var res = await collection.where({
		username: event.username
	}).get()
	if (res.affectedDocs < 1) {
		return {
			status: 0,
			msg: '账号不存在'
		}
	}
	var user = res.data[0]
	if (user.password !== event.password) {
		return {
			status: 0,
			msg: '密码错误'
		}
	}
	return {
		status: 1,
		msg: '登录成功',
		data: user
	}
}
