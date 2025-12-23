<template>
  <div class="flex h-screen bg-[#f8faff] overflow-hidden">
    <!-- Shared Sidebar -->
    <DoctorSidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto ml-64 p-10 animate-fade-in">
      <!-- Header -->
      <header class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold text-[#0a4d8c] tracking-tight">Clients</h1>
        <div class="flex items-center gap-3 text-slate-600">
          <font-awesome-icon icon="user-circle" class="text-xl" />
          <span class="text-sm font-medium">Dr. Mohamed Dashboard</span>
        </div>
      </header>

      <!-- Stat Cards -->
      <div class="grid grid-cols-4 gap-6 mb-10">
        <div v-for="(stat, index) in stats" :key="index" 
             class="p-6 rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer animate-slide-up"
             :style="{ backgroundColor: stat.bgColor, animationDelay: `${index * 100}ms` }">
          <p class="text-slate-600 text-sm mb-2 font-medium flex items-center gap-2">
            <span v-if="stat.icon" :class="stat.iconColor">{{ stat.icon }}</span>
            {{ stat.label }}
          </p>
          <h3 class="text-4xl font-extrabold text-[#0a4d8c]">{{ stat.value }}</h3>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center justify-between gap-4 animate-fade-in delay-500">
        <div class="relative flex-1 max-w-md">
          <font-awesome-icon icon="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search clients by name..." 
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/20 outline-none text-sm transition-all"
          />
        </div>
        <div class="flex items-center gap-2">
          <button v-for="filter in filters" :key="filter"
                  @click="activeFilter = filter"
                  :class="[
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300',
                    activeFilter === filter ? 'bg-[#0a4d8c] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  ]">
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Clients Table -->
      <div class="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden animate-fade-in delay-700">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-50">
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Goal</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Current Weight</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Update</th>
              <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <transition-group name="list" tag="tbody">
            <tr v-for="client in filteredClients" :key="client.id" class="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors duration-300">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <img :src="client.avatar" class="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Avatar" />
                  <span class="font-bold text-slate-800">{{ client.name }}</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <span :class="[
                  'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter',
                  client.goal === 'Weight Loss' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                ]">
                  {{ client.goal }}
                </span>
              </td>
              <td class="px-8 py-6 text-center text-sm font-semibold text-slate-600">
                {{ client.weight }} kg
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-3">
                  <div class="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div class="h-full transition-all duration-1000 ease-out" 
                         :style="{ width: client.progress + '%', backgroundColor: client.progressColor }"></div>
                  </div>
                  <span class="text-xs font-bold text-slate-500">{{ client.progress }}%</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <span :class="[
                  'flex items-center gap-2 text-[10px] font-bold uppercase',
                  client.status === 'Compliant' ? 'text-green-500' : client.status === 'Needs Support' ? 'text-orange-500' : 'text-red-500'
                ]">
                  <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: client.status === 'Compliant' ? '#22c55e' : client.status === 'Needs Support' ? '#f97316' : '#ef4444' }"></span>
                  {{ client.status }}
                </span>
              </td>
              <td class="px-8 py-6 text-xs text-slate-400 font-medium">
                {{ client.lastUpdate }}
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center justify-center gap-2">
                  <router-link :to="'/doctor-client-details/' + client.id" class="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all active:scale-95">
                    <font-awesome-icon icon="eye" class="text-[10px]" />
                    View
                  </router-link>
                  <router-link to="/doctor-messages" class="flex items-center gap-2 px-4 py-2 bg-[#0a4d8c] text-white rounded-xl text-xs font-bold hover:bg-[#083d70] transition-all active:scale-95 shadow-sm">
                    <font-awesome-icon icon="comment" class="text-[10px]" />
                    Chat
                  </router-link>
                  <button class="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                    <font-awesome-icon icon="ellipsis-h" />
                  </button>
                </div>
              </td>
            </tr>
          </transition-group>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DoctorSidebar from '../components/DoctorSidebar.vue'

const searchQuery = ref('')
const activeFilter = ref('All')

const stats = [
  { label: 'Total Clients', value: '12', bgColor: '#c2d6ff' },
  { label: 'Compliant', value: '6', bgColor: '#e7f9f0', icon: 'check_circle', iconColor: 'text-green-500' },
  { label: 'Needs Support', value: '4', bgColor: '#fff4e5', icon: 'warning', iconColor: 'text-orange-500' },
  { label: 'At Risk', value: '2', bgColor: '#fee2e2', icon: 'error', iconColor: 'text-red-500' }
]

const filters = ['All', 'Weight Loss', 'Weight Gain', 'Health Improvement']

const clients = ref([
  { id: 1, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', goal: 'Weight Loss', weight: 84, progress: 65, progressColor: '#f59e0b', status: 'Compliant', lastUpdate: '1 day ago' },
  { id: 2, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', goal: 'Weight Gain', weight: 75, progress: 82, progressColor: '#0a4d8c', status: 'Compliant', lastUpdate: 'Yesterday' },
  { id: 3, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', goal: 'Weight Loss', weight: 84, progress: 65, progressColor: '#f59e0b', status: 'Compliant', lastUpdate: '1 day ago' },
  { id: 4, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', goal: 'Weight Gain', weight: 75, progress: 82, progressColor: '#0a4d8c', status: 'Compliant', lastUpdate: 'Yesterday' },
  { id: 5, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', goal: 'Weight Loss', weight: 84, progress: 65, progressColor: '#f59e0b', status: 'Compliant', lastUpdate: '1 day ago' },
  { id: 6, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', goal: 'Weight Gain', weight: 75, progress: 82, progressColor: '#0a4d8c', status: 'Compliant', lastUpdate: 'Yesterday' },
  { id: 7, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', goal: 'Weight Loss', weight: 84, progress: 65, progressColor: '#f59e0b', status: 'Compliant', lastUpdate: '1 day ago' },
  { id: 8, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/88.jpg', goal: 'Weight Gain', weight: 75, progress: 82, progressColor: '#0a4d8c', status: 'Compliant', lastUpdate: 'Yesterday' },
  { id: 9, name: 'Mohamed Ali', avatar: 'https://randomuser.me/api/portraits/men/99.jpg', goal: 'Weight Gain', weight: 75, progress: 82, progressColor: '#0a4d8c', status: 'Compliant', lastUpdate: 'Yesterday' }
])

const filteredClients = computed(() => {
  return clients.value.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = activeFilter.value === 'All' || client.goal === activeFilter.value
    return matchesSearch && matchesFilter
  })
})
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

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.delay-500 { animation-delay: 0.5s; }
.delay-700 { animation-delay: 0.7s; }

/* List animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
