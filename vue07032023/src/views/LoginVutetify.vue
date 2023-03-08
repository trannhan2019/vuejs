<script setup>
//import {  VCard} from "vuetify/components";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

const schema = yup.object({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().min(6).required().label("Password"),
});
const { handleSubmit, handleReset } = useForm({ validationSchema: schema });
const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const { value: email, errorMessage: emailErr } = useField("email");
const { value: password, errorMessage: passwordErr } = useField("password");
</script>

<template>
  <v-container class="h-screen">
    <v-card class="mx-auto mt-10" max-width="500">
      <v-toolbar color="primary">
        <v-toolbar-title class="text-center">Login</v-toolbar-title>
      </v-toolbar>
      <v-form @submit="onSubmit">
        <v-card-item>
          <v-text-field
            variant="underlined"
            label="Your Email"
            type="email"
            v-model="email"
            :error-messages="emailErr"
          />
          <v-text-field
            variant="underlined"
            label="Your Password"
            type="password"
            v-model="password"
            :error="passwordErr"
          />
        </v-card-item>
        <v-card-actions class="justify-space-between">
          <v-btn type="submit" color="primary" variant="tonal" size="large"
            >Login</v-btn
          >
          <RouterLink to="/register">Register</RouterLink>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
