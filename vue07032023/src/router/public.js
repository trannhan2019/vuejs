import HomeView from "../views/public/HomeView.vue";
import AboutView from "../views/public/AboutView.vue";

const publicRoutes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

export default publicRoutes;
