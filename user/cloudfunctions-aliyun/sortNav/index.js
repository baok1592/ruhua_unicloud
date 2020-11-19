'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('sort-nav')
	const res = await collection.get(event)
	return res
};