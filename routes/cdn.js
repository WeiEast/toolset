var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/clear', (req, res, next) => {
	var clearPath = req.query ? req.query.path : null;
	if(!clearPath){
		return res.json({code: 400, msg: 'path required'})
	}

	clearCdnCache(clearPath).then((body) => {
		res.send(body)
	}).catch((e) => {
		res.send(e)
	})

})

function clearCdnCache(path){
	return new Promise((rs, rj) => {
		var host = 'http://service.winbaoxian.cn/aliyun/cdnrefresh';
		request.post(host, {form: {path: path}}, (e, res, body) => {
			if(e){
				rj(e)
			}else{
				rs(body)
			}
		})
	})
}

module.exports = router;