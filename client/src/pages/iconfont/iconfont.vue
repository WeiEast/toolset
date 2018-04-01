<template>
	<div class="main">
		<h1 style="display: inline-block;">微易图标库</h1>
		<span v-if="routerName !== 'upload'"><router-link to="/upload">去上传</router-link></span>
		<span v-if="routerName == 'upload'"><router-link to="/">去列表页</router-link></span>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		computed: {
			routerName: function(){
				return this.$route.name;
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../style/var.scss';
	@import './iconfont.scss';
</style>