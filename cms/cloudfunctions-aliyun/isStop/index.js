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
	const res = await collection.doc(event.id).update({isStop:event.isStop});
	if (res.updated === 1) {
		return {
			status: 0,
			msg: `操作成功`
		}
	} else {
		return {
			status: -1,
			msg: `操作失败`
		}
	}
};
	