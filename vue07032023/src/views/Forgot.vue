<script setup>
import { useField, useForm } from "vee-validate"
import * as yup from "yup";
import userApi from "../api/modules/user.api";
import { toast } from 'vue3-toastify';

const { handleSubmit, errors, setErrors, isSubmitting } = useForm({
    initialValues: {
        email: ''
    },
    validationSchema: yup.object({
        email: yup.string().email().required().label("E-mail"),
    })
})
const onSubmit = handleSubmit(async (values) => {
    // console.log(values);
    const { response, err } = await userApi.forgot(values);
    if (response) {
        toast.success("Password send Email success");
        // console.log(response);
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
                            <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
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
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email" type="email" placeholder="Enter Email Address..." />
                                <p v-show="errors.email" class="text-red-500 italic text-xs my-1">{{ errors.email }}</p>
                            </div>
                            <div class="mb-6 text-center">
                                <button
                                    class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                    :class="isSubmitting && 'btn loading'" :disabled="isSubmitting" type="submit">
                                    Reset Password
                                </button>
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