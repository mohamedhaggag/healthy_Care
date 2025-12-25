<script setup>
import { ref } from 'vue'

const email = ref('')
const showPopup = ref(false)
const popupText = ref('Subscribed successfully!')
const popupVariant = ref('success') // 'success' | 'error'

let popupTimer = null

const isValidEmail = (v) => {
  const s = String(v || '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

const openPopup = (text, variant = 'success') => {
  popupText.value = text
  popupVariant.value = variant
  showPopup.value = true

  if (popupTimer) clearTimeout(popupTimer)
  popupTimer = setTimeout(() => {
    showPopup.value = false
  }, 1800)
}

const submit = () => {
  const v = email.value.trim()
  if (!isValidEmail(v)) {
    openPopup('Please enter a valid email address.', 'error')
    return
  }

  // Demo-only: no backend yet
  openPopup('Subscribed! Check your inbox for updates.', 'success')
  email.value = ''
}
</script>

<template>
  <section class="py-20 px-4">
    <div class="max-w-5xl mx-auto bg-green-500 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden" data-aos="zoom-in">
        <!-- Decoration Circles -->
        <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
            <font-awesome-icon icon="envelope-open-text" />
            <span class="text-sm font-bold">Join Our Community</span>
        </div>
        
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Get Weekly Health Tips Delivered to Your Inbox</h2>
        <p class="text-green-50 mb-10 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive recipes, nutrition guides, and expert wellness advice.</p>
        
        <form class="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" @submit.prevent="submit">
            <input v-model="email" type="email" placeholder="Enter Your Email" class="flex-grow px-6 py-4 rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg placeholder:text-gray-400" />
            <button type="submit" class="px-8 py-4 bg-dark text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg">
                Subscribe
            </button>
        </form>
      </div>
    </div>

    <!-- Center popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      aria-live="polite"
      role="status"
    >
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showPopup = false"></div>
      <div
        class="relative w-full max-w-md rounded-3xl border shadow-2xl px-6 py-5 text-center animate-popup"
        :class="popupVariant === 'success' ? 'bg-white border-green-100' : 'bg-white border-red-100'"
      >
        <div
          class="mx-auto mb-3 w-12 h-12 rounded-2xl flex items-center justify-center"
          :class="popupVariant === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'"
        >
          <font-awesome-icon :icon="popupVariant === 'success' ? 'check' : 'triangle-exclamation'" class="text-xl" />
        </div>
        <p class="text-lg font-bold text-gray-900">{{ popupText }}</p>
        <p class="text-sm text-gray-500 mt-1">This message will close automatically.</p>
        <button
          class="mt-4 px-6 py-2.5 rounded-2xl font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          type="button"
          @click="showPopup = false"
        >
          Close
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes popupIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-popup {
  animation: popupIn 180ms ease-out;
}
</style>
