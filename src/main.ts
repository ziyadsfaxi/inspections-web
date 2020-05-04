import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Toasted from "vue-toasted";
import VModal from "vue-js-modal";

const toastOptions = {
  position: "bottom-right",
  duration: 4000,
  keepOnHover: true,
};

Vue.use(Toasted, toastOptions);
Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
