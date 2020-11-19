'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('goods-list')
	const res = await collection.skip(0).limit(10).get()
	return res
	//let params = event.params || {}
	
};
