'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('admin')
	const res = await collection.doc(event._id).remove()
	console.log(JSON.stringify(res))

	//返回数据给客户端
	return {
		code: 0,
		msg: "删除成功",
		data: res.data
	}
};
