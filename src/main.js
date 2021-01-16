import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 请求地址及axios
// import Api from "@/api"



// 样式
import './common/common.less';
import './common/resetElement.less';
import './common/dxsadmin.less';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
