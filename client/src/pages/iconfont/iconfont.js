'use strit';
import Vue from 'vue'
import app from './iconfont.vue'
import vueResource from 'vue-resource'
import resource from '@/common/resource-common.js'
import VueRouter from 'vue-router'

import iconfontList from '@/common/iconfont-list/iconfont-list.vue';
import icons from '@/common/icons/icons.vue';
import upload from '@/common/upload/upload.vue';

import VueClipboard from 'vue-clipboard';

Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
	{path: '/', component: iconfontList, name: 'list'},
	{path: '/icons/:filename', component: icons, name: 'icons'},
	{path: '/upload', component: upload, name: 'upload'}
]
const router = new VueRouter({routes});

new Vue({
	el: '#app',
	router,
	template: '<app/>',
	components: { app }
})
