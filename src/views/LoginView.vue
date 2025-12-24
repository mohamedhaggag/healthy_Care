<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  errorMessage.value = ''
  isLoading.value = true

  // Simulate API call delay
  setTimeout(() => {
    const authData = login(email.value, password.value, rememberMe.value)
    
    if (authData.isAdmin) {
      router.push('/admin-dashboard')
    } else if (authData.isDoctor) {
      router.push('/doctor-dashboard')
    } else {
      // For general users or local registered users
      router.push('/')
    }
  }, 500)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl w-full">
      <!-- Logo -->
      <div class="mb-8">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <font-awesome-icon icon="leaf" />
          </div>
          <span class="font-bold text-xl text-primary tracking-tight">HEALTHY CARE</span>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Left Side - Image -->
        <div class="hidden lg:block relative h-[600px] rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2128&auto=format&fit=crop" 
            alt="Man running in a green field" 
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Right Side - Login Form -->
        <div class="w-full">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p class="text-gray-600 mb-8">Reconnect and continue improving your health</p>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Error Message -->
              <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {{ errorMessage }}
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email or Username</label>
                <input
                  id="email"
                  v-model="email"
                  type="text"
                  required
                  :disabled="isLoading"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your email or username"
                />
              </div>

              <!-- Password Field -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  :disabled="isLoading"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <RouterLink to="/forgot-password" class="text-sm text-primary hover:text-green-600 font-medium">
                  Forgot password?
                </RouterLink>
              </div>

              <!-- Login Button -->
              <button
                type="submit"
                :disabled="isLoading"
                :class="[
                  'w-full py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg',
                  isLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-green-600'
                ]"
              >
                <span v-if="isLoading">Logging in...</span>
                <span v-else>Login</span>
              </button>

              <!-- Divider -->
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <!-- Sign Up Link -->
              <div class="text-center">
                <span class="text-gray-600">Don't have an account? </span>
                <RouterLink to="/signup" class="text-primary hover:text-green-600 font-semibold">
                  Sign up
                </RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

