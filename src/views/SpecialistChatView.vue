<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const doctorName = computed(() => String(route.query.doctorName || 'Dr. Ahmed Hassan'))
const doctorRole = computed(() => String(route.query.doctorRole || 'Nutritionist & Wellness Expert'))
const doctorId = computed(() => String(route.query.doctorId || 'default'))

const STORAGE_PREFIX = 'doctor_chat_v1:'
const storageKey = computed(() => `${STORAGE_PREFIX}${doctorId.value}`)

const containerRef = ref(null)
const input = ref('')
const isSending = ref(false)
const error = ref('')
const messages = ref([])

const scrollToBottom = async () => {
  await nextTick()
  const el = containerRef.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

const persist = () => {
  try {
    localStorage.setItem(storageKey.value, JSON.stringify(messages.value))
  } catch {
    // ignore
  }
}

const load = () => {
  try {
    const raw = localStorage.getItem(storageKey.value)
    if (raw) messages.value = JSON.parse(raw)
  } catch {
    // ignore
  }
}

const resetChat = () => {
  messages.value = [
    {
      role: 'doctor',
      content: `Hi! I’m ${doctorName.value}. How can I help you today?`
    }
  ]
  persist()
  scrollToBottom()
}

onMounted(() => {
  load()
  if (!Array.isArray(messages.value) || messages.value.length === 0) resetChat()
  scrollToBottom()
})

watch(
  () => storageKey.value,
  () => {
    messages.value = []
    load()
    if (!Array.isArray(messages.value) || messages.value.length === 0) resetChat()
  }
)

watch(
  messages,
  () => {
    persist()
    scrollToBottom()
  },
  { deep: true }
)

const canSend = computed(() => input.value.trim().length > 0 && !isSending.value)

const send = async () => {
  if (!canSend.value) return
  error.value = ''
  const text = input.value.trim()
  input.value = ''

  messages.value.push({ role: 'user', content: text })
  isSending.value = true

  try {
    // Demo: simulate doctor acknowledgement (replace later with real doctor messaging)
    await new Promise(resolve => setTimeout(resolve, 600))
    messages.value.push({
      role: 'doctor',
      content:
        'Thanks! I received your message. I will reply as soon as possible. If it is urgent, please call +01009291615.'
    })
  } catch (e) {
    error.value = e?.message || 'Failed to send message'
  } finally {
    isSending.value = false
  }
}

const goAppointment = () =>
  router.push({
    name: 'appointment',
    query: {
      doctorId: doctorId.value,
      doctorName: doctorName.value,
      doctorRole: doctorRole.value
    }
  })
</script>

<template>
  <main class="min-h-screen bg-white pt-24 pb-16">
    <section class="px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div
          class="bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
          data-aos="fade-up"
        >
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div class="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-4 border-white/30">
              <font-awesome-icon icon="user-md" class="text-5xl" />
            </div>
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ doctorName }}</h1>
              <p class="text-green-100 text-lg mb-6">{{ doctorRole }}</p>
              <p class="text-green-50/90 max-w-2xl">
                Chat directly with the doctor. This is not AI — your messages are saved for this doctor on your device.
              </p>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-12 gap-6 mt-8">
          <section class="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Chat</h2>
              <p class="text-sm text-gray-500 mt-1">
                Send your message to the doctor.
              </p>
            </div>
            <div class="p-6">
              <div
                ref="containerRef"
                class="h-[420px] overflow-y-auto rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-[#f8fcfb] px-5 py-4 space-y-4"
              >
                <div
                  v-for="(m, idx) in messages"
                  :key="idx"
                  class="flex"
                  :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
                >
                  <div
                    class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm"
                    :class="
                      m.role === 'user'
                        ? 'bg-[#00c288] text-white'
                        : 'bg-white border border-gray-100 text-gray-800'
                    "
                  >
                    <p class="whitespace-pre-wrap">{{ m.content }}</p>
                  </div>
                </div>
              </div>

              <div v-if="error" class="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {{ error }}
              </div>

              <form class="mt-4 flex items-end gap-3" @submit.prevent="send">
                <div class="flex-1">
                  <label class="sr-only" for="doctor-chat">Message</label>
                  <textarea
                    id="doctor-chat"
                    v-model="input"
                    rows="2"
                    placeholder="Type your message…"
                    class="w-full resize-none px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  :disabled="!canSend"
                  class="px-6 py-3 rounded-2xl font-bold transition-all shadow-sm"
                  :class="
                    canSend
                      ? 'bg-[#00c288] text-white hover:bg-[#00a872] hover:shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  "
                >
                  {{ isSending ? 'Sending…' : 'Send' }}
                </button>
              </form>

              <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
                <button class="font-semibold hover:text-green-700" type="button" @click="resetChat">
                  Clear chat
                </button>
                <span>Saved for this doctor on this device</span>
              </div>
            </div>
          </section>

          <aside class="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Quick actions</h2>
              <p class="text-sm text-gray-500 mt-1">Useful shortcuts.</p>
            </div>
            <div class="p-6 space-y-3">
              <button
                class="w-full px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:text-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                @click="goAppointment"
              >
                <font-awesome-icon icon="calendar" />
                <span>Book an appointment</span>
              </button>
              <button
                class="w-full px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:text-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                @click="$router.push('/contact')"
              >
                <font-awesome-icon icon="location-dot" />
                <span>Contact & location</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>


