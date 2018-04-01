'use strit';
import Vue from 'vue'
import app from './cdn.vue'
import vueResource from 'vue-resource'
import resource from '@/common/resource-common.js'
import common from '@/common/common.js';

Vue.config.productionTip = false

new Vue({
	el: '#app',
	template: '<app/>',
	components: { app }
})
