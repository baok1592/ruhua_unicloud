'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('admin')
	const res = await collection.doc(event._id).update({
		  adminName: event.adminName,
		  isAdminof: event.isAdminof,
		  isGoods: event.isGoods,
		  isOrder: event.isOrder,
		  isText: event.isText,
		  password:event.password,
		  username: event.username,
		  Pid:event.Pid,
		  Enable:event.Enable,
		  delete_date: event.delete_date
	})
	console.log(JSON.stringify(res))

	//返回数据给客户端
	return {
		code: 0,
		msg: "修改成",
		data: res.data
	}
};
