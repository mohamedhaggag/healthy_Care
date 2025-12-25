<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const done = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''
  done.value = false

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    error.value = 'Please fill in all fields.'
    return
  }

  // UI-only placeholder (no backend contact endpoint yet)
  await new Promise(resolve => setTimeout(resolve, 400))
  done.value = true
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <main class="min-h-screen bg-[#fffdf8] pt-24 pb-16">
    <section class="px-4 sm:px-6 lg:px-8">
      <div
        class="max-w-6xl mx-auto rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-[#f8fcfb]"
      >
        <div class="absolute -top-24 -right-24 w-80 h-80 bg-[#00c288]/15 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-green-200/40 rounded-full blur-3xl"></div>

        <div class="relative z-10">
          <p class="text-green-500 font-semibold mb-2 uppercase tracking-wide">Contact Us</p>
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900">
            We’re here to help you
          </h1>
          <p class="text-gray-600 text-lg mt-4 max-w-2xl">
            Visit our store or contact us anytime. We respond as quickly as possible during business hours.
          </p>
        </div>
      </div>
    </section>

    <section class="px-4 sm:px-6 lg:px-8 mt-10">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-6">
        <!-- Left: Info + Image -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Our Store</h2>
              <p class="text-sm text-gray-500 mt-1">Come say hello.</p>
            </div>
            <div class="p-6 space-y-4">
              <div class="grid gap-3">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                    <font-awesome-icon icon="location-dot" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Location</p>
                    <p class="font-bold text-gray-900">Egypt, Tanta</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                    <font-awesome-icon icon="phone" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Phone</p>
                    <a class="font-bold text-gray-900 hover:text-green-600 transition-colors" href="tel:+201009291615">
                      +01009291615
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                    <font-awesome-icon icon="clock" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Hours</p>
                    <p class="font-bold text-gray-900">Sat–Thu: 10:00–22:00</p>
                    <p class="text-sm text-gray-500">Fri: 14:00–22:00</p>
                  </div>
                </div>
              </div>

              <div class="rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src="/shop-bg.jpg"
                  alt="HealthyCare store"
                  class="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>

              <p class="text-sm text-gray-600">
                HealthyCare provides guidance, plans, and healthy products to support your wellness journey. Visit us for in-person help and product recommendations.
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Send us a message</h2>
              <p class="text-sm text-gray-500 mt-1">We’ll get back to you soon.</p>
            </div>

            <form class="p-6 space-y-4" @submit.prevent="submit">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-semibold text-gray-700">Full name</label>
                  <input
                    v-model="name"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label class="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label class="text-sm font-semibold text-gray-700">Message</label>
                <textarea
                  v-model="message"
                  rows="6"
                  class="mt-1 w-full resize-none px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  placeholder="Tell us how we can help…"
                />
              </div>

              <div v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {{ error }}
              </div>
              <div v-if="done" class="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                Message sent (demo). We’ll contact you soon.
              </div>

              <div class="flex items-center justify-end pt-1">
                <button
                  type="submit"
                  class="bg-green-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
