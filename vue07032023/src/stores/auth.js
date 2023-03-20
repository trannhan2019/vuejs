import { defineStore } from "pinia";
import { parse, stringify } from "zipson";

export const useAuth = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    setUser(data) {
      if (data === null) {
        localStorage.removeItem("token");
      } else {
        if (data.token) localStorage.setItem("token", data.token);
      }
      this.authUser = data;
    },
  },
  persist: {
    serializer: {
      deserialize: parse,
      serialize: stringify,
    },
  },
});
