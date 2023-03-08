import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import privateRoutes from "./private";
import publicRoutes from "./public";

const routes = [...authRoutes, ...privateRoutes, ...publicRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
