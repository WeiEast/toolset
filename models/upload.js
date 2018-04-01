// store oss uploads path
module.exports = function(sequelize, dataType){
	return sequelize.define('upload', {
		"data": dataType.STRING(6000),
		"type": dataType.STRING
	}, {
		timestamps: false,
		// 防止自动在字段后面 +s 
		freezeTableName: true
	})
}