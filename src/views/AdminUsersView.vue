<template>
  <div class="flex h-screen bg-[#f8fcfb]">
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-[#052b1b] text-white flex flex-col transition-all duration-300 animate-slide-in-left">
      <router-link to="/" class="p-6 flex items-center gap-3 hover:opacity-90 transition-opacity">
        <div class="w-10 h-10 rounded-xl bg-[#00c288] flex items-center justify-center shadow-lg shadow-[#00c288]/20">
          <font-awesome-icon icon="leaf" class="text-white text-xl" />
        </div>
        <span class="font-bold text-xl tracking-tight">HealthyAdmin</span>
      </router-link>

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
          <h1 class="text-2xl font-bold text-gray-900">Users Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage all registered users and their profiles</p>
        </div>
        <button @click="showAddUserModal = true" class="px-6 py-3 bg-[#00c288] text-white rounded-xl font-semibold hover:bg-[#00a872] transition-colors shadow-lg shadow-[#00c288]/20 flex items-center gap-2">
          <font-awesome-icon icon="user-plus" />
          Add New User
        </button>
      </header>

      <!-- Stats Cards -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in userStats" :key="index" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start animate-slide-up" :style="{ animationDelay: `${index * 100}ms` }">
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
            placeholder="Search users by name or email..." 
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

      <!-- Users Table -->
      <div class="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden animate-slide-up" style="animation-delay: 500ms">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-50">
              <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
              <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
              <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Goal</th>
              <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
              <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
              <th class="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors duration-200">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <img :src="user.avatar" class="w-10 h-10 rounded-full border-2 border-white shadow-sm" :alt="user.name" />
                  <span class="font-bold text-gray-800">{{ user.name }}</span>
                </div>
              </td>
              <td class="px-8 py-6 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-8 py-6">
                <span :class="[
                  'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter',
                  user.goal === 'Weight Loss' ? 'bg-green-50 text-green-600' : 
                  user.goal === 'Weight Gain' ? 'bg-blue-50 text-blue-600' : 
                  'bg-purple-50 text-purple-600'
                ]">
                  {{ user.goal }}
                </span>
              </td>
              <td class="px-8 py-6 text-center">
                <span :class="[
                  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase',
                  user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                ]">
                  <span :class="['w-1.5 h-1.5 rounded-full', user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400']"></span>
                  {{ user.status }}
                </span>
              </td>
              <td class="px-8 py-6 text-xs text-gray-400 font-medium">{{ user.joined }}</td>
              <td class="px-8 py-6">
                <div class="flex items-center justify-center gap-2">
                  <button class="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors" title="View">
                    <font-awesome-icon icon="eye" class="text-sm" />
                  </button>
                  <button class="p-2 hover:bg-green-50 text-green-500 rounded-lg transition-colors" title="Edit">
                    <font-awesome-icon icon="edit" class="text-sm" />
                  </button>
                  <button class="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors" title="Delete">
                    <font-awesome-icon icon="trash" class="text-sm" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useAdminData } from '../composables/useAdminData'

const router = useRouter()
const { logout } = useAuth()
const { getAllUsers, stats } = useAdminData()

const searchQuery = ref('')
const activeFilter = ref('All')
const showAddUserModal = ref(false)
const users = ref([])

const navItems = [
  { label: 'Dashboard', icon: 'th-large', path: '/admin-dashboard' },
  { label: 'Users', icon: 'user-friends', path: '/admin-users' },
  { label: 'Doctors', icon: 'user-md', path: '/admin-doctors' },
  { label: 'Products', icon: 'shopping-bag', path: '/admin-products' }
]

// Dynamic stats
const userStats = computed(() => {
  const s = stats.value
  const newThisWeek = users.value.filter(u => {
    const joined = new Date(u.joined)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return joined > weekAgo
  }).length
  
  return [
    { label: 'Total Users', value: s.totalUsers.toString(), trend: `${s.activeUsers} active`, trendUp: true, icon: 'users', iconColor: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'Active Users', value: s.activeUsers.toString(), trend: `${Math.round((s.activeUsers / s.totalUsers) * 100) || 0}% active rate`, trendUp: true, icon: 'user-check', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'New This Week', value: newThisWeek.toString(), trend: 'Recent signups', trendUp: true, icon: 'user-plus', iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
    { label: 'Inactive', value: (s.totalUsers - s.activeUsers).toString(), trend: 'Not active', trendUp: false, icon: 'user-slash', iconColor: 'text-orange-500', bgColor: 'bg-orange-50' }
  ]
})

const filters = ['All', 'Active', 'Inactive', 'New']

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = activeFilter.value === 'All' || 
                         (activeFilter.value === 'Active' && user.status === 'Active') ||
                         (activeFilter.value === 'Inactive' && user.status === 'Inactive') ||
                         (activeFilter.value === 'New' && isNewUser(user))
    return matchesSearch && matchesFilter
  })
})

const isNewUser = (user) => {
  const joined = new Date(user.joined)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return joined > weekAgo
}

const loadUsers = () => {
  users.value = getAllUsers()
}

onMounted(() => {
  loadUsers()
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
