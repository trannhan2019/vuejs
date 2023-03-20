<script setup>
import { ref, onMounted } from "vue";
import ChatItem from "./components/ChatItem.vue";
import privateClient from "../../../api/client/private.client";
import Echo from "laravel-echo";
import { echoCredentials } from "../../../config/laravel.echo.server";
import { useAuth } from "../../../stores/auth";
import { useRouter } from "vue-router";
import userApi from "../../../api/modules/user.api";

const authStore = useAuth();
const router = useRouter();

const message = ref("");
const list_messages = ref([]);
const usersOnline = ref(0);

const sendMessage = async () => {
  try {
    const response = await privateClient.post("/messages", {
      message: message.value,
    });
    list_messages.value.push(response.message);
    message.value = "";
  } catch (error) {
    console.log(error);
  }
};

const loadMessage = async () => {
  try {
    const response = await privateClient.get("/messages");
    // console.log(response);
    list_messages.value = response;
  } catch (error) {
    console.log(error);
  }
};

const getUsersOnline = async () => {
  try {
    const response = await privateClient.get(
      `${window.location.protocol}//${window.location.hostname}:6001/app/${echoCredentials.appId}/channels/laravel_database_chatroom?auth_key=${echoCredentials.key}`
    );
    // const response = await privateClient.get(
    //   `${window.location.protocol}//${window.location.hostname}:6001/app/${echoCredentials.appId}/channels/laravel_database_chatroom/users`
    // );
    usersOnline.value = response.subscription_count;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const handleLogout = async () => {
  const { response, err } = await userApi.logout();
  if (response) {
    authStore.setUser(null);
    toast.success("Sign Out success");
    router.push("/login");
  }
  if (err) {
    toast.error(err.data ? err.data.message : err.message);
  }
};

const echo = new Echo({
  broadcaster: "socket.io",
  host: window.location.hostname + ":6001",
});

onMounted(() => {
  loadMessage();

  echo.channel("laravel_database_chatroom").listen("MessagePosted", (data) => {
    // console.log(data);
    let message = data.message;
    message.user = data.user;
    list_messages.value.push(message);
  });

  setInterval(() => {
    getUsersOnline(); // lấy số users online mỗi 3 giây (tuỳ chỉnh theo ý muốn)
  }, 3000);
});
</script>

<template>
  <div>
    <div class="users-online">
      <button type="button" class="btn btn-primary">
        Users online: <span class="badge badge-light">{{ usersOnline }}</span>
      </button>
    </div>
    <div class="btn-logout">
      <button @click="handleLogout" class="btn btn-danger">Logout</button>
    </div>
    <div class="chat">
      <div class="chat-title">
        <h1>Chatroom</h1>
      </div>
      <div class="messages">
        <div class="messages-content">
          <ChatItem
            v-for="(message, index) in list_messages"
            :key="index"
            :message="message"
          ></ChatItem>
        </div>
      </div>
      <div class="message-box">
        <textarea
          v-model="message"
          @keyup.enter="sendMessage"
          type="text"
          class="message-input textarea"
          placeholder="Type message..."
        ></textarea>
        <button type="button" @click="sendMessage" class="message-submit btn">
          Send
        </button>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<style scoped lang="scss">
.users-online {
  position: absolute;
  top: 20px;
  left: 50px;
  z-index: 3;
}
.btn-logout {
  position: absolute;
  top: 20px;
  right: 50px;
  z-index: 3;
}
.messages {
  height: 80%;
  overflow-y: scroll;
  padding: 0 20px;
}
/*--------------------
Body
--------------------*/
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: url("https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925")
    no-repeat 0 0;
  filter: blur(80px);
  transform: scale(1.2);
}
/*--------------------
Chat
--------------------*/
.chat {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 80vh;
  max-height: 700px;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
/*--------------------
Chat Title
--------------------*/
.chat-title {
  flex: 0 1 45px;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  text-transform: uppercase;
  text-align: left;
  padding: 10px 10px 10px 50px;

  h1,
  h2 {
    font-weight: normal;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  h2 {
    color: rgba(255, 255, 255, 0.5);
    font-size: 8px;
    letter-spacing: 1px;
  }

  .avatar {
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 9px;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);
    img {
      width: 100%;
      height: auto;
    }
  }
}
/*--------------------
Message Box
--------------------*/
.message-box {
  flex: 0 1 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  position: relative;

  & .message-input {
    background: none;
    border: none;
    outline: none !important;
    resize: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    height: 17px;
    margin: 0;
    padding-right: 20px;
    width: 265px;
  }
  textarea:focus:-webkit-placeholder {
    color: transparent;
  }

  & .message-submit {
    position: absolute;
    z-index: 1;
    top: 9px;
    right: 10px;
    color: #fff;
    border: none;
    background: #248a52;
    font-size: 10px;
    text-transform: uppercase;
    line-height: 1;
    padding: 6px 10px;
    border-radius: 10px;
    outline: none !important;
    transition: background 0.2s ease;
    &:hover {
      background: #1d7745;
    }
  }
}
</style>
