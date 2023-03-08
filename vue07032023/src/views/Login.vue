<script setup>
//import {RouterLink} from "vue-router"
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import AuthLayout from "../layouts/AuthLayout.vue";

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
    <AuthLayout>
        <div class="card mb-3">
            <div class="card-body">
                <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                        Login to Your Account
                    </h5>
                    <p class="text-center small">
                        Enter your username & password to login
                    </p>
                </div>

                <form class="row g-3 needs-validation" @submit="onSubmit" novalidate>
                    <div class="col-12">
                        <label for="yourUsername" class="form-label">Email</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text">@</span>
                            <input v-model="email" type="email" name="name" class="form-control"
                                :class="emailErr ? `is-invalid` : `is-valid`" />
                            <div class="invalid-feedback">{{ emailErr }}</div>
                        </div>
                    </div>

                    <div class="col-12">
                        <label class="form-label">Password</label>
                        <input v-model="password" type="password" name="password" class="form-control"
                            :class="passwordErr ? `is-invalid` : `is-valid`" required />
                        <div class="invalid-feedback">{{ passwordErr }}</div>
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                            <label class="form-check-label" for="rememberMe">Remember me</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                    <div class="col-12">
                        <p class="small mb-0">
                            Don't have account?
                            <router-link to="/register">Create an account</router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </AuthLayout>
</template>
