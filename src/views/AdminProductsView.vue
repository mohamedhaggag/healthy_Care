<template>
  <div class="flex h-screen bg-[#f8fcfb]">
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-[#052b1b] text-white flex flex-col transition-all duration-300 animate-slide-in-left">
      <div class="p-6 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#00c288] flex items-center justify-center shadow-lg shadow-[#00c288]/20">
          <font-awesome-icon icon="leaf" class="text-white text-xl" />
        </div>
        <span class="font-bold text-xl tracking-tight">HealthyAdmin</span>
      </div>

      <nav class="flex-1 px-4 mt-6">
        <div class="space-y-2">
          <router-link v-for="item in navItems" :key="item.label"
                  :to="item.path"
                  :class="[
                    'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group',
                    $route.path === item.path ? 'bg-[#00c288] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  ]">
            <div class="flex items-center gap-3">
              <font-awesome-icon :icon="item.icon" class="text-lg w-5" />
              <span class="font-medium text-sm">{{ item.label }}</span>
            </div>
            <div v-if="$route.path === item.path" class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </router-link>
        </div>
      </nav>

      <div class="p-4 mt-auto space-y-2 border-t border-white/5">
        <button class="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
          <font-awesome-icon icon="cog" class="w-5" />
          <span class="text-sm font-medium">Settings</span>
        </button>
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
          <font-awesome-icon icon="sign-out-alt" class="w-5" />
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-8 animate-fade-in">
      <header class="flex justify-between items-center mb-10 animate-fade-in" style="animation-delay: 100ms">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Products Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage all products and inventory</p>
        </div>
        <button class="px-6 py-3 bg-[#00c288] text-white rounded-xl font-semibold hover:bg-[#00a872] transition-colors shadow-lg shadow-[#00c288]/20 flex items-center gap-2">
          <font-awesome-icon icon="plus" />
          Add New Product
        </button>
      </header>

      <!-- Stats Cards -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in stats" :key="index" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start animate-slide-up" :style="{ animationDelay: `${index * 100}ms` }">
          <div>
            <p class="text-[12px] text-gray-500 font-medium mb-1">{{ stat.label }}</p>
            <h3 class="text-2xl font-bold text-gray-900">{{ stat.value }}</h3>
            <p :class="['text-[11px] mt-2 inline-flex items-center gap-1', stat.trendUp ? 'text-green-500' : 'text-orange-500']">
               <font-awesome-icon :icon="stat.trendUp ? 'arrow-up' : 'arrow-down'" />
               {{ stat.trend }}
            </p>
          </div>
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', stat.bgColor]">
            <font-awesome-icon :icon="stat.icon" :class="stat.iconColor" />
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 mb-8 flex items-center justify-between gap-4 animate-slide-up" style="animation-delay: 400ms">
        <div class="relative flex-1 max-w-md">
          <font-awesome-icon icon="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search products by name or category..." 
            class="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#00c288]/20 outline-none text-sm transition-all"
          />
        </div>
        <div class="flex items-center gap-2">
          <button v-for="filter in filters" :key="filter"
                  @click="activeFilter = filter"
                  :class="[
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300',
                    activeFilter === filter ? 'bg-[#00c288] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  ]">
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-4 gap-6 animate-slide-up" style="animation-delay: 500ms">
        <div v-for="product in filteredProducts" :key="product.id" 
             class="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div class="relative h-48 overflow-hidden bg-gray-100">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div :class="['absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase', product.stock > 20 ? 'bg-green-500 text-white' : product.stock > 0 ? 'bg-orange-500 text-white' : 'bg-red-500 text-white']">
              {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
            </div>
            <div v-if="product.discount" class="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-bold">
              -{{ product.discount }}%
            </div>
          </div>
          
          <div class="p-5">
            <div class="mb-3">
              <span class="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{{ product.category }}</span>
              <h3 class="text-sm font-bold text-gray-900 mt-1 line-clamp-2">{{ product.name }}</h3>
            </div>
            
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-lg font-bold text-[#00c288]">${{ product.price }}</p>
                <p v-if="product.originalPrice" class="text-xs text-gray-400 line-through">${{ product.originalPrice }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500">Stock</p>
                <p class="text-sm font-bold text-gray-900">{{ product.stock }}</p>
              </div>
            </div>

            <div class="flex items-center gap-1 mb-4">
              <font-awesome-icon v-for="i in 5" :key="i" :icon="i <= product.rating ? 'star' : 'star'" :class="i <= product.rating ? 'text-yellow-500' : 'text-gray-300'" class="text-xs" />
              <span class="text-xs text-gray-500 ml-1">({{ product.reviews }})</span>
            </div>

            <div class="flex gap-2">
              <button class="flex-1 py-2 bg-[#00c288] text-white rounded-xl text-xs font-semibold hover:bg-[#00a872] transition-colors">
                Edit
              </button>
              <button class="p-2 border border-gray-200 rounded-xl hover:bg-red-50 transition-colors">
                <font-awesome-icon icon="trash" class="text-red-500 text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const searchQuery = ref('')
const activeFilter = ref('All')

const navItems = [
  { label: 'Dashboard', icon: 'th-large', path: '/admin-dashboard' },
  { label: 'Users', icon: 'user-friends', path: '/admin-users' },
  { label: 'Doctors', icon: 'user-md', path: '/admin-doctors' },
  { label: 'Products', icon: 'shopping-bag', path: '/admin-products' }
]

const stats = [
  { label: 'Total Products', value: '1,238', trend: '45 new this month', trendUp: true, icon: 'box', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { label: 'In Stock', value: '1,089', trend: '88% availability', trendUp: true, icon: 'check-circle', iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { label: 'Low Stock', value: '87', trend: 'Need restock', trendUp: false, icon: 'exclamation-triangle', iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { label: 'Revenue', value: '$48.2K', trend: '23% this month', trendUp: true, icon: 'dollar-sign', iconColor: 'text-purple-500', bgColor: 'bg-purple-50' }
]

const filters = ['All', 'Supplements', 'Equipment', 'Nutrition', 'Accessories']

const products = ref([
  { id: 1, name: 'Organic Whey Protein Powder', category: 'Supplements', price: 49.99, originalPrice: 59.99, discount: 17, stock: 145, rating: 5, reviews: 234, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=300&fit=crop' },
  { id: 2, name: 'Vitamin D3 5000 IU', category: 'Supplements', price: 24.99, stock: 89, rating: 5, reviews: 156, image: 'https://images.unsplash.com/photo-1550572017-4814c5c7e0c4?w=400&h=300&fit=crop' },
  { id: 3, name: 'Resistance Bands Set', category: 'Equipment', price: 29.99, originalPrice: 39.99, discount: 25, stock: 67, rating: 4, reviews: 98, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop' },
  { id: 4, name: 'Yoga Mat Premium', category: 'Equipment', price: 39.99, stock: 123, rating: 5, reviews: 187, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop' },
  { id: 5, name: 'Omega-3 Fish Oil', category: 'Supplements', price: 34.99, stock: 0, rating: 5, reviews: 276, image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop' },
  { id: 6, name: 'Meal Prep Containers', category: 'Accessories', price: 19.99, stock: 234, rating: 4, reviews: 145, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop' },
  { id: 7, name: 'Protein Bars Box (12)', category: 'Nutrition', price: 27.99, originalPrice: 32.99, discount: 15, stock: 178, rating: 4, reviews: 203, image: 'https://images.unsplash.com/photo-1604480132715-bd70f4d3a0b5?w=400&h=300&fit=crop' },
  { id: 8, name: 'Shaker Bottle', category: 'Accessories', price: 12.99, stock: 15, rating: 5, reviews: 89, image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=300&fit=crop' }
])

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = activeFilter.value === 'All' || product.category === activeFilter.value
    return matchesSearch && matchesFilter
  })
})

const handleLogout = () => {
    logout()
    router.push('/login')
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-100%); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
