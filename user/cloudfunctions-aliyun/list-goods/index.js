'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const goods = db.collection('goods-list')
	let goodsQueryResult = await goods.skip(0).limit(4).get()
	return {
		goodsList:goodsQueryResult.data
	}
};
