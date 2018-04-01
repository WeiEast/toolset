var models = require('../../models');
var icon_db = models.icons;

async function saveIcons(data){
	let item_db = icon_db.build(data);
	return await item_db.save();
}
// 检查是否已经存有该文件名的数据 
async function checkIcons(filename){
	let selector = await icon_db.findOne({ where: {filename: filename} });
	return selector ? true : false;
}
async function getIcons(filename){
	// console.log('getIcons', filename);
	let selector;
	if(filename) {
		selector = await icon_db.findOne({where: {filename: filename}});
	}else{
		selector = await icon_db.findAll({
			order: 'timestamp DESC',
			limit: 1
		});
		if(selector.length > 0){
			selector = selector[0];
		}
	}
	return selector;
}
async function getAll(){
	let selector = await icon_db.findAll({
		order: 'timestamp DESC'
	});
	return selector;
}

exports.saveIcons = saveIcons;
exports.checkIcons = checkIcons;
exports.getIcons = getIcons;
exports.getAll = getAll;
