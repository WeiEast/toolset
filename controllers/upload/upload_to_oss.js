const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');
const log4js = require('log4js');
const safename = require('safename');
const utils = require('../../utils');
var logger = log4js.getLogger();
const gulpFile = require('gulp-file');

var ossKey_db = require('../ossKey.js')
var ossPath_db = require('../ossPath.js');

async function uploadToOss(req, res, next) {
  if(!req.file){
    throw new Error('upload file is null');
  }
  const file = req.file;
  const cfg = req.routerData;

  // get oss secret
  let ossItem = await ossKey_db(cfg.keyType);
  if(!ossItem){
    throw new Error('[Database] oss key not init');
  }
  let ossOpt = utils.baseOSSCfg(ossItem);

  // get oss upload prefix
  let uploadCfg = await ossPath_db(cfg.pathType);
  if(!uploadCfg){
    throw new Error(`[Database] upload config not init, type: ${cfg.pathType}`);
  }
  uploadCfg = uploadCfg.data;

  // 设置 上传路径 为ossPath 中的值
  // ossOpt.prefix = uploadCfg.prefix;
  ossOpt.prefix = getPrefix(req.body.prefix, uploadCfg);

  // 通过rename 字段控制是否修改名字  默认修改
  var bRename = (typeof req.body.rename !== 'undefined') ? 
      (req.body.rename == '0' ? false : true) : true;
      
  if(bRename){
    // rename fiename with safename
    let filename = safename(file.originalname);
    file.originalname = (filename == '' ? 'md5_' : filename);
  }
  

  // console.log(cfg);
  if(cfg.keyType == 'image'){
    return await doImgUpload(file, ossOpt, bRename);
  }else{
    return await doUpload(file, ossOpt, bRename);
  }
}

function doImgUpload(file, ossOption, bRename){
  // 返回的格式类型
  let results = {files:[]};
  let rst = {name: file.originalname};

  return new Promise((rs, rj) => {
    gulpFile(file.originalname, file.buffer, {src: true})
      .pipe($.plumber((e) => {
        // logger.debug('plumber e')
        // logger.debug(e);
        rj(new Error(e));
      }))
      .pipe($.mmtrix(baseMmtrixCfg(), logMmtrix))
      .pipe($.if(bRename, $.md5({size: 15})))
      .pipe($.rename(function(file){
        rst.name = file.basename + file.extname;
        rst.url = '//img.winbaoxian.com/' + ossOption.prefix +'/' + rst.name;
        logger.debug(rst);
        return file;
      }))
      .pipe($.aliyunOss(ossOption))
      .on('finish', () => {
        results.files.push(rst)
        rs(results);
      })
  });

  function logMmtrix(data){
    if(data.results){
      rst.size = data.results[0].optImg.size;
      rst.originSize = data.results[0].originImg.size;
    }
    else {
      rst = {
        size: 0,
        error: 'mmtrix no results',
      }
    }
  }

}

function doUpload(file, ossOption, bRename){
  var rst = {};
  return new Promise((rs, rj) => {
    gulpFile(file.originalname, file.buffer, {src: true})
      .pipe($.if(bRename, $.md5({size: 15})))
      .pipe($.aliyunOss(ossOption))
      .pipe($.rename((f) => {
        rst = {
          success: true,
          name: f.basename + f.extname,
          url: '//res.winbaoxian.com/' + ossOption.prefix +'/' + f.basename + f.extname
        }
        return f;
      }))
      .on('finish', (d) => {
        rs(rst);
      })
  })
}

function isStringNum(str){
  if(typeof str == 'number'){
    return true;
  }else if(typeof str == 'string'){
    return /\d+/.test(str);
  }else {
    return uploadCfg.prefix + '/unknow';
  }
}
function getPrefix(index, uploadCfg){
  if(!isStringNum(index)){
    if(index == 'eshop'){
      return uploadCfg.prefix + '/eshop'
    }
  }

  if(!index) {
    index = 0;
  }
  index = parseInt(index, 10);

  var selectors = uploadCfg.selectors;
  if(index && selectors[index - 1]){
    return uploadCfg.prefix + '/' + selectors[index -1].value;
  }else {
    return uploadCfg.prefix + '/unknow';
  }
}
function baseMmtrixCfg() {
  var cfg = {
    accesskey: 'b45f572fe450c8e2d897107cd19765e0',
    securekey: '15167cbc4cdd56c282d65bb72d7c71d3'
  }
  return cfg;
}
exports.upload = uploadToOss;