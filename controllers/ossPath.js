var models = require('../models');
var upload_db = models.upload;

async function uploadCfg(type){

	let config = await upload_db.findAll({ where: {type: type} });

	if(config.length > 0){
    var d = config[0].dataValues;
    d.data = JSON.parse(d.data);
		return d;
	}else{
		return null;
	}
}

async function init(){
	var data = {
  "prefix": "autoUpload",
  "selectors": [
    {
      "name": "活动",
      "key": 1,
      "value": "activity"
    },
    {
      "name": "通用",
      "key": 2,
      "value": "common"
    },
    {
      "name": "社区",
      "key": 3,
      "value": "community"
    },
    {
      "name": "保险",
      "key": 4,
      "value": "insurance"
    },
    {
      "name": "学习",
      "key": 5,
      "value": "learning"
    },
    {
      "name": "直播",
      "key": 6,
      "value": "live"
    },
    {
      "name": "计划书",
      "key": 7,
      "value": "planbook"
    }
  ]
};
	let item = upload_db.build({
		type: 'image',
		data: JSON.stringify(data)
	});
	return await item.save();
}

module.exports = uploadCfg;
// module.exports = init;