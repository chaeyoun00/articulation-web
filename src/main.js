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

Vue.prototype.$API_SERVER = 'http://49.50.172.137:3000';

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
