'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('order')
	var total = await collection.count()
	var res = await collection.get()
	return {
		total: total.total,
		data: res.data
	}
}
