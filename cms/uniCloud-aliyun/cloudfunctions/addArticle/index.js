'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('article')
	var res = await collection.add(event)
	return res
}
	