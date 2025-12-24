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
          <h1 class="text-2xl font-bold text-gray-900">Doctors Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage all registered doctors and their specializations</p>
        </div>
        <button class="px-6 py-3 bg-[#00c288] text-white rounded-xl font-semibold hover:bg-[#00a872] transition-colors shadow-lg shadow-[#00c288]/20 flex items-center gap-2">
          <font-awesome-icon icon="user-md" />
          Add New Doctor
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
            placeholder="Search doctors by name or specialization..." 
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

      <!-- Doctors Grid -->
      <div class="grid grid-cols-3 gap-6 animate-slide-up" style="animation-delay: 500ms">
        <div v-for="doctor in filteredDoctors" :key="doctor.id" 
             class="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <div class="relative h-48 overflow-hidden bg-gradient-to-br from-[#00c288]/10 to-[#00c288]/5">
            <img :src="doctor.avatar" :alt="doctor.name" class="w-32 h-32 rounded-full object-cover mx-auto mt-8 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300" />
            <div :class="['absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase', doctor.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white']">
              {{ doctor.status }}
            </div>
          </div>
          
          <div class="p-6 text-center">
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ doctor.name }}</h3>
            <p class="text-sm text-[#00c288] font-semibold mb-3">{{ doctor.specialization }}</p>
            
            <div class="flex items-center justify-center gap-4 mb-4 text-xs text-gray-500">
              <div class="flex items-center gap-1">
                <font-awesome-icon icon="user-friends" class="text-[#00c288]" />
                <span>{{ doctor.patients }} Patients</span>
              </div>
              <div class="flex items-center gap-1">
                <font-awesome-icon icon="star" class="text-yellow-500" />
                <span>{{ doctor.rating }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 mb-4">
              <span v-for="tag in doctor.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium">
                {{ tag }}
              </span>
            </div>

            <div class="flex gap-2">
              <button class="flex-1 py-2 bg-[#00c288] text-white rounded-xl text-sm font-semibold hover:bg-[#00a872] transition-colors">
                View Profile
              </button>
              <button class="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <font-awesome-icon icon="edit" class="text-gray-600" />
              </button>
              <button class="p-2 border border-gray-200 rounded-xl hover:bg-red-50 transition-colors">
                <font-awesome-icon icon="trash" class="text-red-500" />
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
  { label: 'Total Doctors', value: '284', trend: '12 new this month', trendUp: true, icon: 'user-md', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { label: 'Active Doctors', value: '267', trend: '94% active rate', trendUp: true, icon: 'user-check', iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { label: 'Specializations', value: '18', trend: '3 categories', trendUp: true, icon: 'stethoscope', iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { label: 'Avg Rating', value: '4.8', trend: '0.2 pts increase', trendUp: true, icon: 'star', iconColor: 'text-yellow-500', bgColor: 'bg-yellow-50' }
]

const filters = ['All', 'Nutrition', 'Fitness', 'Mental Health', 'General']

const doctors = ref([
  { id: 1, name: 'Dr. Ahmed Hassan', specialization: 'Nutrition Specialist', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', patients: 145, rating: 4.9, status: 'Active', tags: ['Diet', 'Weight Loss'] },
  { id: 2, name: 'Dr. Mohamed Ali', specialization: 'Fitness Coach', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', patients: 132, rating: 4.8, status: 'Active', tags: ['Training', 'Cardio'] },
  { id: 3, name: 'Dr. Omar Khalil', specialization: 'Mental Health', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', patients: 98, rating: 4.7, status: 'Active', tags: ['Therapy', 'Wellness'] },
  { id: 4, name: 'Dr. Youssef Ibrahim', specialization: 'General Practitioner', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', patients: 210, rating: 4.9, status: 'Active', tags: ['General', 'Checkup'] },
  { id: 5, name: 'Dr. Karim Mahmoud', specialization: 'Sports Medicine', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', patients: 87, rating: 4.6, status: 'Inactive', tags: ['Sports', 'Injury'] },
  { id: 6, name: 'Dr. Tarek Samir', specialization: 'Nutrition Specialist', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', patients: 156, rating: 4.8, status: 'Active', tags: ['Nutrition', 'Meal Plans'] },
  { id: 7, name: 'Dr. Amr Fathy', specialization: 'Cardiology', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', patients: 178, rating: 4.9, status: 'Active', tags: ['Heart', 'Cardio'] },
  { id: 8, name: 'Dr. Hossam Adel', specialization: 'Physiotherapy', avatar: 'https://randomuser.me/api/portraits/men/88.jpg', patients: 92, rating: 4.7, status: 'Active', tags: ['Rehab', 'Therapy'] },
  { id: 9, name: 'Dr. Samy El-Sawy', specialization: 'Fitness Coach', avatar: 'https://randomuser.me/api/portraits/men/99.jpg', patients: 124, rating: 4.8, status: 'Active', tags: ['Fitness', 'Strength'] }
])

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = activeFilter.value === 'All' || 
                         doctor.specialization.toLowerCase().includes(activeFilter.value.toLowerCase())
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
