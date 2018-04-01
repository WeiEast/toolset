// aliyun oss key
module.exports = function(sequelize, dataType){
	return sequelize.define('oss', {
		"accessKeyId": dataType.STRING,
		"accessKeySecret": dataType.STRING,
		"region": dataType.STRING,
		"bucket": dataType.STRING,
		"type": dataType.STRING
	}, {
		timestamps: false,
		// 防止自动在字段后面 +s 
		freezeTableName: true
	})
}