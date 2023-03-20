import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import Echo from "laravel-echo";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/style.css";
import "vue3-toastify/dist/index.css";

import App from "./App.vue";
import router from "./router";
// import vuetify from "./plugins/vuetify";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
// app.use(vuetify);

app.mount("#app");

// import "bootstrap/dist/js/bootstrap.js";
