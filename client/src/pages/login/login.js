import Vue from 'vue'
import app from './login.vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)
Vue.config.productionTip = false

new Vue({
	el: '#app',
	template: '<app/>',
	components: { app }
})
