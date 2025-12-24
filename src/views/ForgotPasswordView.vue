<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const submitted = ref(false)

const handleSubmit = () => {
  // Demo-only: no backend in this project.
  submitted.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full">
      <div class="mb-8">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <font-awesome-icon icon="leaf" />
          </div>
          <span class="font-bold text-xl text-primary tracking-tight">HEALTHY CARE</span>
        </RouterLink>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Forgot password</h1>
        <p class="text-gray-600 mb-8">Enter your email and we’ll send you reset instructions.</p>

        <div v-if="submitted" class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
          If an account exists for <span class="font-semibold">{{ email }}</span>, reset instructions will be sent.
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg bg-primary text-white hover:bg-green-600"
          >
            Send reset link
          </button>

          <div class="text-center">
            <RouterLink to="/login" class="text-primary hover:text-green-600 font-semibold">
              Back to login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


