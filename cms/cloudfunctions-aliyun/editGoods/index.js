'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('goods-list')
	const res = await collection.doc(event._id).update({
		radio: event.radio,
		radio2: event.radio2,
		onePick: event.onePick,
		goodsNameT: event.goodsNameT,
		value: event.value,
		Shelves: event.Shelves,
		isHot: event.isHot,
		isNew: event.isNew,
		isStop: event.isStop,
		pName: event.pName,
		goodsId: event.goodsId,
		imgUrl: event.imgUrl,
		bannerUrl: event.bannerUrl,
		goodsName: event.goodsName,
		price: event.price,
		spec: event.spec,
		inventory: event.inventory,
		storeId: event.storeId,
		storeName: event.storeName,
		delete_date: event.delete_date,
	})
	console.log(JSON.stringify(res))

	//返回数据给客户端
	return {
		code: 0,
		msg: "修改成功",
		data: res.data
	}
};
