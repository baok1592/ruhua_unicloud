'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('banner-list')
	const res = await collection.get(event)
	return res
};
