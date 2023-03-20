<script setup>
import AuthLayout from "../layouts/AuthLayout.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import userApi from "../api/modules/user.api";
import { toast } from "vue3-toastify";

const { handleSubmit, setErrors } = useForm({
  initialValues: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  validationSchema: yup.object({
    name: yup.string().min(6).required().label("Your Name"),
    email: yup.string().email().required().label("E-mail"),
    password: yup.string().min(6).required().label("Password"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "confirmPassword not match")
      .min(6, "confirmPassword minimum 6 characters")
      .required("confirmPassword is required"),
  }),
});

const name = useField("name");
const email = useField("email");
const password = useField("password");
const password_confirmation = useField("password_confirmation");

const onSubmit = handleSubmit(async (values) => {
  const { response, err } = await userApi.register(values);
  if (response) {
    toast.success("Sign In success");
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
    <VRow class="w-100">
      <VCol xs="0" md="6" lg="5">
        <VSheet class="h-100 bg-img" rounded> </VSheet>
      </VCol>
      <VCol cols="12" md="6" lg="7" class="pa-lg-10">
        <VSheet class="pa-5" rounded>
          <h3 class="text-h3 text-center mt-12 mb-5">Create an Account!</h3>
          <VForm @submit.prevent="onSubmit">
            <VTextField
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              label="Full Name"
              color="blue"
              variant="underlined"
            />
            <VTextField
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="Your Email"
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
            <VTextField
              v-model="password_confirmation.value.value"
              :error-messages="password_confirmation.errorMessage.value"
              label="Re Password"
              color="blue"
              variant="underlined"
              type="password"
            />
            <VBtn class="mt-4" type="submit" rounded="pill" color="blue" block>
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
                    to="/login"
                    >Already have an account? Login!
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
<style>
.bg-img {
  background-image: url("https://source.unsplash.com/Mv9hjnEUHR4/600x800");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  object-fit: cover;
}
</style>
