'use strict'
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('goods-list')
	const res = await collection.where({
		goodsName: event.goodsName
	}).get()

	return {
		code:0,
		msg: "查询成功",
		data: res.data
	}
}
