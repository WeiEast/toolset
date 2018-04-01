function baseOSSCfg(ossCfg) {
	var cfg = {
		accessKeyId: ossCfg.accessKeyId,
		accessKeySecret: ossCfg.accessKeySecret,
		region: ossCfg.region,
		bucket: ossCfg.bucket,
	};
	return cfg;
}

const ADDR_SAFE_REG = /^(http|https)/;
function addHttpProtocal(addr) {
	var adder = 'http:';
	if(addr[0] !== '/' && addr[1] !== '/'){
		adder = 'http://';
	}
	if(!ADDR_SAFE_REG.test(addr)){
		addr = adder + addr;
	}
	return addr;
}



module.exports = {
	baseOSSCfg: baseOSSCfg,
	addHttpProtocal: addHttpProtocal,
}