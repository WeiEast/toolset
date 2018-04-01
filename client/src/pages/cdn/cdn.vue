<template>
	<div class="main">
		<form class="form-horizontal">
			<div class="form-group">
				<input type="text" class="form-control" id="cdncache" placeholder="请输入要清除的cdn缓存地址" v-model="clearUrl">
			</div>
			<div class="form-group" style="text-align: left;" >
				<div class="btn btn-primary" @click="clearCache">确定</div>
			</div>
		</form>
		<pre>
			{{msg}}
		</pre>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';

	export default {
		data(){
			return {
				clearUrl: '',
				msg: '',
			}
		},
		methods: {
			clearCache() {
				var self = this;
				var params = {path: this.clearUrl};
				this.$http.get('/cdn/clear' , {params}).then(function(res){
					console.log(res);
					self.msg = res.data;
				})
			}
		}
	}
</script>

<style lang='scss'>
	@import './cdn.scss';

	.body {
		margin: 200px auto;
	}
	.main {
		margin: 0 auto;
		margin-top: 200px;
		max-width: 800px;
	}
</style>