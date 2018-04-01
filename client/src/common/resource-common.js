import Vue from 'vue'
import vueResource from 'vue-resource'
import { Toast } from 'mint-ui';

Vue.use(vueResource);
Vue.http.interceptors.push(function(req, next){
	// 跨域 带cookie
	req.credentials = true;
	var instance = null;
	// 加载动画
	instance = Toast({
		message: '加载中',
		// iconClass: 'fa s-loading rotate',
		iconClass: 'glyphicon glyphicon-refresh',
		duration: 100000
	});

	// 不缓存接口
	req.url += appendTimestampParamsToUrl(req.url);
	next(function(res){
		var code = res.status;

		if(instance){
			instance.close();
		}
		if(code == 200) return;

		debugger;
		// 全跳登录页
		Toast({
			message: '服务器状态错误:' + code,
			duration: 3000
		});

	});
});
// 添加时间戳 防止请求被缓存
function appendTimestampParamsToUrl(url){
	var arr = url.split('?'), query, str;
	if(arr.length > 1){
		query = arr[1];
	}else{
		str = '?';
	}
	str += `ts=${new Date().getTime()}`;
	return str;
}

function gotoLogin(){
	appBridge.onSessionLost();
}