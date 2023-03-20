import Home from "../views/Home.vue";
import Chat from "../views/private/chat/Chat.vue";

const publicRoutes = [
  { path: "/", name: "home", component: Home },
  { path: "/chat", name: "chat", component: Chat },
];

export default publicRoutes;
