<template>
  <div class="flex h-screen bg-[#f8faff]">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#0a4d8c] text-white flex flex-col py-8 px-4">
      <div class="flex items-center gap-3 px-4 mb-16">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <img src="/vite.svg" alt="Logo" class="w-6 h-6" />
        </div>
        <span class="font-bold text-lg tracking-wide">HEALTHY CARE</span>
      </div>

      <nav class="flex-1 space-y-2">
        <router-link 
          to="/doctor-dashboard" 
          class="flex items-center gap-4 px-4 py-3 bg-white text-[#0a4d8c] rounded-xl font-medium transition-all"
        >
          <font-awesome-icon icon="th-large" width="20" />
          <span>over view</span>
        </router-link>
        
        <a href="#" class="flex items-center gap-4 px-4 py-3 text-white/70 hover:bg-white/10 rounded-xl transition-all">
          <font-awesome-icon icon="users" width="20" />
          <span>Clients</span>
        </a>

        <a href="#" class="flex items-center gap-4 px-4 py-3 text-white/70 hover:bg-white/10 rounded-xl transition-all">
          <font-awesome-icon icon="comment-dots" width="20" />
          <span>Message</span>
        </a>

        <button 
          @click="handleLogout"
          class="flex items-center gap-4 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-auto"
        >
          <font-awesome-icon icon="sign-out-alt" width="20" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-10">
      <!-- Header -->
      <header class="flex justify-between items-center mb-10">
        <h1 class="text-2xl font-bold text-[#0a4d8c]">Over View</h1>
        <div class="flex items-center gap-3 text-slate-600">
          <font-awesome-icon icon="user-circle" class="text-xl" />
          <span class="text-sm">Welcome back, Dr.Mohamed!</span>
        </div>
      </header>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-12 gap-8">
        
        <!-- Main Area -->
        <div class="col-span-8 space-y-8">
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-3 gap-6">
            <div class="bg-[#c2d6ff] p-6 rounded-3xl flex justify-between items-start">
              <div>
                <p class="text-slate-600 text-sm mb-1">Active Clients</p>
                <h3 class="text-4xl font-bold text-[#0a4d8c]">12</h3>
              </div>
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a4d8c]">
                <font-awesome-icon icon="users" />
              </div>
            </div>

            <div class="bg-[#c2d6ff] p-6 rounded-3xl flex justify-between items-start">
              <div>
                <p class="text-slate-600 text-sm mb-1">Overall Compliance</p>
                <h3 class="text-4xl font-bold text-[#0a4d8c]">78%</h3>
              </div>
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a4d8c]">
                <font-awesome-icon icon="chart-line" />
              </div>
            </div>

            <div class="bg-[#c2d6ff] p-6 rounded-3xl flex justify-between items-start">
              <div>
                <p class="text-slate-600 text-sm mb-1">Today's Appointments</p>
                <h3 class="text-4xl font-bold text-[#0a4d8c]">4</h3>
              </div>
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0a4d8c]">
                <font-awesome-icon icon="calendar-alt" />
              </div>
            </div>
          </div>

          <!-- Clients Need Follow-up -->
          <div class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <div class="flex justify-between items-center mb-8">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center">
                  <font-awesome-icon icon="bell" />
                </div>
                <div>
                  <h2 class="font-bold text-slate-800">Clients Need Follow-up</h2>
                  <p class="text-xs text-slate-400">3 clients require attention</p>
                </div>
              </div>
              <button class="text-xs font-semibold text-slate-500 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50">View All</button>
            </div>

            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-3xl hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img src="https://i.pravatar.cc/150?u=mohamed" alt="Avatar" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="font-bold text-slate-800">mohamed nasef</p>
                      <span class="text-[10px] text-slate-400">2 days ago</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Weight Loss</span>
                      <span class="text-[10px] text-orange-500 font-medium">Compliance: 45%</span>
                    </div>
                  </div>
                </div>
                <button class="bg-[#00c288] text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2">
                  <font-awesome-icon icon="comment" />
                  Contact
                </button>
              </div>
            </div>
          </div>

          <!-- Client Activity Overview -->
          <div class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
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
                   <p class="text-2xl font-bold text-green-600">8</p>
                   <p class="text-[10px] text-green-600">On Track</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-orange-600">3</p>
                   <p class="text-[10px] text-orange-600">Needs Support</p>
                </div>
                <div class="bg-red-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-red-600">1</p>
                   <p class="text-[10px] text-red-600">At Risk</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-2xl text-center">
                   <p class="text-2xl font-bold text-blue-600">32</p>
                   <p class="text-[10px] text-blue-600">Total Messages</p>
                </div>
              </div>

              <div>
                <p class="text-xs text-slate-500 mb-2">Average Compliance Rate <span class="float-right font-bold text-green-600">78%</span></p>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-[#00c288] h-full" style="width: 78%"></div>
                </div>
              </div>
          </div>

        </div>

        <!-- Sidebar Area -->
        <div class="col-span-4 space-y-8">
          
          <!-- Today's Schedule -->
          <div class="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
             <div class="flex items-center gap-4 mb-6">
                <div class="w-10 h-10 bg-purple-100 text-purple-500 rounded-xl flex items-center justify-center">
                  <font-awesome-icon icon="calendar-check" />
                </div>
                <div>
                  <h2 class="font-bold text-slate-800">Today's Schedule</h2>
                  <p class="text-xs text-slate-400">Monday, Dec 22</p>
                </div>
              </div>

              <div class="space-y-4">
                <div v-for="i in 4" :key="i" class="flex items-center justify-between p-3 border-b border-slate-50 last:border-0">
                  <div class="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?u=lol" class="w-10 h-10 rounded-full" />
                    <div>
                      <p class="text-sm font-bold text-slate-800">lol</p>
                      <p class="text-[10px] text-slate-400">
                        <font-awesome-icon icon="clock" class="mr-1" />
                        10:00 AM
                      </p>
                    </div>
                  </div>
                  <button :class="[
                    'text-[10px] px-3 py-1 rounded-lg font-medium',
                    i % 3 === 0 ? 'bg-blue-100 text-blue-600' : 
                    i % 3 === 1 ? 'bg-blue-50 text-blue-400' : 'bg-slate-50 text-slate-400'
                  ]">
                    {{ i % 3 === 0 ? 'Video Call' : i % 3 === 1 ? 'chat' : 'Check-in' }}
                  </button>
                </div>
              </div>

              <button class="w-full mt-6 py-3 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50">
                View Full Calendar
                <font-awesome-icon icon="chevron-right" class="text-[10px]" />
              </button>
          </div>

          <!-- Pro Tip -->
          <div class="bg-[#c2d6ff] p-8 rounded-[40px] relative overflow-hidden">
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
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('doctor_auth')
  router.push('/login')
}
</script>

<style scoped>
/* Specific styles if Tailwind isn't enough */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
