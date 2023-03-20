<script setup>
import { useField, useForm } from "vee-validate"
import * as yup from "yup";
import { useAuth } from "../stores/auth";
import userApi from "../api/modules/user.api";
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";

const authStore = useAuth();
const router = useRouter()

const { handleSubmit, errors, setErrors } = useForm({
   initialValues: {
      email: '', password: ''
   },
   initialTouched: { email: true, password: false },
   validationSchema: yup.object({
      email: yup.string().email().required().label("E-mail"),
      password: yup.string().min(6).required().label("Password"),
   })
})
const onSubmit = handleSubmit(async (values) => {
   // console.log(values);
   const { response, err } = await userApi.login(values);
   if (response) {
      authStore.setUser(response)
      toast.success("Sign In success");
      router.push("/")
   }
   if (err) {
      if (err.status_code === 422) {
         console.log(err.error);
         setErrors(err.error);
      } else {
         toast.error(err.data ? err.data.message : err.message);
      }
   }
   // await authStore.handleLogin(values)
   // setErrors(authStore.errors)
   // console.log(authStore.errors.email);
});

const { value: email } = useField("email");
const { value: password } = useField("password");
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
                  style="background-image: url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"></div>
               <!-- Col -->
               <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
                  <form @submit="onSubmit" class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                     <div class="mb-4">
                        <label class="block mb-2 text-sm font-bold text-gray-700">
                           Username
                        </label>
                        <input v-model="email" :class="errors.email && 'input-error'"
                           class="input input-sm input-bordered w-full focus:outline-none" type="email"
                           placeholder="Username" />
                        <p v-if="errors.email" class="text-xs my-1 italic text-red-500">{{ errors.email }}</p>
                     </div>
                     <div class="mb-4">
                        <label class="block mb-2 text-sm font-bold text-gray-700">
                           Password
                        </label>
                        <input v-model="password" :class="errors.password && 'input-error'"
                           class="input input-sm input-bordered w-full focus:outline-none" type="password"
                           placeholder="Username" />
                        <p v-if="errors.password" class="text-xs my-1 italic text-red-500">{{ errors.password }}</p>

                     </div>
                     <div class="mb-4">
                        <input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                        <label class="text-sm" for="checkbox_id">
                           Remember Me
                        </label>
                     </div>
                     <div class="mb-6 text-center">
                        <button
                           class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                           type="submit">
                           Sign In
                        </button>
                     </div>
                     <hr class="mb-6 border-t" />
                     <div class="text-center">
                        <router-link class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                           to="register">
                           Create an Account!
                        </router-link>
                     </div>
                     <div class="text-center">
                        <router-link class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                           to="/forgot">
                           Forgot Password?
                        </router-link>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>