import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const authRoutes = [
  { path: "/login", name: "login", component: Login },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

export default authRoutes;
