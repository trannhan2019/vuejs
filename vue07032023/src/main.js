import { createApp } from "vue";
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

import App from "./App.vue";
import router from "./router";
//import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(createPinia());
app.use(router);
//app.use(vuetify);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
