const log4js = require('log4js');
const request = require('request');
let logger = log4js.getLogger();

function proxyApi(ctx, next){
	// let param = parseQuery(ctx.query);
	var url = 'http://www.iconfont.cn/api/project/detail.json';
	var param = {
		pid: 280767,
		t: +new Date(),
		ctoken: '2IfsfV7j7Sv7jCxdyegVicon-font'
	};
	// var cookies_str = 'ctoken=2IfsfV7j7Sv7jCxdyegVicon-font; UM_distinctid=15bf0e2a2180-015c5c99ffd06b-153a655c-1fa400-15bf0e2a219842; cna=nJaZEde8Vx4CAXPsHRIQcb56; CNZZDATA1260547936=1565097747-1494390376-%7C1494397280; l=Ant7D1wq-XQNUmqwKLCeOEIKi1Xl0I/S; isg=AujoR8QEJZkdkwkeKkNNP9FEudB2fEwbh_NVR6IZNGNW_YhnSiEcq34_gyL3';
	var cookies_str = 'ctoken=2IfsfV7j7Sv7jCxdyegVicon-font; UM_distinctid=15bf0e2a2180-015c5c99ffd06b-153a655c-1fa400-15bf0e2a219842; cna=nJaZEde8Vx4CAXPsHRIQcb56; EGG_SESS=mw0LQaZ1GQ_DddakXoZGge2i2W5h0R8WBKzpzYcBzh2Tzgtfh8Co1Q9Dh_25ilAr67D2eGptatVc5_sW7EwhhZMSNXcd7m0Xt6et_VzgDcwDCJ1R8xoqIOeteSunYZnneOOK3pIwOfM4E0r-xaKcFHZDapJKgdDbFnc0MU2iOpN3UorLC5lbk3_VvT_IrosURYgpIvV0Fa5QI5fzxnJ6O51nJGabol0drg-sDO74F_3BaOC9EV5qkGynJrfWzRnNJiKHxsISRzMnNonlpFp6kKSoFWeHXAiTKGi7kWxqffdp-lZhQUO0Fft6aanW_G25FevJ5JFvzejtOe8XHztwYOrqer_5Tpv5zK5bBIL-og0RM1tiUVcXmrLwJecvrO9b7h8MTBH-1HwToiBVmWW0FLz6BU2TI24ZAGyITHWN88Hwlc3-qE8WpqjYS5H4rwWee-uNYbKB5jjCGfEbrOo5i8s72ehGn72u7Zn1NYIRPZBeWYA1kmRLvaMnKufGhKl0IHwMoLP2R4BTonQbKUNaUHeSMUoqfmkvFbTRaAo3XhUQqjroSEuoSZPWniX8VF-8O_nHWVDAzkxDIvzviS1Fe-e0dqQ6DyUogSFlwL39K6ItMkIqoR4MiwND1BrDPdhOiG85TBD1VuP6Ed0V8W76KD7XYUXHsCNmrAGIcLTRcg43DhwQdmLQ3ddl0JOWe_wj6MaXY0-xQnG5sw0rJBruPt7Jw94y2ppT6rqkx6MZ5B3WeWQd2W-zAipOZyxQg_0Ejz3-ZK9SRHwVSrea62CExUCc358gS6lMoB-vQXgqLQUJQokDhxDj7MRrver4bY4-J-dpdWLTuwMNn_o6HBmTF5BXnI4R5Fv0F7mcv45-atjuVLCJXLrbaC3anpvJyuSXoAnN8Uwq6INK9Cqw3kiIqzn-xNtICpYa1SoVpzwYfMfKFELBey5hN1J5-vcYHtNlTheMQjz3Q9X2oh6qyizDoBouCVpq0OmnmqJaP2b5YiIVO98ropGIHdy6TM1zasfLEdPBuavqpJwk_IZVpVIzqNflqx_sx0yojPbQhOP9CYmGBEjX9KFyn8tcIO3pgMHa; l=AhcXOFcbXZjBJnZkLKz6hP48J4FhEeu-; isg=AoyMW-fgOc0hrS2y7nfhS13IXewyqDBvm-8x6-ZN1TfacSx7DtUA_4KJZ84z; CNZZDATA1260547936=1565097747-1494390376-%7C1494397280; u=98552';
	var cookies = cookies_str.split(';');
	var headers = require('../aliyun-iconfont/config.js').header;
	return proxyRequest(url, param, cookies, headers);
}

function parseQuery(query){
	console.log(query);

}

function getJar(cookies, url){
	var j = request.jar();
	for(let i = 0; i < cookies.length; i++){
		j.setCookie(cookies[i], url);
	}
	return j;
}

function proxyRequest(url, param, cookies, headers, method){
	logger.debug(url);
	method = method ? method : 'GET';
	console.log(cookies);
	let j = getJar(cookies, url);

	return new Promise((rs, rj) => {
		let options = {
			method: method,
			url: url, 
			headers: headers, 
			json: true, 
			qs: param,
			jar: j
		};

		request(options, (err, r, body) => {
			if(err) {
				rj(err);
			} else {
				console.log(body);
				rs(body);
			}
		});

	})
}

module.exports = {
	proxyApi: proxyApi,
	proxyRequest: proxyRequest
};


