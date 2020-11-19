import $http from '@/common/http.js'; //不传参数处理办法
import $httpP from '@/common/httpP.js' //需要传参数处理办法

const callFun = () => {  //获取banner轮播图
	return $http('banner')
}
const callNav = () => {  //获取分类列表
	return $http('sortNav')
}
const callgoodsList = () => {  //获取商品列表
	return $http('goodsList')
}
const DelCart = () => {  //获取商品列表
	return $http('DelCart')
}
const get_order = ({name,data}) => {  //获取订单
	return $httpP({url:'order',data:data})
}
const get_order_lot = ({name,data}) => {  //批量下单
	return $httpP({url:'order-lot',data:data})
}
const getOrderDetail=(data)=>{ //获取订单详情
	return $httpP({url:'get-order-detail',data:data})
}
const referPay=(data)=>{ //提交订单
	return $httpP({url:'pay',data:data})
}
const orderQuery=(data)=>{ //查看支付情况
	return $httpP({url:'order-query',data:data})
}
const getOrderInfo=(data)=>{ //查看订单情况
	return $http('get-order')
}
const getShopCat=(data)=>{ //查看购物车列表
	return $http('get-shopCat')
}
// const get_allFun= ({name,data}) => {//需要传参云函数处理办法
// console.log(data)
// 	return $httpP({
// 		url: name,
// 		data:data
// 	})
// }


export default {
	callFun,
	callNav,
	// get_allFun,
	callgoodsList,
	get_order,
	getOrderDetail,
	referPay,
	orderQuery,
	getOrderInfo,
	getShopCat,
	get_order_lot,
	DelCart
}
