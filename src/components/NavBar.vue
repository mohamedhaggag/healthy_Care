<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { isAuthenticated, user, logout } = useAuth()
const { cartItemsCount, wishlistCount, loadCurrentUserData } = useCart()
const isMenuOpen = ref(false)
const showUserMenu = ref(false)

const links = [
  { name: 'Home', path: '/' },
  { name: 'Plan', path: '/plan' },
  { name: 'Shop', path: '/shop' },
  { name: 'Blog', path: '/blogs' },
]

onMounted(() => {
  // Check auth status on mount and load user's cart/wishlist
  if (typeof window !== 'undefined') {
    const savedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth')
    if (savedAuth) {
      // Auth will be checked by composable
      // Load user's cart and wishlist
      loadCurrentUserData()
    }
  }
})

const handleLogout = () => {
  logout()
  router.push('/')
  showUserMenu.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 w-[85%] mx-auto rounded-full mt-3">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <font-awesome-icon icon="leaf" />
          </div>
          <span class="font-bold text-xl text-dark tracking-tight">HealthyCare</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link v-for="link in links" :key="link.name" :to="link.path" 
             class="text-gray-600 hover:text-primary font-medium transition-colors duration-200">
            {{ link.name }}
          </router-link>
        </div>

        <!-- Auth Buttons / User Menu -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Cart Icon -->
          <RouterLink 
            to="/cart" 
            class="relative p-2 text-gray-600 hover:text-primary transition-colors"
            title="Shopping Cart"
          >
            <font-awesome-icon icon="bag-shopping" class="text-xl" />
            <span 
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            >
              {{ cartItemsCount }}
            </span>
          </RouterLink>

          <!-- Wishlist Icon -->
          <RouterLink 
            to="/wishlist" 
            class="relative p-2 text-gray-600 hover:text-primary transition-colors"
            title="Wishlist"
          >
            <font-awesome-icon icon="heart" class="text-xl" />
            <span 
              v-if="wishlistCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            >
              {{ wishlistCount }}
            </span>
          </RouterLink>

          <!-- User Menu (when logged in) -->
          <div v-if="isAuthenticated" class="relative">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {{ (user?.firstName || user?.name || 'U').charAt(0).toUpperCase() }}
              </div>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
            >
              <RouterLink 
                to="/profile"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <font-awesome-icon icon="user" class="mr-2" />
                My Profile
              </RouterLink>
              <RouterLink 
                to="/wishlist"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <font-awesome-icon icon="heart" class="mr-2" />
                Wishlist
              </RouterLink>
              <RouterLink 
                to="/cart"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <font-awesome-icon icon="bag-shopping" class="mr-2" />
                Cart ({{ cartItemsCount }})
              </RouterLink>
              <hr class="my-2 border-gray-100" />
              <button 
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <font-awesome-icon icon="right-from-bracket" class="mr-2" />
                Logout
              </button>
            </div>
          </div>

          <!-- Login/Signup (when not logged in) -->
          <template v-else>
            <RouterLink to="/login" class="px-5 py-2 text-primary font-medium border border-primary/20 rounded-full hover:bg-primary/5 hover:border-primary transition-all duration-300">
              Log In
            </RouterLink>
            <RouterLink to="/signup" class="px-5 py-2 bg-primary text-white font-medium rounded-full hover:bg-green-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Sign Up
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isMenuOpen = !isMenuOpen" class="text-gray-600 hover:text-primary p-2">
            <font-awesome-icon :icon="isMenuOpen ? 'times' : 'bars'" class="text-xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-white border-b border-gray-100">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a v-for="link in links" :key="link.name" :href="link.href"
           class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50 rounded-md">
          {{ link.name }}
        </a>
        <div v-if="isAuthenticated" class="mt-4 flex flex-col gap-2 px-3">
          <RouterLink to="/profile" class="w-full py-2 text-gray-700 font-medium rounded-lg hover:bg-green-50 text-center">
            My Profile
          </RouterLink>
          <RouterLink to="/cart" class="w-full py-2 text-gray-700 font-medium rounded-lg hover:bg-green-50 text-center">
            Cart ({{ cartItemsCount }})
          </RouterLink>
          <RouterLink to="/wishlist" class="w-full py-2 text-gray-700 font-medium rounded-lg hover:bg-green-50 text-center">
            Wishlist ({{ wishlistCount }})
          </RouterLink>
          <button 
            @click="handleLogout"
            class="w-full py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 text-center"
          >
            Logout
          </button>
        </div>
        <div v-else class="mt-4 flex flex-col gap-2 px-3">
           <RouterLink to="/login" class="w-full py-2 text-primary font-medium border border-primary/20 rounded-lg hover:bg-primary/5 text-center">
            Log In
          </RouterLink>
          <RouterLink to="/signup" class="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-green-600 shadow-sm text-center">
            Sign Up
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
