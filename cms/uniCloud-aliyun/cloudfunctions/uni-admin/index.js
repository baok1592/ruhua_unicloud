'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('admin')
	var res = await collection.get(event)
	return res
}
	