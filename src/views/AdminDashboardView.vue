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
          <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your health platform.</p>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative">
            <font-awesome-icon icon="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2.5 bg-white border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-[#00c288]/20 outline-none shadow-sm shadow-gray-100" />
          </div>
          <div class="relative cursor-pointer">
            <font-awesome-icon icon="bell" class="text-gray-400 text-lg" />
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
          </div>
          <div class="flex items-center gap-3 border-l border-gray-200 pl-6">
             <div class="text-right">
                <p class="text-sm font-bold text-gray-900 leading-none">Admin User</p>
                <p class="text-[10px] text-gray-400 mt-1">admin@healthy.com</p>
             </div>
             <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" />
             </div>
          </div>
        </div>
      </header>

      <!-- Stat Cards Grid -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in stats" :key="index" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start animate-slide-up" :style="{ animationDelay: `${index * 100}ms` }">
          <div>
            <p class="text-[12px] text-gray-500 font-medium mb-1">{{ stat.label }}</p>
            <h3 class="text-2xl font-bold text-gray-900">{{ stat.value }}</h3>
            <p :class="['text-[11px] mt-2 inline-flex items-center gap-1', stat.trendUp ? 'text-green-500' : 'text-red-500']">
               <font-awesome-icon :icon="stat.trendUp ? 'arrow-up' : 'arrow-down'" />
               {{ stat.trend }}
            </p>
          </div>
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', stat.bgColor]">
            <font-awesome-icon :icon="stat.icon" :class="stat.iconColor" />
          </div>
        </div>
      </div>

      <!-- Secondary Stats & Revenue -->
      <div class="grid grid-cols-12 gap-6 mb-10">
         <div class="col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start animate-slide-up" style="animation-delay: 400ms">
            <div>
              <p class="text-[12px] text-gray-500 font-medium mb-1">Monthly Revenue</p>
              <h3 class="text-2xl font-bold text-gray-900">$48,294</h3>
              <p class="text-green-500 text-[11px] mt-2 inline-flex items-center gap-1">
                 <font-awesome-icon icon="arrow-up" />
                 18.2% from last month
              </p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <font-awesome-icon icon="dollar-sign" class="text-green-500" />
            </div>
         </div>
         <div class="col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start animate-slide-up" style="animation-delay: 500ms">
             <div>
              <p class="text-[12px] text-gray-500 font-medium mb-1">Active Sessions</p>
              <h3 class="text-2xl font-bold text-gray-900">2,847</h3>
              <p class="text-blue-500 text-[11px] mt-2 inline-flex items-center gap-1 font-medium">
                 Currently online
              </p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <font-awesome-icon icon="chart-line" class="text-blue-500" />
            </div>
         </div>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <!-- Recent Activity -->
        <div class="col-span-8 bg-white rounded-[40px] shadow-sm border border-gray-50 p-8 animate-slide-up" style="animation-delay: 600ms">
            <h2 class="text-lg font-bold text-gray-900 mb-8">Recent Activity</h2>
            <div class="space-y-6">
                <div v-for="(activity, idx) in activities" :key="idx" 
                     class="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded-xl transition-all duration-200 animate-fade-in"
                     :style="{ animationDelay: `${700 + idx * 100}ms` }">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-50">
                            <img :src="activity.avatar" :alt="activity.name" />
                        </div>
                        <div>
                            <p class="text-sm">
                                <span class="font-bold text-gray-800">{{ activity.name }}</span>
                                <span class="text-gray-500 ml-1">{{ activity.action }}</span>
                            </p>
                            <p class="text-[10px] text-gray-400 mt-0.5">{{ activity.time }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="col-span-4 space-y-6 animate-slide-up" style="animation-delay: 700ms">
            <h2 class="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div v-for="action in quickActions" :key="action.label" 
                 class="p-4 rounded-2xl border flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
                 :class="action.borderColor">
                <div :class="['w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110', action.bgColor]">
                    <font-awesome-icon :icon="action.icon" :class="action.iconColor" />
                </div>
                <div>
                    <h4 class="text-sm font-bold text-gray-800">{{ action.label }}</h4>
                    <p class="text-[10px] text-gray-400">{{ action.desc }}</p>
                </div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const activeNav = ref('Dashboard')

const navItems = [
  { label: 'Dashboard', icon: 'th-large', path: '/admin-dashboard' },
  { label: 'Users', icon: 'user-friends', path: '/admin-users' },
  { label: 'Doctors', icon: 'user-md', path: '/admin-doctors' },
  { label: 'Products', icon: 'shopping-bag', path: '/admin-products' }
]

const stats = [
  { label: 'Total Users', value: '12,847', trend: '12.5% from last month', trendUp: true, icon: 'user-friends', iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { label: 'Active Doctors', value: '284', trend: '3 new this week', trendUp: true, icon: 'user-md', iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { label: 'Unread Messages', value: '47', trend: '8 urgent', trendUp: false, icon: 'comment-dots', iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { label: 'Products Sold', value: '1,238', trend: '23.1% from last month', trendUp: true, icon: 'shopping-cart', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' }
]

const activities = [
  { name: 'Dr. Sarah Johnson', action: 'accepted a new patient appointment', time: '2 minutes ago', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { name: 'John Smith', action: 'purchased Vitamin D Supplements', time: '16 minutes ago', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Emily Brown', action: 'sent a message to support', time: '1 hour ago', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Dr. Michael Chen', action: 'updated their availability schedule', time: '2 hours ago', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
  { name: 'Lisa Anderson', action: 'left a 5-star review', time: '3 hours ago', avatar: 'https://randomuser.me/api/portraits/men/88.jpg' }
]

const quickActions = [
  { label: 'Add User', desc: 'Register a new user', icon: 'user-plus', bgColor: 'bg-green-50', iconColor: 'text-green-500', borderColor: 'border-green-100 hover:bg-green-50/30' },
  { label: 'Add Doctor', desc: 'Onboard new doctor', icon: 'stethoscope', bgColor: 'bg-blue-50', iconColor: 'text-blue-500', borderColor: 'border-blue-100 hover:bg-blue-50/30' },
  { label: 'Add Product', desc: 'List new product', icon: 'box-open', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600', borderColor: 'border-yellow-100 hover:bg-yellow-50/30' }
]

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
