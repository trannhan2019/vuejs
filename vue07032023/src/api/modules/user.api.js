import publicClient from "../client/public.client";
import privateClient from "../client/private.client";
const userEndpoints = {
  login: "/login",
  register: "/register",
  forgot: "/forgot",
  reset: "/reset",
  logout: "/logout",
  getUser: "/user",
  passwordUpdate: "/update-password",
};

const userApi = {
  login: async ({ email, password }) => {
    try {
      //   console.log("send request");
      const response = await publicClient.post(userEndpoints.login, {
        email,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  register: async ({ name, email, password, password_confirmation }) => {
    // console.log(name);
    try {
      const response = await publicClient.post(userEndpoints.register, {
        name,
        email,
        password,
        password_confirmation,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  forgot: async ({ email }) => {
    try {
      const response = await publicClient.post(userEndpoints.forgot, {
        email,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  reset: async ({ email, password, password_confirmation }, token) => {
    try {
      // console.log(token);
      const response = await publicClient.put(
        `${userEndpoints.reset}/${token}`,
        {
          email,
          password,
          password_confirmation,
        }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  logout: async () => {
    try {
      const response = await privateClient.get(userEndpoints.logout);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
