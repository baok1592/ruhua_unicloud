'use strict'
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	console.log(event)
	const collection = db.collection('goods-list')
	var total;
	var res;
	total = await collection.where({
		isStop: event.isStop
	}).count()
	res = await collection.where({
		isStop:event.isStop
	}).field({
		'content': false
	}).orderBy('goodsName', 'desc').skip((event.page - 1) * event.limit).limit(event.limit).get()
	return {
		total: total.total,
		data: res.data
	}
}
