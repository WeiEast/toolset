var express = require('express');
var router = express.Router();
var oss = require('../controllers/upload/upload_to_oss.js');
var upload = require('../controllers/upload.js');

function addRouterData(keyType, pathType){
	return function(req, res, next){
		var routerData = {
			keyType: keyType,
			pathType: pathType
		}
		req.routerData = routerData;

		next();
	}
}

router.post('/images', upload.upload_mem.single('image'), addRouterData('image', 'image'), (req, res, next) => {
	oss.upload(req, res, next).then((d) => {
		console.log(d)
		res.send(d);
	}).catch((e) => {
		next(e);
	})
});

router.post('/resource', upload.upload_mem.single('resources'), addRouterData('assets', 'resource'), (req, res, next) => {
	oss.upload(req, res, next).then((d) => {
		console.log(d)
		res.send(d);
	}).catch((e) => {
		next(e);
	})
});




module.exports = router;
