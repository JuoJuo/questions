import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import QA from './components/QA.vue'
import Manage from './components/Manage.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(ElementUI);

const routes = [
  { path: '/', component: QA },
  { path: '/9992901a-31a3-4065-bdd3-894e6aa61600', component: Manage }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
