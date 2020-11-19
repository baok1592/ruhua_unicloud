'use strict'
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('category')
	var res;
	res = await collection.where({
		Pid: dbCmd.eq(0)
	}).get()
	return {
		data: res.data
	}
}
