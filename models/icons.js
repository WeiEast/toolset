// aliyun iconfont
module.exports = function(sequelize, dataType){
	return sequelize.define('icons', {
		timestamp: dataType.BIGINT(20),
		href: dataType.STRING,
		icon_list: dataType.STRING(6000),
		url: dataType.STRING,
		filename: dataType.STRING
	}, {
		// 防止自动在字段后面 +s 
		freezeTableName: true
	})
}