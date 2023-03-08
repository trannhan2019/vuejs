<script setup>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import AuthLayout from "../layouts/AuthLayout.vue";

const schema = yup.object({
    name: yup.string().min(5).required().label("Your Name"),
    email: yup.string().email().required().label("E-mail"),
    password: yup.string().min(6).required().label("Password"),
    confirm_password: yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
const { handleSubmit } = useForm({ validationSchema: schema });
const onSubmit = handleSubmit(async (values) => {
    console.log(values);
});

const { value: name, errorMessage: nameErr } = useField("name");
const { value: email, errorMessage: emailErr } = useField("email");
const { value: password, errorMessage: passwordErr } = useField("password");
const { value: confirm_password, errorMessage: confirmpasswordErr } = useField("confirm_password");
</script>

<template>
    <AuthLayout>
        <div class="card mb-3">
            <div class="card-body">
                <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                    <p class="text-center small">
                        Enter your personal details to create account
                    </p>
                </div>

                <form class="row g-3 needs-validation" novalidate @submit="onSubmit">
                    <div class="col-12">
                        <label for="yourName" class="form-label">Your Name</label>
                        <input v-model="name" type="text" name="name" class="form-control"
                            :class="nameErr ? `is-invalid` : `is-valid`" required />
                        <div class="invalid-feedback">{{ nameErr }}</div>
                    </div>

                    <div class="col-12">
                        <label for="yourEmail" class="form-label">Your Email</label>
                        <input v-model="email" type="email" name="email" class="form-control" id="yourEmail" required
                            :class="emailErr ? `is-invalid` : `is-valid`" />
                        <div class="invalid-feedback">
                            {{ emailErr }}
                        </div>
                    </div>


                    <div class="col-12">
                        <label class="form-label">Password</label>
                        <input v-model="password" type="password" name="password" class="form-control" required
                            :class="passwordErr ? `is-invalid` : `is-valid`" />
                        <div class="invalid-feedback">{{ passwordErr }}</div>
                    </div>

                    <div class="col-12">
                        <label class="form-label">Re - Password</label>
                        <input v-model="confirm_password" type="password" name="password" class="form-control" required
                            :class="confirmpasswordErr ? `is-invalid` : `is-valid`" />
                        <div class="invalid-feedback">{{ confirmpasswordErr }}</div>
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms"
                                required />
                            <label class="form-check-label" for="acceptTerms">I agree and accept the
                                <a href="#">terms and conditions</a></label>
                            <div class="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">
                            Create Account
                        </button>
                    </div>
                    <div class="col-12">
                        <p class="small mb-0">
                            Already have an account?
                            <router-link to="/login">Log in</router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </AuthLayout>
</template>
