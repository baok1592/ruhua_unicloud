'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('goods-list')
	var res = await collection.add(event)
	return res
}

// 'use strict';
// exports.main = async (event, context) => {
// 	//event为客户端上传的参数
// 	console.log('event : ', event)
	
// 	//返回数据给客户端
// 	return event
// };