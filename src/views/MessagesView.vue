<template>
  <div class="flex h-screen bg-[#f8faff] overflow-hidden text-slate-800">
    <!-- Shared Sidebar -->
    <DoctorSidebar />

    <!-- Main Content Area -->
    <main class="flex-1 ml-64 flex overflow-hidden animate-fade-in">
      
      <!-- Conversations List (Left Side) -->
      <div class="w-96 bg-white border-r border-slate-100 flex flex-col h-full overflow-hidden">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-6 text-[#0a4d8c]">Messages</h1>
          <div class="relative">
            <font-awesome-icon icon="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search conversations..." 
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/10 outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar-hide">
          <div 
            v-for="convo in filteredConversations" 
            :key="convo.id"
            @click="activeConvoId = convo.id"
            :class="[
              'px-8 py-5 border-l-4 cursor-pointer transition-all duration-300 hover:bg-slate-50',
              activeConvoId === convo.id ? 'bg-blue-50/50 border-[#0a4d8c]' : 'border-transparent'
            ]"
          >
            <div class="flex items-start gap-4">
              <div class="relative">
                <img :src="convo.avatar" class="w-12 h-12 rounded-full shadow-sm" alt="Avatar" />
                <div v-if="convo.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center mb-1">
                  <h3 class="font-bold truncate">{{ convo.name }}</h3>
                  <span class="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">{{ convo.time }}</span>
                </div>
                <p class="text-[10px] font-bold text-[#0a4d8c] uppercase tracking-tighter mb-1">{{ convo.goal }}</p>
                <div class="flex justify-between items-center">
                  <p class="text-xs text-slate-500 truncate pr-2">{{ convo.lastMessage }}</p>
                  <span v-if="convo.unread" class="bg-[#0a4d8c] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {{ convo.unread }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Chat Window (Right Side) -->
      <div v-if="activeConversation" class="flex-1 flex flex-col h-full bg-[#f8faff]/50">
        <!-- Chat Header -->
        <header class="p-6 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm z-10">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img :src="activeConversation.avatar" class="w-12 h-12 rounded-full shadow-md" alt="Avatar" />
              <div v-if="activeConversation.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 class="font-bold text-lg leading-tight">{{ activeConversation.name }}</h2>
              <div class="flex items-center gap-2">
                <span :class="['text-[10px] font-bold uppercase', activeConversation.online ? 'text-green-500' : 'text-slate-400']">{{ activeConversation.online ? 'Online' : 'Offline' }}</span>
                <span class="text-slate-200">•</span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ activeConversation.goal }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-slate-400">
            <button class="w-10 h-10 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
              <font-awesome-icon icon="phone" />
            </button>
            <button class="w-10 h-10 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
              <font-awesome-icon icon="video" />
            </button>
            <button class="w-10 h-10 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
              <font-awesome-icon icon="ellipsis-v" />
            </button>
          </div>
        </header>

        <!-- Messages Content -->
        <div class="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-90">
          <div v-for="(msg, index) in thread" :key="index" :class="['flex flex-col', msg.sender === 'me' ? 'items-end' : 'items-start']">
            <div 
              :class="[
                'max-w-[70%] p-5 rounded-[25px] shadow-sm text-sm leading-relaxed mb-2',
                msg.sender === 'me' ? 'bg-[#0a4d8c] text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-50'
              ]"
            >
              {{ msg.text }}
            </div>
            <div class="flex items-center gap-2 px-2">
              <span class="text-[10px] text-slate-400 font-medium">{{ msg.time }}</span>
              <font-awesome-icon v-if="msg.sender === 'me'" icon="check-double" class="text-[10px] text-[#0a4d8c]" />
            </div>
          </div>
        </div>

        <!-- Chat Footer (Input Area) -->
        <footer class="p-6 bg-white border-t border-slate-100 flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <button class="p-2 text-slate-400 hover:text-[#0a4d8c] transition-colors active:scale-90">
            <font-awesome-icon icon="paperclip" class="text-lg" />
          </button>
          <button class="p-2 text-slate-400 hover:text-[#0a4d8c] transition-colors active:scale-90 mr-2">
            <font-awesome-icon icon="image" class="text-lg" />
          </button>
          <div class="flex-1 relative">
            <input 
              v-model="newMessage"
              @keyup.enter="sendMessage"
              type="text" 
              placeholder="Type a message..." 
              class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0a4d8c]/10 outline-none text-sm transition-all pr-12"
            />
            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-orange-400 transition-colors">
              <font-awesome-icon icon="smile" class="text-lg" />
            </button>
          </div>
          <button 
            @click="sendMessage"
            class="w-12 h-12 bg-[#0a4d8c] text-white rounded-2xl shadow-lg shadow-blue-900/10 hover:bg-[#083d70] hover:scale-105 transition-all flex items-center justify-center active:scale-90"
          >
            <font-awesome-icon icon="paper-plane" />
          </button>
        </footer>
      </div>

      <!-- No Active Chat State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400 animate-pulse">
        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
          <font-awesome-icon icon="comments" class="text-4xl text-slate-200" />
        </div>
        <h2 class="text-xl font-bold text-slate-300 mb-2 font-mono uppercase tracking-[0.2em]">Ready to talk</h2>
        <p class="text-sm font-medium">Select a patient to start messaging</p>
      </div>

    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DoctorSidebar from '../components/DoctorSidebar.vue'
import { useAuth } from '../composables/useAuth'
import { buildDoctorClients, getCurrentDoctor, loadThread, saveThread } from '../services/doctorPortal'

const route = useRoute()
const { user } = useAuth()

const searchQuery = ref('')
const activeConvoId = ref('')
const newMessage = ref('')

const doctor = computed(() => getCurrentDoctor(user.value))
const clients = computed(() => buildDoctorClients(doctor.value))

const thread = ref([])

const buildConvo = (c) => {
  const msgs = loadThread(doctor.value, c.id)
  const last = msgs[msgs.length - 1]
  return {
    id: c.id,
    name: c.name,
    avatar: c.avatar,
    goal: c.goal,
    lastMessage: last?.text || 'No messages yet.',
    time: last?.time || '',
    unread: 0,
    online: true
  }
}

const conversations = computed(() => clients.value.map(buildConvo))

const filteredConversations = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return conversations.value.filter(c => !q || c.name.toLowerCase().includes(q))
})

const activeConversation = computed(() => {
  return conversations.value.find(c => c.id === activeConvoId.value) || null
})

const loadActiveThread = () => {
  if (!activeConvoId.value) {
    thread.value = []
    return
  }
  thread.value = loadThread(doctor.value, activeConvoId.value)
  if (!Array.isArray(thread.value) || thread.value.length === 0) {
    thread.value = [
      {
        sender: 'client',
        text: 'Hi doctor, I need help with my plan.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
    saveThread(doctor.value, activeConvoId.value, thread.value)
  }
}

watch([activeConvoId, doctor], () => loadActiveThread(), { immediate: true })

onMounted(() => {
  const initial = String(route.query.client || '')
  if (initial) {
    activeConvoId.value = initial
    return
  }
  if (conversations.value.length) activeConvoId.value = conversations.value[0].id
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  thread.value.push({
    sender: 'me',
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  
  newMessage.value = ''
  saveThread(doctor.value, activeConvoId.value, thread.value)
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
