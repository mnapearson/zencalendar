import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { auth } from "@/firebase";

Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
  store.commit("SET_USER", user);
  if (user) {
    store.dispatch("bindEvents");
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
