<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { sendChat } from '../services/aiChat'

const STORAGE_KEY = 'ai_chat_messages_v1'

const input = ref('')
const isSending = ref(false)
const error = ref('')
const messages = ref([])

const containerRef = ref(null)
const inputRef = ref(null)

const quickQuestions = [
  'What are the benefits of eating a balanced diet?',
  'Which foods are rich in vitamins and minerals?',
  'How much water should I drink daily for good health?',
  'What are some healthy snack options?',
  'How can I reduce sugar intake in my diet?'
]

const canSend = computed(() => input.value.trim().length > 0 && !isSending.value)

const scrollToBottom = async () => {
  await nextTick()
  const el = containerRef.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
  } catch {
    // ignore
  }
}

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) messages.value = JSON.parse(raw)
  } catch {
    // ignore
  }
}

const resetChat = () => {
  messages.value = [
    {
      role: 'assistant',
      content:
        "Hi! Ask me anything. (Tip: your OpenAI key stays on the server — it’s never exposed in the browser.)"
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
  messages,
  () => {
    persist()
    scrollToBottom()
  },
  { deep: true }
)

const send = async () => {
  if (!canSend.value) return
  error.value = ''
  const text = input.value.trim()
  input.value = ''

  messages.value.push({ role: 'user', content: text })
  isSending.value = true

  try {
    const payload = [
      {
        role: 'system',
        content:
          'You are a helpful assistant. Answer clearly and safely. If unsure, ask a short clarifying question.'
      },
      ...messages.value.filter(m => m.role === 'user' || m.role === 'assistant')
    ]

    const reply = await sendChat(payload)
    messages.value.push({ role: 'assistant', content: reply })
  } catch (e) {
    error.value = e?.message || 'Failed to send message'
  } finally {
    isSending.value = false
  }
}

const useQuickQuestion = async (q) => {
  if (isSending.value) return
  input.value = q
  await nextTick()
  inputRef.value?.focus?.()
}
</script>

<template>
  <main class="min-h-screen bg-[#f8fcfb] pt-24 pb-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">AI Chat</h1>
          <p class="text-gray-500 mt-2">
            Ask any question and get answers powered by OpenAI. Your API key is stored in <span class="font-semibold">.env</span>.
          </p>
        </div>

        <button
          @click="resetChat"
          class="shrink-0 px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-gray-700 font-semibold"
        >
          New chat
        </button>
      </div>

      <div class="grid md:grid-cols-12 gap-6">
        <!-- Chat -->
        <section class="md:col-span-12 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-[#00c288]/10 text-[#00c288] flex items-center justify-center">
                <font-awesome-icon icon="robot" />
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900 leading-tight">HealthyCare Assistant</p>
                <p class="text-[11px] text-gray-400">Fast answers • Modern UI</p>
              </div>
            </div>
            <span
              class="text-[11px] px-2.5 py-1 rounded-full border"
              :class="isSending ? 'border-orange-200 text-orange-600 bg-orange-50' : 'border-green-200 text-green-700 bg-green-50'"
            >
              {{ isSending ? 'Thinking…' : 'Ready' }}
            </span>
          </div>

          <div ref="containerRef" class="h-[520px] overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-white to-[#f8fcfb]">
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

          <div class="px-6 py-4 border-t border-gray-100 bg-white">
            <div v-if="error" class="mb-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {{ error }}
            </div>

            <div class="mb-3 flex flex-wrap gap-2">
              <button
                v-for="q in quickQuestions"
                :key="q"
                type="button"
                class="text-xs px-3 py-2 rounded-full border border-gray-200 bg-white hover:bg-[#00c288]/5 hover:border-[#00c288]/30 transition-all text-gray-700 font-semibold"
                @click="useQuickQuestion(q)"
              >
                {{ q }}
              </button>
            </div>

            <form class="flex items-end gap-3" @submit.prevent="send">
              <div class="flex-1">
                <label class="sr-only" for="chat">Message</label>
                <textarea
                  id="chat"
                  v-model="input"
                  ref="inputRef"
                  rows="2"
                  placeholder="Type your question…"
                  class="w-full resize-none px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                :disabled="!canSend"
                class="px-5 py-3 rounded-2xl font-bold transition-all shadow-sm"
                :class="
                  canSend
                    ? 'bg-[#00c288] text-white hover:bg-[#00a872] hover:shadow-md'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                "
              >
                Send
              </button>
            </form>
          </div>
        </section>

        <!-- Sidebar removed for cleaner design -->
      </div>
    </div>
  </main>
</template>


