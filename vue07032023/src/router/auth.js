// import Login from "../views/Login.vue";
import Login from "../views/Login.vue";
import Login2 from "../views/Login2.vue";
import Register from "../views/Register.vue";
import Forgot from "../views/Forgot.vue";
import Reset from "../views/Reset.vue";

const authRoutes = [
  { path: "/login", name: "login", component: Login },
  { path: "/login2", name: "login2", component: Login2 },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/forgot",
    name: "forgot",
    component: Forgot,
  },
  {
    path: "/reset",
    name: "reset",
    component: Reset,
  },
];

export default authRoutes;
