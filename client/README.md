# 快速开始
```bash
## 安装依赖
npm install
## 启动服务
gulp


#获取帮助文档
gulp help

```

### 配置代理
在`config/index.js`的`proxyTable`中配置代理，`proxyTable`格式如下:
```javascript
/**
** filter可以是 stirng 或 array 为你需要代理的路径
** 如果代理需要修改 cookie的 Domain 参考 login
** 默认将 /user/login 都代理到了 http://test.winbaoxian.com 方便测试登录
**/
proxyTable: {
    'weiyi': {
        filter: '/pointsStore/**',
        target: 'http://point.winbaoxian.cn/',
        changeOrigin: true,
        logLevel: 'debug',
    },
    'login': {
        filter: ['/user/login/**'],
        target: 'http://test.winbaoxian.com/',
        changeOrigin: true,
        logLevel: 'debug',
        cookieDomainRewrite: {
            "*": ''
        }
    }
}
```
> 对于需要登录的api，建议可以把login 页面挂在app里，在login页面中增加一个跳转到你开发的项目首页的 按钮即可, 参考 `src/pages/login/login.vue`

## 布局
默认使用了阿里的[flexible](https://github.com/amfe/lib-flexible)布局，大致原理是规定了页面的宽度为10rem，通过设置`font-size`达到以上效果，开发时只需要使用计算过之后的`rem`即可。

本脚手架默认在每个页面中引入了全局的`common.scss`,文件，可以在`src/style/common.scss`找到，其中提供了方便作如上`rem`计算的函数,（因为开发时如果计算成rem一方面计算麻烦，另一方面不方便后期修改)
```scss
// 根据适配的font-size 转换 px 为 rem
// 这里的75px 是按照 750px的设计稿÷ 10得到的， 如果设计稿的宽度不同，需要自行修改
@function px2rem($px, $base-font-size: 75px) {
    @if (unitless($px)) {
        @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
        @return px2rem($px + 0px); // That may fail.
    } @else if (unit($px) == rem) {
        @return $px;
    }
    @return ($px / $base-font-size) * 1rem;
}
```
在写`scss`的时候只需要
```scss
width: px2rem(10px);
```

>  默认模版中将`viewport`写死为1了，经测试 `viewport`缩放比的设置有些值会使app的滑动后退失效

## 环境变量
默认使用了webpack的 [feature](https://github.com/petehunt/webpack-howto#6-feature-flags)特性，如果你有需代码中区分不同环境的地方，比如api接口可以使用 `__DEV__ __TEST__ __PRO__`控制
```javascript
if(__DEV__){
    baseUrl = "";
}else if(__TEST__){
    baseUrl = "http://point.winbaoxian.cn";
}else if(__PRO__){
    baseUrl = "https://point.winbaoxian.com";
}
```
以上代码的 `__DEV__ __TEST__ __PRO__`在不同的开发模式下将会被替换为`false`或`true`
例如在`gulp build:test`下将会被打包成
```javascript
if(false){
    baseUrl = "";
}else if(true){
    baseUrl = "http://point.winbaoxian.cn";
}else if(false){
    baseUrl = "https://point.winbaoxian.com";
}
```

## 资源注入
通过`gulp page -n name`生成的每一个页面，使用的公共资源文件(`.js .css`)文件都是通过`/inject`目录里注入的，如果你又很多页面用到了同一个库，可以在`/inject`中配置，这样的好处是，当用到的共同库有版本更新的时候你就不需要在每个页面都修改资源引用了

## ajax请求
脚手架默认使用[vue-resource](https://github.com/pagekit/vue-resource)，并在模版中已经引入，如果不想使用需自行修改

## ajax拦截器
在`src/common/resource-common.js`提供了一个`vue-resource`拦截器的脚本，可以对所有的请求做错误处理，增加加载动画，配置跨域请求是否带cookie

> 模版中默认引入了 appbridge 和 微易[iconfont](http://wyres.oss-cn-hangzhou.aliyuncs.com/iconfont/index.html),如果版本需要调整记得修改

## appbridge
`appbridge`跳转原生的方法也会像 提交form表单一样 会有多提跳转的可能性，需要自行加标识为控制，在`src/common/common.js`中提供了这个设置，但是原生跳回来的`回调事件`需要手动加入。

`src/common/config/appbridge-jump.js`提供了跳转原生的一些方法和配置。

## TODO

- 高分辨率屏上(dpr > 1)  border为1时，比原生的会粗，需要 scale进行缩放



