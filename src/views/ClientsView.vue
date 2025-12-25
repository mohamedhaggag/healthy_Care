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
        <div class="ml-2 text-xs text-slate-400">
          Query: <strong class="text-slate-700">{{ searchQuery }}</strong> · Results: <strong class="text-slate-700">{{ filteredClients.length }}</strong>
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
            <tr v-for="client in paginatedClients" :key="client.id" class="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors duration-300">
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
                  <router-link :to="`/doctor-messages?client=${client.id}`" class="flex items-center gap-2 px-4 py-2 bg-[#0a4d8c] text-white rounded-xl text-xs font-bold hover:bg-[#083d70] transition-all active:scale-95 shadow-sm">
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
        <!-- Pagination -->
        <div class="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-white">
          <div class="text-sm text-slate-500">Showing <strong class="text-slate-700">{{ startItem }}</strong> - <strong class="text-slate-700">{{ endItem }}</strong> of <strong class="text-slate-700">{{ filteredClients.length }}</strong></div>
          <div class="flex items-center gap-2">
            <button @click="prevPage" :disabled="page === 1" class="px-3 py-2 rounded-md bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50">Prev</button>
            <div class="hidden sm:flex items-center gap-2">
              <button v-for="p in pagesArray" :key="p" @click="page = p" :class="['px-3 py-2 rounded-md text-sm', page === p ? 'bg-[#0a4d8c] text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100']">{{ p }}</button>
            </div>
            <button @click="nextPage" :disabled="page === totalPages" class="px-3 py-2 rounded-md bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50">Next</button>
            <select v-model="perPage" class="ml-4 px-3 py-2 rounded-md bg-slate-50 text-slate-600 border border-slate-100 text-sm">
              <option :value="5">5 / page</option>
              <option :value="10">10 / page</option>
              <option :value="20">20 / page</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import DoctorSidebar from '../components/DoctorSidebar.vue'
import { useAuth } from '../composables/useAuth'
import { buildDoctorClients, getCurrentDoctor } from '../services/doctorPortal'

const { user } = useAuth()

const searchQuery = ref('')
const activeFilter = ref('All')

const filters = ['All', 'Weight Loss', 'Weight Gain', 'Health Improvement']

const doctor = computed(() => getCurrentDoctor(user.value))
const clients = computed(() => buildDoctorClients(doctor.value))

const stats = computed(() => {
  const list = clients.value
  const compliant = list.filter(c => c.status === 'Compliant').length
  const needsSupport = list.filter(c => c.status === 'Needs Support').length
  const atRisk = list.filter(c => c.status === 'At Risk').length
  return [
    { label: 'Total Clients', value: String(list.length), bgColor: '#c2d6ff' },
    { label: 'Compliant', value: String(compliant), bgColor: '#e7f9f0', icon: 'check_circle', iconColor: 'text-green-500' },
    { label: 'Needs Support', value: String(needsSupport), bgColor: '#fff4e5', icon: 'warning', iconColor: 'text-orange-500' },
    { label: 'At Risk', value: String(atRisk), bgColor: '#fee2e2', icon: 'error', iconColor: 'text-red-500' }
  ]
})

const filteredClients = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return clients.value.filter(client => {
    const matchesFilter = activeFilter.value === 'All' || client.goal === activeFilter.value
    if (!q) return matchesFilter

    const name = (client.name || '').toLowerCase()
    const goal = (client.goal || '').toLowerCase()
    const weight = String(client.weight || '')

    const matchesSearch = name.includes(q) || goal.includes(q) || weight.includes(q)
    return matchesSearch && matchesFilter
  })
})

// Pagination state & helpers
const page = ref(1)
const perPage = ref(5)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredClients.value.length / perPage.value)))
const pagesArray = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))
const paginatedClients = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredClients.value.slice(start, start + perPage.value)
})
const startItem = computed(() => filteredClients.value.length ? (page.value - 1) * perPage.value + 1 : 0)
const endItem = computed(() => Math.min(filteredClients.value.length, page.value * perPage.value))
const prevPage = () => { if (page.value > 1) page.value-- }
const nextPage = () => { if (page.value < totalPages.value) page.value++ }

// Reset to first page whenever filter/search changes
watch([searchQuery, activeFilter, clients], () => { page.value = 1 })
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
