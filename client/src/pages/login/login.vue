<template>
	<div>
		<h1>create page login</h1>
		<div>
			请输入账号：<input type="text" v-model="tel">
		</div>
		<div>
			请输入密码：<input type="text" v-model="pd">
		</div>
		<button @click="login">登录</button>
		{{msg}}
		<button @click="home">首页</button>
	</div>
</template>

<script>
	export default {
		methods: {
			login: function(){
				var params = {
					mobile: this.tel,
					validateCode: this.pd
				};
				var self = this;
				this.$http.get('/user/login/ajaxSave', {params: params}).then(function(res){
					self.msg = JSON.stringify(res.data);
				}).catch(function(e){
					console.error(e);
				})
			},
			home: function(){
				window.location.href = 'gem.html'
			}
		},
		data(){
			return{
				msg: '',
				tel: '13922222222',
				pd: '0000'
			}
		}
	}
</script>

<style lang='scss'>
	@import './login.scss';
	input {
		border: 1px solid black;
	}
</style>