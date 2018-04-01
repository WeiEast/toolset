var express = require('express');
var router = express.Router();
var validator = require('validator');
var log4js = require('log4js');
var logger = log4js.getLogger();
var addHttpProtocal = require('../utils').addHttpProtocal;
var icons_db = require('../controllers/iconfont/icons.js');
var iconfont = require('../controllers/iconfont/iconfont.js');
/**
 * 处理所有的返回
 * code  200表示成功
 */
function resJson(code, data, msg){
	return {
		code: code,
		data: data,
		msg: msg
	}
}
function resError(e){
	var code = e.code ? e.code : 500;
	return {
		code: code,
		msg: e.message || 'unknow message'
	}
}

router.get('/upload', (req, res, next) => {

	var ail_path = req.query.ali;
	if(!ail_path){
		throw new Error('缺少参数 ali');
	}

	var addr = addHttpProtocal(ail_path);
	if(!validator.isURL(addr)){
		throw new Error('invalid url format');
	}

	var rst = iconfont(addr).then((d) => {
		res.json(resJson(200));
	}).catch((e) => {
		res.json(resError(e));
	});
});

router.get('/data', (req, res, next) => {
	var filename = req.query.filename;
	icons_db.getIcons(filename).then((data) => {
		res.json(resJson(200, data))
	}).catch((e) => {
		res.json(resError(e));
	});
});

router.get('/all', (req, res,next) => {
	icons_db.getAll().then((data) => {
		res.json(resJson(200, data))
	}).catch((e) => {
		res.json(resError(e));
	});
})


module.exports = router;
