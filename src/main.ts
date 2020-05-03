import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Toasted, { ToastOptions } from "vue-toasted";

const toastOptions = {
  position: "bottom-right",
  duration: 4000,
  keepOnHover: true,
};

Vue.use(Toasted, toastOptions);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
