<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { isAuthenticated } = useAuth()

const orderNumber = ref(route.query.orderNumber || `ORD-${Date.now()}`)

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full">
      <div class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <!-- Success Icon -->
        <div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <font-awesome-icon icon="check" class="text-green-600 text-5xl" />
        </div>

        <!-- Success Message -->
        <h1 class="text-4xl font-bold text-dark mb-4">Order Placed Successfully!</h1>
        <p class="text-gray-600 mb-6 text-lg">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>

        <!-- Order Number -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <p class="text-sm text-gray-600 mb-2">Order Number</p>
          <p class="text-2xl font-bold text-primary">{{ orderNumber }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/profile"
            class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            View Orders
          </router-link>
          <router-link 
            to="/shop"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

