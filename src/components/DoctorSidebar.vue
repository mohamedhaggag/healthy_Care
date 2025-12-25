<template>
  <aside class="w-64 bg-[#0a4d8c] text-white flex flex-col py-8 px-4 h-screen fixed left-0 top-0">
    <div class="flex items-center gap-3 px-4 mb-16">
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <font-awesome-icon icon="leaf" class="text-[#0a4d8c] text-xl" />
      </div>
      <span class="font-bold text-lg tracking-wide uppercase">HEALTHY CARE</span>
    </div>

    <nav class="flex-1 space-y-2">
      <router-link 
        to="/doctor-dashboard" 
        class="flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300"
        :class="[route.name === 'doctor-dashboard' ? 'bg-white text-[#0a4d8c]' : 'text-white/70 hover:bg-white/10']"
      >
        <font-awesome-icon icon="th-large" width="20" />
        <span>over view</span>
      </router-link>
      
      <router-link 
        to="/doctor-clients" 
        class="flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300"
        :class="[route.name === 'doctor-clients' ? 'bg-white text-[#0a4d8c]' : 'text-white/70 hover:bg-white/10']"
      >
        <font-awesome-icon icon="users" width="20" />
        <span>Clients</span>
      </router-link>

      <router-link 
        to="/doctor-messages" 
        class="flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300"
        :class="[route.path.startsWith('/doctor-messages') ? 'bg-white text-[#0a4d8c]' : 'text-white/70 hover:bg-white/10']"
      >
        <font-awesome-icon icon="comment-dots" width="20" />
        <span>Message</span>
      </router-link>

      <router-link 
        to="/doctor-blogs" 
        class="flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300"
        :class="[route.path.startsWith('/doctor-blogs') ? 'bg-white text-[#0a4d8c]' : 'text-white/70 hover:bg-white/10']"
      >
        <font-awesome-icon icon="file-alt" width="20" />
        <span>Blogs</span>
      </router-link>

    </nav>

    <div class="absolute bottom-4 left-0 w-full px-4">
      <button 
        @click="handleLogout"
        class="flex items-center gap-4 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 w-full text-left"
      >
        <font-awesome-icon icon="sign-out-alt" width="20" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { logout } = useAuth()

const handleLogout = () => {
  localStorage.removeItem('doctor_auth')
  logout()
  router.push('/login')
}
</script>
