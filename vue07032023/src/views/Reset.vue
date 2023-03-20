<script setup>
import { useField, useForm } from "vee-validate"
import * as yup from "yup";
import userApi from "../api/modules/user.api";
import { toast } from 'vue3-toastify';
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const { handleSubmit, errors, setErrors, isSubmitting } = useForm({
    initialValues: {
        email: '', password: '', password_confirmation: ''
    },
    validationSchema: yup.object({
        email: yup.string().email().required().label("E-mail"),
        password: yup.string().min(6).required().label("Password"),
        password_confirmation: yup.string().oneOf([yup.ref("password")], "confirmPassword not match")
            .min(6, "confirmPassword minimum 6 characters")
            .required("confirmPassword is required"),
    })
})

// const { token } = useRoute().query
const { token } = route.query
const onSubmit = handleSubmit(async (values) => {
    // console.log(token);
    const { response, err } = await userApi.reset(values, token);
    if (response) {
        toast.success("Sign In success");
        router.push("/login")
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

const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: password_confirmation } = useField("password_confirmation");
</script>

<template>
    <!-- component -->
    <main class="font-mono bg-gray-400">
        <!-- Container -->
        <div class="container mx-auto">
            <div class="flex justify-center px-6 my-12">
                <!-- Row -->
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                    <!-- Col -->
                    <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style="background-image: url('https://source.unsplash.com/oWTW-jNGl9I/600x800')"></div>
                    <!-- Col -->
                    <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <div class="px-8 mb-4 text-center">
                            <h3 class="pt-4 mb-2 text-2xl">Reset Your Password?</h3>
                            <p class="mb-4 text-sm text-gray-700">
                                We get it, stuff happens. Just enter your email address below and we'll send you a
                                link to reset your password!
                            </p>
                        </div>
                        <form @submit="onSubmit" class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                                    Email
                                </label>
                                <input :class="errors.email && 'border-red-500'" v-model="email"
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email" type="email" placeholder="Email" />
                                <p v-if="errors.email" class="text-xs my-1 italic text-red-500">{{ errors.email }}</p>
                            </div>
                            <div class="mb-4">
                                <div class="mb-4 md:mr-2 md:mb-0">
                                    <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                        Password
                                    </label>
                                    <input :class="errors.password && 'border-red-500'" v-model="password"
                                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password" type="password" />
                                    <p v-if="errors.password" class="text-xs italic text-red-500">{{ errors.password }}</p>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="md:ml-2">
                                    <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                        Confirm Password
                                    </label>
                                    <input :class="errors.password_confirmation && 'border-red-500'"
                                        v-model="password_confirmation"
                                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="c_password" type="password" />
                                    <p v-if="errors.password_confirmation" class="text-xs italic text-red-500">{{
                                        errors.password_confirmation }}</p>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="mb-6 text-center">
                                    <button :class="isSubmitting && 'btn loading'" :disabled="isSubmitting"
                                        class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                            <hr class="mb-6 border-t" />
                            <div class="text-center">
                                <router-link class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to="/register">
                                    Create an Account!
                                </router-link>
                            </div>
                            <div class="text-center">
                                <router-link class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to="/login">
                                    Already have an account? Login!
                                </router-link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>