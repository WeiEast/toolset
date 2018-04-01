var models = require('../models');
var oss_db = models.oss;

async function getOssKey(type){
	let keys = await oss_db.findAll({ where: {type: type} });

	if(keys.length > 0){
		return keys[0].dataValues;
	}else{
		return null;
	}
}

module.exports = getOssKey;
