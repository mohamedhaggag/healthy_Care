<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCart } from '../composables/useCart'
import { useOrders } from '../composables/useOrders'

const router = useRouter()
const { user, isAuthenticated } = useAuth()
const { cartItemsCount, wishlistCount, loadCurrentUserData } = useCart()
const { orders, formatDate, loadCurrentUserOrders } = useOrders()

// Redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  } else {
    // Ensure user's cart and wishlist are loaded
    loadCurrentUserData()
    // Load user's orders
    loadCurrentUserOrders()
  }
})

// User stats
const dailyStats = ref({
  calories: { current: 1200, target: 2000, percentage: 60 },
  protein: { current: 80, target: 120, percentage: 67 },
  carbs: { current: 150, target: 250, percentage: 60 },
  fats: { current: 40, target: 65, percentage: 62 }
})

// Activity data for chart
const activityData = ref([
  { day: 'Mon', calories: 1800 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1900 },
  { day: 'Thu', calories: 2200 },
  { day: 'Fri', calories: 2000 },
  { day: 'Sat', calories: 2400 },
  { day: 'Sun', calories: 2100 }
])

const maxCalories = computed(() => {
  return Math.max(...activityData.value.map(d => d.calories))
})

const getBarHeight = (calories) => {
  return (calories / maxCalories.value) * 100
}
</script>

<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- Profile Picture -->
          <div class="relative">
            <div class="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-bold">
              {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <div class="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              Premium
            </div>
          </div>
          
          <!-- User Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-dark mb-2">{{ user?.fullName || user?.name || 'User' }}</h1>
            <p class="text-gray-600 mb-4">{{ user?.email }}</p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <div class="flex items-center gap-2 text-gray-600">
                <font-awesome-icon icon="bag-shopping" />
                <span>{{ cartItemsCount }} items in cart</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <font-awesome-icon icon="heart" />
                <span>{{ wishlistCount }} wishlist items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="(stat, key) in dailyStats" 
          :key="key"
          class="bg-white rounded-2xl shadow-lg p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-600 font-medium capitalize">{{ key }}</h3>
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <font-awesome-icon 
                :icon="key === 'calories' ? 'fire' : key === 'protein' ? 'drumstick-bite' : key === 'carbs' ? 'bread-slice' : 'oil-can'"
                class="text-primary"
              />
            </div>
          </div>
          
          <!-- Circular Progress -->
          <div class="relative w-24 h-24 mx-auto mb-4">
            <svg class="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                stroke-width="8"
                fill="none"
                class="text-gray-200"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                stroke-width="8"
                fill="none"
                stroke-dasharray="251.2"
                :stroke-dashoffset="251.2 - (251.2 * stat.percentage / 100)"
                class="text-primary transition-all duration-500"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold text-dark">{{ stat.percentage }}%</span>
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-sm text-gray-600">
              {{ stat.current }} / {{ stat.target }}
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Chart -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-dark mb-6">Weekly Activity</h2>
        <div class="flex items-end justify-between gap-2 h-64">
          <div 
            v-for="(data, index) in activityData" 
            :key="index"
            class="flex-1 flex flex-col items-center gap-2"
          >
            <div class="relative w-full flex items-end justify-center" style="height: 200px;">
              <div 
                class="w-full bg-primary rounded-t-lg hover:bg-green-600 transition-colors cursor-pointer"
                :style="{ height: `${getBarHeight(data.calories)}%` }"
                :title="`${data.day}: ${data.calories} calories`"
              ></div>
            </div>
            <span class="text-sm text-gray-600 font-medium">{{ data.day }}</span>
            <span class="text-xs text-gray-500">{{ data.calories }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <router-link 
          to="/wishlist"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <font-awesome-icon icon="heart" class="text-red-500 text-2xl" />
            </div>
            <div>
              <h3 class="font-bold text-dark text-lg">Wishlist</h3>
              <p class="text-gray-600 text-sm">{{ wishlistCount }} items</p>
            </div>
          </div>
        </router-link>

        <router-link 
          to="/cart"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <font-awesome-icon icon="bag-shopping" class="text-primary text-2xl" />
            </div>
            <div>
              <h3 class="font-bold text-dark text-lg">Shopping Cart</h3>
              <p class="text-gray-600 text-sm">{{ cartItemsCount }} items</p>
            </div>
          </div>
        </router-link>

        <router-link 
          to="/shop"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <font-awesome-icon icon="store" class="text-green-600 text-2xl" />
            </div>
            <div>
              <h3 class="font-bold text-dark text-lg">Continue Shopping</h3>
              <p class="text-gray-600 text-sm">Browse products</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Order History Section -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold text-dark">Order History</h2>
          <span class="text-gray-600">{{ orders.length }} {{ orders.length === 1 ? 'order' : 'orders' }}</span>
        </div>

        <div v-if="orders.length > 0" class="space-y-4">
          <div 
            v-for="order in orders" 
            :key="order.id"
            class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-dark">Order #{{ order.orderNumber }}</h3>
                  <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {{ order.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">{{ formatDate(order.date) }}</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-primary">${{ order.total.toFixed(2) }}</p>
                <p class="text-sm text-gray-600">{{ order.items.length }} {{ order.items.length === 1 ? 'item' : 'items' }}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div 
                v-for="item in order.items.slice(0, 3)" 
                :key="item.id"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-16 h-16 object-contain rounded"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-dark text-sm truncate">{{ item.name }}</p>
                  <p class="text-xs text-gray-600">Qty: {{ item.quantity }}</p>
                  <p class="text-sm font-semibold text-primary">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
              <div 
                v-if="order.items.length > 3"
                class="flex items-center justify-center p-3 bg-gray-50 rounded-lg"
              >
                <p class="text-sm text-gray-600">+{{ order.items.length - 3 }} more items</p>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-600 mb-1">
                <span class="font-medium">Shipping to:</span> 
                {{ order.shipping.address }}, {{ order.shipping.city }}, {{ order.shipping.zipCode }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <font-awesome-icon icon="box" class="text-gray-400 text-4xl" />
          </div>
          <h3 class="text-xl font-bold text-dark mb-2">No orders yet</h3>
          <p class="text-gray-600 mb-6">Start shopping to see your order history here</p>
          <router-link 
            to="/shop"
            class="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Browse Products
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

