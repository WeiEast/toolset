var fs =require('fs');
var url = require('url')
var path = require('path')

var gulp = require('gulp');
var through2 = require('through2');
var $ = require('gulp-load-plugins')();

var request = require('request');
var remoteSrc = require('gulp-remote-src');
var ossKey_db = require('../ossKey.js');
var icons_db = require('./icons.js');
var utils = require('../../utils');

const baseOSSCfg = utils.baseOSSCfg;
const addHttpProtocal = utils.addHttpProtocal;

// 上传到阿里云的 目标目录  
const oss_prefix = 'ali-iconfont';
const agent = 'http://res.winbaoxian.com/' + oss_prefix;

async function iconfont(addr){
	if(typeof addr !== 'string'){
		throw new Error('iconfont address must be type [string]');
	}
	// 添加http协议名称  (//at.alicdn.com/t/font_s8xce5to0vk7qfr.css  ==>  http://at.alicdn.com/t/font_s8xce5to0vk7qfr.css)
	addr = addHttpProtocal(addr);
	// 获取url中的文件名  (//at.alicdn.com/t/font_s8xce5to0vk7qfr.css ==> font_s8xce5to0vk7qfr.css)
	var filename = path.basename(url.parse(addr).pathname);
	// 去掉文件名  只取路径 (http://at.alicdn.com/t/font_s8xce5to0vk7qfr.css ==> http://at.alicdn.com/t/)
	addr = addr.replace(filename, '');
	// 获取oss配置信息
	let ossItem = await ossKey_db('assets');
	if(!ossItem){
		throw new Error('[Database] oss key not init');
	}
	let ossOpt = baseOSSCfg(ossItem);
	// 默认上传到阿里云的这个目录  请注意服务器不要有重名的
	ossOpt.prefix = oss_prefix;

	let hasThisFile = await icons_db.checkIcons(filename);
	if(hasThisFile){
		throw new Error(`file ${filename} alreay stored`);
	}

	return downloadAsset(addr, filename, ossOpt, agent);
}

var font_ext_arr = ['eot', 'woff', 'ttf', 'svg'];

function downloadAsset(addr, filename, ossOpt, agent) {
	// 替换阿里云css 中使用的地址 host 为  host_replaced
	var host = 'at.alicdn.com/t';
	var host_replaced = 'res.winbaoxian.com/' + oss_prefix;
	var css_path = agent;
	// 除了 .css  其他的字体也全部上传到  阿里云
	var file_ext = path.extname(filename);
	var reg = new RegExp(file_ext + '$', 'g');
	var file_base_name = filename.replace(reg, '');
	var file_arr = font_ext_arr.map((item) => {
		return file_base_name + '.' + item;
	})

	function filter_file(file){
		var isfile = file.relative == filename;
		return isfile;
	}
	return new Promise((rs, rj) => {
		remoteSrc([filename].concat(file_arr), {base: addr})
				.pipe($.debug())
				.pipe($.if(filter_file, $.replace(host, host_replaced)) )
				// 阿里云 iconfont 默认 font-size:16px; 删除之 
				.pipe($.if(filter_file, $.replace('font-size:16px;', '')) )
				.pipe($.if(filter_file, through2.obj((file, enc, cb) => {
					parseCss(file, filename, css_path, addr).then(() => {
						cb(null, file);
					}).catch((e) => {
						rj(e);
					})
				})))
				.pipe($.aliyunOss(ossOpt))
				.on('finish', () => {
					rs();
				});
	});
}
function parseCss(file, filename, css_path, href) {
	// 筛选出所有的icon 类   e.g.( .icon-* )
	// var css_selector_reg = /(\.\w+(-)(\w+|-))/g;
	var css_selector_reg = /(\.)(\w+-)[\w+-]+/g;
	var css_contents = String.fromCharCode.apply(null, file.contents);
	var icons = css_contents.match(css_selector_reg);

	var data = {
		icon_list: JSON.stringify(icons),
		timestamp: + new Date(),
		url: css_path,
		filename, 
		href,
	}
	return icons_db.saveIcons(data);
}

module.exports = iconfont;