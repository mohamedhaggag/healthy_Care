<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { user } = useAuth()

const fullName = computed(() => user.value?.name || `${user.value?.firstName || ''} ${user.value?.lastName || ''}`.trim() || 'User')

const selectedDoctorName = computed(() => String(route.query.doctorName || 'the specialist'))
const selectedDoctorRole = computed(() => String(route.query.doctorRole || ''))

const form = ref({
  name: fullName.value,
  phone: '',
  date: '',
  time: '',
  notes: ''
})

const error = ref('')
const done = ref(false)
const isSubmitting = ref(false)

const submit = async () => {
  error.value = ''
  done.value = false

  if (!form.value.name.trim() || !form.value.phone.trim() || !form.value.date || !form.value.time) {
    error.value = 'Please fill in name, phone, date, and time.'
    return
  }

  isSubmitting.value = true
  try {
    // UI-only placeholder (no backend endpoint yet)
    const appt = {
      ...form.value,
      doctorId: String(route.query.doctorId || ''),
      doctorName: String(route.query.doctorName || ''),
      doctorRole: String(route.query.doctorRole || ''),
      createdAt: new Date().toISOString()
    }
    const key = 'appointments_v1'
    const prev = JSON.parse(localStorage.getItem(key) || '[]')
    prev.unshift(appt)
    localStorage.setItem(key, JSON.stringify(prev.slice(0, 20)))
    done.value = true
  } catch (e) {
    error.value = e?.message || 'Failed to book appointment'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#fffdf8] pt-24 pb-16">
    <section class="px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <p class="text-green-500 font-semibold mb-2 uppercase tracking-wide">Appointment</p>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Book Appointment</h1>
          <p class="text-gray-600 mt-2">
            Choose a date and time to meet <span class="font-semibold">{{ selectedDoctorName }}</span>.
            <span v-if="selectedDoctorRole" class="text-gray-500">({{ selectedDoctorRole }})</span>
            . We’ll confirm your booking by phone.
          </p>
        </div>

        <div class="grid lg:grid-cols-12 gap-6">
          <section class="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Your details</h2>
              <p class="text-sm text-gray-500 mt-1">All fields marked are required.</p>
            </div>

            <form class="p-6 space-y-4" @submit.prevent="submit">
              <div>
                <label class="text-sm font-semibold text-gray-700">Full name *</label>
                <input
                  v-model="form.name"
                  class="mt-1 w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-gray-700">Phone *</label>
                <input
                  v-model="form.phone"
                  class="mt-1 w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  placeholder="+0100..."
                />
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-semibold text-gray-700">Date *</label>
                  <input
                    v-model="form.date"
                    type="date"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  />
                </div>
                <div>
                  <label class="text-sm font-semibold text-gray-700">Time *</label>
                  <input
                    v-model="form.time"
                    type="time"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label class="text-sm font-semibold text-gray-700">Notes (optional)</label>
                <textarea
                  v-model="form.notes"
                  rows="4"
                  class="mt-1 w-full resize-none px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#00c288]/20 focus:border-[#00c288]/30 outline-none text-sm"
                  placeholder="Any details (goal, health issues, preferred time)…"
                />
              </div>

              <div v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {{ error }}
              </div>
              <div v-if="done" class="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                Appointment requested (demo). We’ll confirm by phone soon.
              </div>

              <div class="flex items-center justify-end pt-1">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-8 py-3.5 rounded-2xl font-bold shadow-lg transition-all duration-300"
                  :class="isSubmitting ? 'bg-gray-200 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200 hover:shadow-xl'"
                >
                  {{ isSubmitting ? 'Submitting…' : 'Confirm Booking' }}
                </button>
              </div>
            </form>
          </section>

          <aside class="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Clinic info</h2>
              <p class="text-sm text-gray-500 mt-1">Where we are located.</p>
            </div>
            <div class="p-6 space-y-4 text-sm">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <font-awesome-icon icon="location-dot" />
                </div>
                <div>
                  <p class="text-gray-500">Location</p>
                  <p class="font-bold text-gray-900">Egypt, Tanta</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <font-awesome-icon icon="phone" />
                </div>
                <div>
                  <p class="text-gray-500">Phone</p>
                  <a class="font-bold text-gray-900 hover:text-green-600 transition-colors" href="tel:+201009291615">
                    +01009291615
                  </a>
                </div>
              </div>
              <div class="rounded-2xl overflow-hidden border border-gray-100">
                <img src="/shop-bg.jpg" alt="Store" class="w-full h-40 object-cover" loading="lazy" />
              </div>
              <button
                class="w-full px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:text-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                @click="$router.push('/contact')"
              >
                <font-awesome-icon icon="circle-info" />
                <span>More contact details</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>


