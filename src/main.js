import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VuetifyDialog from 'vuetify-dialog';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify-dialog/dist/vuetify-dialog.css';

Vue.config.productionTip = false;

Vue.use(VuetifyDialog, {
	context: {
		vuetify,
	},
});

//global Parameter
Vue.prototype.$API_SERVER = 'http://101.79.81.183:3000';

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
