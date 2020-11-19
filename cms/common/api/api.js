import $http from '@/common/http.js'; //不传参数处理办法
import $httpP from '@/common/httpP.js' //需要传参数处理办法

const callFun = () => {  //获取banner轮播图
	return $http('banner')
};
const callNav = () => {  //获取分类列表
	return $http('sortNav')
};
const callgoodsList = () => {  //获取商品列表
	return $http('goodsList')
};
const callOrder = () => {  //获取所有订单
	return $http('getOrderCms')
};
const getCategoryA = () => {  //获取商品分类顶级分类的分类名称
	return $http('get-categoryA')
};
const get_order = ({name,data}) => {  //获取订单
	return $httpP({url:'order',data:data})
};
const get_order_lot = ({name,data}) => {  //批量下单
	return $httpP({url:'order-lot',data:data})
};
const getOrderDetail=(data)=>{ //获取订单详情
	return $httpP({url:'get-order-detail',data:data})
};
const referPay=(data)=>{ //提交订单
	return $httpP({url:'pay',data:data})
};
const getGoodsList=(data)=>{ //查询商品列表-分页（商家端）
	return $httpP({url:'GetgoodsList',data:data})
};
const getCategory=(data)=>{ //查询商品分类（商家端）
	return $httpP({url:'get-category',data:data})
};
const showOrhide=(data)=>{ //设置是否显示分类（商家端）
	return $httpP({url:'showOrHide',data:data})
};
const delCategory=(data)=>{ //删除分类（商家端）
	return $httpP({url:'delCat',data:data})
};
const getGoodsList1=(data)=>{ //查询上下架商品列表-分页（商家端）
	return $httpP({url:'GetgoodsList1',data:data})
};
const IsHot=(data)=>{ //是否设置热卖产品-商家端
	return $httpP({url:'IsHot',data:data})
};
const getInquire=(data)=>{ //是否设置热卖产品-商家端
	return $httpP({url:'getInquire',data:data})
};
const IsDel=(data)=>{ //删除商品-商家端
	return $httpP({url:'delGoodsList',data:data})
};
const DelAdmin=(data)=>{ //删除管理员
	return $httpP({url:'delAdmin',data:data})
};
const IsNew=(data)=>{ //是否新商品-商家端
	return $httpP({url:'isNew',data:data})
};
const IsStop=(data)=>{ //是否下架商品-商家端
	return $httpP({url:'isStop',data:data})
};
const getIsStop=(data)=>{ //查询是否上下架-商家端
	return $httpP({url:'getIsStop',data:data})
};
const orderQuery=(data)=>{ //查看支付情况
	return $httpP({url:'order-query',data:data})
};
const getOrderInfo=(data)=>{ //查看订单情况
	return $http('get-order')
};
const getShopCat=(data)=>{ //查看购物车列表
	return $http('get-shopCat')
};
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
	getGoodsList,
	IsHot,
	IsNew,
	IsStop,
	getIsStop,
	IsDel,
	getGoodsList1,
	getInquire,
	getCategory,
	getCategoryA,
	showOrhide,
	delCategory,
	callOrder,
	DelAdmin
}
