'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(event)
	const collection = db.collection('goods-list')
	const docList = await collection.get();
	if (!docList.data || docList.data.length === 0) {
		return {
			status: -1,
			msg: '暂无数据'
		}
	}
	const res = await collection.where({
		_id: event.id,
		isStop: event.isStop
	}).get()
	console.log(JSON.stringify(res.data))

	return {
		code: 0,
		msg: "查询成功",
		data: res.data
	}
};
