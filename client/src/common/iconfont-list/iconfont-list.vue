<template>
	<div>
		<table class="table table-striped table-hover" style="text-align: center;">
			<thead>
				<tr>
					<td>序号</td>
					<td>时间</td>
					<td>文件名</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(icon, index) in icon_list" @click="jump(icon.filename)">
						<td>
							<b class="btn">{{index + 1}}</b>
						</td>
						<td>
							<b class="btn btn-link">{{icon.timestamp | date}}</b>
						</td>
						<td>
							<b class="btn btn-link">
								{{icon.filename}}
							</b>
						</td>		
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css';
	import VueRouter from 'vue-router'
	import moment from 'moment';

	export default {
		filters: {
			date: function(t){
				return moment(t).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		data() {
			return {
				icon_list: [],
			}
		},
		methods: {
			jump: function(filename){
				var router = this.$router;
				var path = '/icons/' + filename
				router.push({path: path});
			}
		},
		computed: {
			routerName: function(){
				return this.$route.name;
			}
		},
		created: function(){
			var self = this;
			this.$http.get('/iconfont/all').then(function(data){
				var d = data.data;
				if(d.code == 200){
					self.icon_list = d.data;
				}
			})
		}
	}
</script>

<style lang='scss'>
	@import '../../style/var.scss';
	@import './iconfont-list.scss';
</style>