<template>
	<div>
		<div class="icons-container">
			<div v-for="icon in icons" class="font-box clip" 
				:data-clipboard-text="icontag(icon)" >
				<i class="iconfont" :class="icon"></i>
				<span>{{icon}}</span>
			</div>
		</div>

		<div class="jumbotron" style="padding: 1rem; margin: 1rem 0;">
			<h3>使用说明</h3>
			<ul style="text-align: left;">
				<li>点击下方 <b>复制css地址</b>,将css地址引入到你的html中</li>
				<li>点击要使用的图标将会自动复制 图标代码</li>
			</ul>
		</div>

		<div class="icons-footer" >
			<button class="btn btn-primary clip" :data-clipboard-text="cssLink">复制css地址</button>
		</div>
		<link rel="stylesheet" href="">
	</div>	
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				icons: [],
				stylesheet_path: '',
			}
		},
		computed: {
			cssLink: function(){
				return `<link rel="stylesheet" href="${this.stylesheet_path}">`;
			}
		},
		methods: {
			loadcss: function(css_url){
				var style = document.createElement('link');
				style.rel = 'stylesheet';
				style.type = 'text/css';
				style.href = css_url + '?t=' + new Date();
				document.getElementsByTagName('head')[0].appendChild(style);
			},
			dropDot: function(icon_class){
				return icon_class.replace('.', '');
			},
			icontag: function(icon){
				var tag = `<i class="iconfont ${icon}"></i>`;
				return tag;
			},
			initClip: function(){
				var clip = new Clipboard('.clip');
				clip.on('success', function(e){
					console.log(e.text);
					Toast({message: '复制成功', duration: 1000});
				})
			}
		},
		created: function(){
			this.initClip();
			var filename = this.$route.params.filename;
			var self = this;
			var params = {filename}
			self.$http.get('/iconfont/data', {params: params}).then(function(res){
				var data = res.data;
				if(data && data.code == 200){
					var d = data.data;
					var icons = JSON.parse(d.icon_list);
					for(var i = 0; i < icons.length; i++){
						icons[i] = icons[i].replace('.', '');
					}
					self.icons = icons;
					var url = d.url;

					url = d.url.replace(/^https:|^http:/, '');

					self.stylesheet_path = url + '/' + d.filename;
					self.loadcss(self.stylesheet_path);
				}
			})
		}
	}
</script>

<style lang='scss'>
	@import './icons.scss';
</style>