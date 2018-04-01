<template>
	<div>
		<form>
		  <div class="form-group">
		    <!-- <label for="ali-input">请输入iconfont地址：</label> -->
		    <input type="text" class="form-control" 
		    	v-model="url"
		    	id="ali-input" placeholder="请输入iconfont地址">
		  </div>
		  <div class="form-group" style="text-align: left;" >
		  	<span class="btn btn-primary" @click="submit">提交</span>
		  </div>
		</form>

		<div class="jumbotron" style="padding: 1rem;">
			<h3>使用说明</h3>
			<ul style="text-align: left;">
				<li>登陆<a href="http://www.iconfont.cn/">阿里云</a>进入图标管理 -> 我的项目 -> 在我发起的项目中选中你要上传的项目</li>
				<li>页面中选择 font class，在下方会出现 url地址，点击复制代码</li>
				<li>将复制的代码粘贴到 <b>请输入iconfont地址</b> 的文本框中</li>
				<li>上传提交，可以在顶部的 去列表页中看查看你上传的内容</li>
			</ul>
		</div>

		<ul class="tutorial">
			<li>
				登录<a href="http://www.iconfont.cn/" target="_blank">阿里云iconfont页面</a>
			</li>
			<li>
				图标管理->我的图标 进入到我的项目页面  批量操作->全选->批量加入购物车
				<img src="http://img.winbaoxian.com/autoUpload/activity/addshopping_e2eaedb4d9.gif" alt="">
 			</li>
 			<li>
 				点击购物车，选择<b style="color: blue;">添加至项目</b> 在加入项目右侧点击图标新建项目，输入项目名称新建项目
 				<img src="http://img.winbaoxian.com/autoUpload/activity/generate_df145ada0c.gif" alt="">
 			</li>
			 <li>
			 	在 我的项目->我发起的项目 中选中刚才新建的项目，点击<b>暂无代码，点此生成</b>，复制生成的css
			 	<img src="http://img.winbaoxian.com/autoUpload/activity/generatecss_69e4298aca.gif" alt="">
			 </li>
			 <li>
			 	将复制的css填入到最上方的文本框，点击提交即可
			 </li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				url: ''
			}
		},
		methods: {
			submit: function(){
				var self = this;
				var url = this.url;
				if(url == '' || !url){
					Toast({
						message: '请输入iconfont地址',
						duration: 3000
					});
					return;
				}
				var params = {ali: this.url};
				this.$http.get('/iconfont/upload', {params}).then(function(res){
					var d = res.data;
					if(d.code == 200){
						Toast({message: '上传成功！'})
					}else{
						Toast({message: d.msg});
					}
				}).catch(function(e){
					console.log(e);
				})
			}
		}
	}
</script>

<style lang='scss'>
	@import './upload.scss';
	.tutorial {
		text-align: left;
		li {
			margin: 50px 0;
			line-height: 45px;
		}
		img {
			width: 100%;
		}
	}
</style>