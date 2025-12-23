<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCart } from '../composables/useCart'
import { getProductById } from '../data/products'

const router = useRouter()
const { isAuthenticated } = useAuth()
const { wishlist, removeFromWishlist, addToCart, loadCurrentUserData } = useCart()

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  } else {
    // Ensure user's wishlist is loaded
    loadCurrentUserData()
  }
})

const handleAddToCart = (item) => {
  const product = getProductById(item.id)
  if (product) {
    addToCart(product, 1)
  }
}

const handleRemove = (productId) => {
  removeFromWishlist(productId)
}
</script>

<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-dark mb-2">My Wishlist</h1>
        <p class="text-gray-600">{{ wishlist.length }} items in your wishlist</p>
      </div>

      <!-- Wishlist Items -->
      <div v-if="wishlist.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="item in wishlist" 
          :key="item.id"
          class="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all duration-300 relative group"
        >
          <!-- Remove Button -->
          <button 
            @click="handleRemove(item.id)"
            class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10"
          >
            <font-awesome-icon icon="trash" />
          </button>

          <!-- Discount Badge -->
          <div 
            v-if="item.discount" 
            class="absolute top-4 left-4 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded z-10"
          >
            SAVE {{ item.discount }}%
          </div>

          <!-- Image -->
          <div 
            class="h-48 flex items-center justify-center mb-4 overflow-hidden cursor-pointer"
            @click="router.push(`/product/${item.id}`)"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <!-- Content -->
          <div>
            <h3 
              class="font-medium text-dark group-hover:text-green-600 transition-colors mb-2 cursor-pointer"
              @click="router.push(`/product/${item.id}`)"
            >
              {{ item.name }}
            </h3>
            <div class="flex justify-between items-end mb-4">
              <div>
                <div class="font-bold text-dark flex items-center gap-2">
                  ${{ item.price.toFixed(2) }}
                  <span 
                    v-if="item.oldPrice" 
                    class="text-xs text-gray-400 line-through font-normal"
                  >
                    ${{ item.oldPrice.toFixed(2) }}
                  </span>
                </div>
                <div class="flex text-yellow-400 text-[10px] mt-1">
                  <font-awesome-icon 
                    v-for="n in 5" 
                    :key="n" 
                    icon="star"
                    :class="n > (item.rating || 5) ? 'opacity-30' : ''"
                  />
                </div>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button 
              @click="handleAddToCart(item)"
              class="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <font-awesome-icon icon="bag-shopping" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <font-awesome-icon icon="heart" class="text-gray-400 text-4xl" />
        </div>
        <h2 class="text-2xl font-bold text-dark mb-4">Your wishlist is empty</h2>
        <p class="text-gray-600 mb-6">Start adding items you love to your wishlist!</p>
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

