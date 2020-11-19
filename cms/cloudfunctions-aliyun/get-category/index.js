'use strict'
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('category')
	var total;
	var res;
	total = await collection.where({
		delete_date: dbCmd.eq('0')
	}).count()
	
	res = await collection.where({
		delete_date: dbCmd.eq('0')
	}).field({
		'content': false
	}).orderBy('CategoryName', 'desc').skip((event.page - 1) * event.limit).limit(event.limit).get()
	
	return {
		total: total.total,
		data: res.data
	}
}
