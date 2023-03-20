<script setup>
//import {  VCard} from "vuetify/components";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useAuth } from "../stores/auth";
import userApi from "../api/modules/user.api";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";

const authStore = useAuth();
const router = useRouter();

const { handleSubmit, setErrors } = useForm({
  initialValues: {
    email: "",
    password: "",
  },
  initialTouched: { email: true, password: false },
  validationSchema: yup.object({
    email: yup.string().email().required().label("E-mail"),
    password: yup.string().min(6).required().label("Password"),
  }),
});

const email = useField("email");
const password = useField("password");

const onSubmit = handleSubmit(async (values) => {
  const { response, err } = await userApi.login(values);
  if (response) {
    authStore.setUser(response);
    toast.success("Sign In success");
    router.push("/");
  }
  if (err) {
    if (err.status_code === 422) {
      console.log(err.error);
      setErrors(err.error);
    } else {
      toast.error(err.data ? err.data.message : err.message);
    }
  }
});
</script>

<template>
  <AuthLayout>
    <VRow>
      <VCol xs="0" md="6" lg="5">
        <VSheet class="h-100 bg-img" rounded> </VSheet>
      </VCol>
      <VCol cols="12" md="6" lg="7" class="pa-lg-10">
        <VSheet class="pa-5" rounded>
          <h3 class="text-h3 text-center mt-12 mb-5">Welcome Back!</h3>
          <VForm @submit.prevent="onSubmit">
            <VTextField
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="Full Name"
              color="blue"
              variant="underlined"
            />
            <VTextField
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              label="Your Password"
              color="blue"
              variant="underlined"
              type="password"
            />
            <VCheckbox label="Remember Me" color="primary" />
            <VBtn type="submit" rounded="pill" color="blue" block>
              Sign In
            </VBtn>
            <VDivider class="mt-8" />
            <VHover>
              <template v-slot:default="{ isHovering, props }">
                <div class="text-center mt-8">
                  <RouterLink
                    v-bind="props"
                    class="text-subtitle-1 text-decoration-none text-blue-lighten-1"
                    :class="isHovering && 'text-blue-darken-4'"
                    to="/register"
                    >Create an Account!
                  </RouterLink>
                </div>
              </template>
            </VHover>

            <VHover>
              <template v-slot:default="{ isHovering, props }">
                <div class="text-center">
                  <RouterLink
                    v-bind="props"
                    class="text-subtitle-1 text-decoration-none text-blue-lighten-1"
                    :class="isHovering && 'text-blue-darken-4'"
                    to="/forgot"
                    >Forgot Password?
                  </RouterLink>
                </div>
              </template>
            </VHover>
          </VForm>
        </VSheet>
      </VCol>
    </VRow>
  </AuthLayout>
</template>
<style scoped>
.bg-img {
  background-image: url("https://source.unsplash.com/K4mSJ7kc0As/600x800");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  object-fit: cover;
}
</style>
