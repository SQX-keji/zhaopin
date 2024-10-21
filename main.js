import Vue from 'vue'
import App from './App'

import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'
import homeList from './components/home-list/homeList.vue'
Vue.component('homeList', homeList);
import homeuserList from './components/home-list/homeuserList.vue'
Vue.component('homeuserList', homeuserList);
Vue.config.productionTip = false
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;

Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;



App.mpType = 'app'

// 引入全局uView
import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
    ...App
})

app.$mount()
