<script setup>
import { useField, useForm } from "vee-validate"
import * as yup from "yup";
import userApi from "../api/modules/user.api";
import { toast } from 'vue3-toastify';

const { handleSubmit, errors, setErrors } = useForm({
   initialValues: {
      name: '', email: '', password: '', password_confirmation: ''
   },
   validationSchema: yup.object({
      name: yup.string().min(6).required().label('Your Name'),
      email: yup.string().email().required().label("E-mail"),
      password: yup.string().min(6).required().label("Password"),
      password_confirmation: yup.string().oneOf([yup.ref("password")], "confirmPassword not match")
         .min(6, "confirmPassword minimum 6 characters")
         .required("confirmPassword is required"),
   })
})
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

const { value: name } = useField("name");
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
               <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                  style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"></div>
               <!-- Col -->
               <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
                  <form @submit="onSubmit" class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                     <div class="mb-4">
                        <label class="block mb-2 text-sm font-bold text-gray-700">
                           Your Name
                        </label>
                        <input :class="errors.name && 'border-red-500'" v-model="name"
                           class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                           type="text" placeholder="Your Name" />
                        <p v-if="errors.name" class="text-xs my-1 italic text-red-500">{{ errors.name }}</p>
                     </div>
                     <div class="mb-4">
                        <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                           Email
                        </label>
                        <input :class="errors.email && 'border-red-500'" v-model="email"
                           class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                           id="email" type="email" placeholder="Email" />
                        <p v-if="errors.email" class="text-xs my-1 italic text-red-500">{{ errors.email }}</p>
                     </div>
                     <div class="mb-4 md:flex md:justify-between">
                        <div class="mb-4 md:mr-2 md:mb-0">
                           <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                              Password
                           </label>
                           <input :class="errors.password && 'border-red-500'" v-model="password"
                              class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              id="password" type="password" />
                           <p v-if="errors.password" class="text-xs italic text-red-500">{{ errors.password }}</p>
                        </div>
                        <div class="md:ml-2">
                           <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                              Confirm Password
                           </label>
                           <input :class="errors.password_confirmation && 'border-red-500'" v-model="password_confirmation"
                              class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                              id="c_password" type="password" />
                           <p v-if="errors.password_confirmation" class="text-xs italic text-red-500">{{
                              errors.password_confirmation }}</p>
                        </div>
                     </div>
                     <div class="mb-6 text-center">
                        <button
                           class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                           type="submit">
                           Register Account
                        </button>
                     </div>
                     <hr class="mb-6 border-t" />
                     <div class="text-center">
                        <router-link class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                           to="/forgot">
                           Forgot Password?
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