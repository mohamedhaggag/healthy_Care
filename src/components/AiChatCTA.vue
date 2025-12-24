<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const go = () => router.push('/ai-chat')
</script>

<template>
  <section class="py-16 px-4">
    <div
      class="max-w-6xl mx-auto rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-[#f8fcfb]"
      data-aos="fade-up"
    >
      <div class="absolute -top-24 -right-24 w-80 h-80 bg-[#00c288]/15 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-green-200/40 rounded-full blur-3xl"></div>

      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c288]/10 text-[#00c288] text-sm font-semibold mb-5">
            <span class="w-2 h-2 rounded-full bg-[#00c288]"></span>
            AI Chat
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Ask anything and get instant answers
          </h2>
          <p class="text-gray-600 text-lg">
            A modern AI chat built into HealthyCare. Your OpenAI key is stored privately in <span class="font-semibold">.env</span>.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            @click="go"
            class="w-full md:w-auto bg-[#00c288] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#00c288]/25 hover:bg-[#00a872] hover:scale-[1.02] transition-all duration-300"
          >
            Open AI Chat
            <font-awesome-icon icon="arrow-right" class="ml-2" />
          </button>
          <button
            @click="router.push('/signup')"
            class="w-full md:w-auto bg-white text-gray-800 px-8 py-3.5 rounded-full font-bold border border-gray-200 hover:border-[#00c288]/30 hover:text-[#00c288] transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


