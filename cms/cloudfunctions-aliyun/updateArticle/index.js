'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('article')
	if (event.id instanceof Array) {
		for (let i = 0; i < event.id.length; i++) {
			await collection.doc(event.id[i]).update({
				delete_date: event.delete_date
			})
		}
	} else {
		await collection.doc(event.id).update(event)
	}
	return {
		status: 1,
		msg: '操作成功'
	}
}
