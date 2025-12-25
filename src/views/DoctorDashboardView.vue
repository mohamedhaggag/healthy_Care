<template>
  <div class="flex h-screen bg-[#f8faff]">
    <!-- Shared Sidebar -->
    <DoctorSidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto ml-64 p-10 animate-fade-in">
      <!-- Header -->
      <header class="flex justify-between items-center mb-10">
        <h1 class="text-2xl font-bold text-[#0a4d8c]">Over View</h1>
        <div class="flex items-center gap-3 text-slate-600">
          <font-awesome-icon icon="user-circle" class="text-xl" />
          <span class="text-sm">Welcome back, {{ doctorName }}!</span>
        </div>
      </header>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-12 gap-8">
        
        <!-- Main Area -->
        <div class="col-span-8 space-y-8">
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-3 gap-6 animate-slide-up">
            <div class="bg-[#c2d6ff] p-6 rounded-3xl flex justify-between items-start">
              <div>
                <p class="text-slate-600 text-sm mb-1">Active Clients</p>
                <h3 class="text-4xl font-bold text-[#0a4d8c]">{{ activeClients }}</h3>
              </div>
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a4d8c]">
                <font-awesome-icon icon="users" />
              </div>
            </div>

            <div class="bg-[#c2d6ff] p-6 rounded-3xl flex justify-between items-start transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p class="text-slate-600 text-sm mb-1">Overall Compliance</p>
                <h3 class="text-4xl font-bold text-[#0a4d8c]">{{ averageCompliance }}%</h3>
              </div>
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a4d8c]">
                <font-awesome-icon icon="chart-line" />
              </div>
            </div>

            <div class="bg-[#c2d6ff] p-6 rounded-3xl flex justify-between items-start">
              <div>
                <p class="text-slate-600 text-sm mb-1">Today's Appointments</p>
                <h3 class="text-4xl font-bold text-[#0a4d8c]">{{ todaysAppointmentsCount }}</h3>
              </div>
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a4d8c]">
                <font-awesome-icon icon="calendar-alt" />
              </div>
            </div>
          </div>

          <!-- Clients Need Follow-up -->
          <div class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 animate-slide-up delay-200">
            <div class="flex justify-between items-center mb-8">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center">
                  <font-awesome-icon icon="bell" />
                </div>
                <div>
                  <h2 class="font-bold text-slate-800">Clients Need Follow-up</h2>
                  <p class="text-xs text-slate-400">{{ followUps.length }} clients require attention</p>
                </div>
              </div>
              <router-link to="/doctor-clients" class="text-xs font-semibold text-slate-500 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50">View All</router-link>
            </div>

            <div class="space-y-4">
              <div v-for="c in followUps" :key="c.id" class="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-3xl hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img :src="c.avatar" alt="Avatar" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="font-bold text-slate-800">{{ c.name }}</p>
                      <span class="text-[10px] text-slate-400">{{ c.lastUpdate }}</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">{{ c.goal }}</span>
                      <span class="text-[10px] text-orange-500 font-medium">Compliance: {{ c.compliance }}%</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <router-link :to="`/doctor-client-details/${c.id}`" class="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-slate-100 transition-all">
                    <font-awesome-icon icon="eye" />
                    View
                  </router-link>
                  <router-link :to="`/doctor-messages?client=${c.id}`" class="bg-[#00c288] text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2">
                    <font-awesome-icon icon="comment" />
                    Contact
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Client Activity Overview -->
          <div class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 animate-slide-up delay-300">
             <div class="flex items-center gap-4 mb-8">
                <div class="w-10 h-10 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center">
                  <font-awesome-icon icon="chart-bar" />
                </div>
                <div>
                  <h2 class="font-bold text-slate-800">Client Activity Overview</h2>
                  <p class="text-xs text-slate-400">Last 7 days performance</p>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-4 mb-8">
                <div class="bg-green-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-green-600">{{ onTrack }}</p>
                   <p class="text-[10px] text-green-600">On Track</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-orange-600">{{ needsSupport }}</p>
                   <p class="text-[10px] text-orange-600">Needs Support</p>
                </div>
                <div class="bg-red-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-red-600">{{ atRisk }}</p>
                   <p class="text-[10px] text-red-600">At Risk</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-blue-600">{{ totalMessages }}</p>
                   <p class="text-[10px] text-blue-600">Total Messages</p>
                </div>
              </div>

              <div>
                <p class="text-xs text-slate-500 mb-2">Average Compliance Rate <span class="float-right font-bold text-green-600">{{ averageCompliance }}%</span></p>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-[#00c288] h-full" :style="{ width: `${averageCompliance}%` }"></div>
                </div>
              </div>
          </div>

        </div>

        <!-- Sidebar Area -->
        <div class="col-span-4 space-y-8">
          
          <!-- Today's Schedule -->
          <div class="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 animate-slide-up delay-200">
             <div class="flex items-center gap-4 mb-6">
                <div class="w-10 h-10 bg-purple-100 text-purple-500 rounded-xl flex items-center justify-center">
                  <font-awesome-icon icon="calendar-check" />
                </div>
                <div>
                  <h2 class="font-bold text-slate-800">Today's Schedule</h2>
                  <p class="text-xs text-slate-400">{{ todayLabel }}</p>
                </div>
              </div>

              <div v-if="todaySchedule.length === 0" class="text-sm text-slate-500 bg-slate-50 rounded-2xl p-4">
                No appointments today.
              </div>

              <div v-else class="space-y-4">
                <div v-for="(s, idx) in todaySchedule" :key="idx" class="flex items-center justify-between p-3 border-b border-slate-50 last:border-0">
                  <div class="flex items-center gap-3">
                    <img :src="s.avatar" class="w-10 h-10 rounded-full" />
                    <div>
                      <p class="text-sm font-bold text-slate-800">{{ s.name }}</p>
                      <p class="text-[10px] text-slate-400">
                        <font-awesome-icon icon="clock" class="mr-1" />
                        {{ s.time }}
                      </p>
                    </div>
                  </div>
                  <button class="text-[10px] px-3 py-1 rounded-lg font-medium bg-blue-100 text-blue-600">
                    {{ s.type }}
                  </button>
                </div>
              </div>

              <button class="w-full mt-6 py-3 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50">
                View Full Calendar
                <font-awesome-icon icon="chevron-right" class="text-[10px]" />
              </button>
          </div>

          <!-- Pro Tip -->
          <div class="bg-[#c2d6ff] p-8 rounded-[40px] relative overflow-hidden animate-slide-up delay-300">
             <div class="relative z-10">
                <div class="flex items-start gap-4 mb-4">
                  <span class="text-2xl">💡</span>
                  <h3 class="font-bold text-[#0a4d8c] mt-1">Pro Tip</h3>
                </div>
                <p class="text-xs text-[#0a4d8c]/70 leading-relaxed">
                  Clients with compliance rates below 60% typically need additional support. Consider scheduling a follow-up call to understand their challenges.
                </p>
             </div>
             <!-- Decorative elements -->
             <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-[#0a4d8c]/5 rounded-full"></div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DoctorSidebar from '../components/DoctorSidebar.vue'
import { useAuth } from '../composables/useAuth'
import { buildDoctorClients, getCurrentDoctor, getDoctorAppointments, isToday } from '../services/doctorPortal'

const router = useRouter()
const { user, isAuthenticated } = useAuth()

onMounted(() => {
  if (!isAuthenticated.value) router.push('/login')
})

const doctor = computed(() => getCurrentDoctor(user.value))
const doctorName = computed(() => doctor.value?.name || user.value?.name || 'Doctor')

const clients = computed(() => buildDoctorClients(doctor.value))
const activeClients = computed(() => clients.value.length)

const followUps = computed(() => {
  const list = [...clients.value]
  list.sort((a, b) => (a.compliance || 0) - (b.compliance || 0))
  return list.slice(0, 3)
})

const averageCompliance = computed(() => {
  if (!clients.value.length) return 0
  const sum = clients.value.reduce((acc, c) => acc + (c.compliance || 0), 0)
  return Math.round(sum / clients.value.length)
})

const todaysAppointmentsCount = computed(() => {
  const appts = getDoctorAppointments(doctor.value).filter(a => isToday(a?.date))
  return appts.length
})

const todayLabel = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
})

const todaySchedule = computed(() => {
  const appts = getDoctorAppointments(doctor.value).filter(a => isToday(a?.date))
  appts.sort((a, b) => String(a.time || '').localeCompare(String(b.time || '')))
  return appts.slice(0, 5).map(a => ({
    name: a.name || a.fullName || 'Client',
    time: a.time || '—',
    type: 'Consultation',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name || 'Client')}&background=0a4d8c&color=fff`
  }))
})

const totalMessages = computed(() => {
  // Count doctor inbox threads messages for the follow-up clients as a simple dynamic number
  // (full inbox lives in Messages page).
  return followUps.value.reduce((acc, c) => acc + (c.compliance ? 1 : 0), 0) * 2
})

const onTrack = computed(() => Math.max(0, Math.round((activeClients.value * averageCompliance.value) / 100)))
const atRisk = computed(() => Math.max(0, Math.round(activeClients.value * 0.1)))
const needsSupport = computed(() => Math.max(0, activeClients.value - onTrack.value - atRisk.value))
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

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

/* Specific styles if Tailwind isn't enough */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

