<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { isAuthenticated } = useAuth()
const { cart, removeFromCart, updateQuantity, cartTotal, loadCurrentUserData } = useCart()

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  } else {
    // Ensure user's cart is loaded
    loadCurrentUserData()
  }
})

const handleQuantityChange = (productId, newQuantity) => {
  updateQuantity(productId, parseInt(newQuantity))
}

const proceedToCheckout = () => {
  if (cart.value.length > 0) {
    router.push('/checkout')
  }
}
</script>

<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-dark mb-2">Shopping Cart</h1>
        <p class="text-gray-600">{{ cart.length }} items in your cart</p>
      </div>

      <div v-if="cart.length > 0" class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="bg-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row gap-6"
          >
            <!-- Image -->
            <div class="w-full sm:w-32 h-32 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="h-full object-contain cursor-pointer"
                @click="router.push(`/product/${item.id}`)"
              />
            </div>

            <!-- Details -->
            <div class="flex-1">
              <h3 
                class="font-bold text-dark text-lg mb-2 cursor-pointer hover:text-primary"
                @click="router.push(`/product/${item.id}`)"
              >
                {{ item.name }}
              </h3>
              
              <!-- Quantity Controls -->
              <div class="flex items-center gap-4 mb-4">
                <span class="text-gray-600">Quantity:</span>
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    @click="handleQuantityChange(item.id, item.quantity - 1)"
                    class="px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <font-awesome-icon icon="minus" />
                  </button>
                  <input 
                    type="number" 
                    :value="item.quantity" 
                    @input="handleQuantityChange(item.id, $event.target.value)"
                    min="1"
                    class="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button 
                    @click="handleQuantityChange(item.id, item.quantity + 1)"
                    class="px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <font-awesome-icon icon="plus" />
                  </button>
                </div>
              </div>

              <!-- Price and Remove -->
              <div class="flex items-center justify-between">
                <div class="text-xl font-bold text-primary">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
                <button 
                  @click="removeFromCart(item.id)"
                  class="text-red-500 hover:text-red-600 transition-colors"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
            <h2 class="text-2xl font-bold text-dark mb-6">Order Summary</h2>
            
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${{ (cartTotal * 0.1).toFixed(2) }}</span>
              </div>
              <hr class="border-gray-200" />
              <div class="flex justify-between text-xl font-bold text-dark">
                <span>Total</span>
                <span>${{ (cartTotal + 5 + cartTotal * 0.1).toFixed(2) }}</span>
              </div>
            </div>

            <button 
              @click="proceedToCheckout"
              class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            <router-link 
              to="/shop"
              class="block text-center text-primary hover:text-green-600 font-medium"
            >
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <font-awesome-icon icon="bag-shopping" class="text-gray-400 text-4xl" />
        </div>
        <h2 class="text-2xl font-bold text-dark mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Start adding items to your cart!</p>
        <router-link 
          to="/shop"
          class="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

