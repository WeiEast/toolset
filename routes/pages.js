var express = require('express');
var router = express.Router();
var ossPath_db = require('../controllers/ossPath.js');

router.get('/imageupload', function(req, res, next) {
	ossPath_db('image').then((upload_data) => {
		if(!upload_data){
		  throw new Error(`[Database] upload config not init, type: image`);
		}

		res.render('imageupload', upload_data.data);
	}).catch((e) => next(e));
});

router.get('/resourceupload', function(req, res, next){
	ossPath_db('resource').then((upload_data) => {
		if(!upload_data){
		  throw new Error(`[Database] upload config not init, type: resource`);
		}

		res.render('resourceupload', upload_data.data);
	}).catch((e) => next(e));
})

router.get('/cdn', (req, res, next) => {
	res.render('cdn', {});
})

module.exports = router;
