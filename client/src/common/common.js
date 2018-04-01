// 防止被多次点 造成多次webview的切换
var jumpFlag = false;
// 跳转原生
function gotoNative(obj){
	if(jumpFlag) return;

	var feature = obj.feature, data = obj.data, type = obj.type;
	var params = { type: type, data: data};

	if(appBridge.checkAppFeature(feature)){
		jumpFlag = true;
		appBridge.gotoNativeView(params);
	}
	else{
		upgrade();
	}
}
// app内点击返回 刷新
function onAppBack(cb){
	if (appBridge && appBridge.checkAppFeature('LIKE_COMMENT')) {
        appBridge.onAppBackToInputPage(function () {
            jumpFlag = false;
            cb()
        });
    }
}

// var request = {
// 	// 首页
// 	home: '/pointsStore/getPointsStoreIndex',
// 	// 签到
// 	signIn: '/pointsStore/saveSignInfo',
// 	// 签到提醒
// 	signInRemind: '/pointsStore/saveUserSignRemind',
// 	// 获取红包详情
// 	getProduct: '/pointsStore/getPointsProductById',
// 	// 宝石兑换商品
// 	exchange: '/pointsStore/saveConversionProduct',
// 	// 获取任务列表
// 	missionList: '/pointsStore/listMissionCenter',
// 	// 红包列表页
// 	quanList: '/pointsStore/listPointsProduct',
// 	// 测试接口
// 	test: '/pointsStore/saveSignInfo4User'
// }

// function reqestPath(){
// 	var reqPath = {};
// 	for(var type in request){
// 		reqPath[type] = baseUrl + request[type];
// 	}
// 	return reqPath;
// }


module.exports = {
	// 跳原生方法
	gotoNative: gotoNative,
	// 原生webview 返回需要刷新
	onAppBack: onAppBack,
	// 所有的接口
	// reqPath: reqestPath()
}