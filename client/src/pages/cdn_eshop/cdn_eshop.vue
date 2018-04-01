<template>
	<div class="main">
		<h1>礼品商城 cdn替换</h1>
		<div class="br"></div>
		<a 	:href="eshopHtml"
			download 
			class="btn btn-primary download">下载html</a>

		<div class="br"></div>
		<a :href="eshopHtml" target="_blank"
			class="btn btn-primary ">预览html</a>

		<div class="br"></div>
		<div class="btn btn-info" @click="clearCache" style="margin-bottom: 8px;">清除cdn缓存</div>

		<pre v-if="msg !== ''">{{msg}}</pre>

		<div class="br"></div>
		<!-- <div class="btn btn-success" id="fileupload">上传文件</div> -->

		<input id="fileupload" type="file" name="resources">
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				eshopHtml: 'http://res.winbaoxian.com/autoUpload/eshop/a.html',
				msg: '',
				files: ''
			}
		},
		mounted(){
			this.init();
		},
		components: {

		},
		methods: {
			init(){
				$('#fileupload').fileupload({
					url: '/upload/resource',
					formData: {
						prefix: 'eshop',
						// 0 不重命名   1 重命名
						rename: 0
					},
					dataType: 'json',
					done: function(e, data){
						if(e) {
							console.error(e)
						}else{
							console.log('data', data)
						}
					}
				})
			},
			clearCache(){
				var self = this;
				var params = {path: this.eshopHtml};
				this.$http.get('/cdn/clear' , {params}).then(function(res){
					console.log(res);
					self.msg = res.data;
				})
			}
		}
	}
</script>

<style lang='scss'>
	@import './cdn_eshop.scss';
	h1 {
		font-size: 2em;
	}
	.main {
		margin: 100px auto;
		max-width: 800px;
	}
	.br {
		height: 30px;
	}
</style>