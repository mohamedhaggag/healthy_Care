<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminData } from '../composables/useAdminData'

const route = useRoute()
const router = useRouter()
const { doctors } = useAdminData()

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')

const doctorId = computed(() => String(route.params.id || ''))

const doctor = computed(() => {
  const list = doctors.value || []
  const id = doctorId.value
  return (
    list.find(d => String(d.id) === id) ||
    list.find(d => slugify(d.name) === id) ||
    null
  )
})

const avatar = computed(() => {
  return (
    doctor.value?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.value?.name || 'Doctor')}&background=00c288&color=fff`
  )
})

const goChat = () => {
  if (!doctor.value) return
  router.push({
    name: 'specialist-chat',
    query: {
      doctorId: String(doctor.value.id ?? doctorId.value),
      doctorName: doctor.value.name || '',
      doctorRole: doctor.value.specialization || ''
    }
  })
}

const goAppointment = () => {
  if (!doctor.value) return
  router.push({
    name: 'appointment',
    query: {
      doctorId: String(doctor.value.id ?? doctorId.value),
      doctorName: doctor.value.name || '',
      doctorRole: doctor.value.specialization || ''
    }
  })
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <main class="min-h-screen bg-[#fffdf8] pt-24 pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <router-link
        :to="`/experts/${doctorId}`"
        class="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 transition-colors group"
      >
        <font-awesome-icon icon="arrow-left" class="mr-2 group-hover:-translate-x-1 transition-transform" />
        Doctor Profile
      </router-link>

      <div v-if="!doctor" class="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Doctor not found</h1>
        <p class="text-gray-600 mb-6">This doctor might have been removed from the admin panel.</p>
        <button
          class="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
          @click="$router.push('/experts')"
        >
          Back to doctors
        </button>
      </div>

      <div v-else class="grid lg:grid-cols-12 gap-6">
        <section class="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <h1 class="text-xl font-bold text-gray-900">Choose an action</h1>
            <p class="text-sm text-gray-500 mt-1">Chat with the doctor or book an appointment.</p>
          </div>

          <div class="p-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100">
                <img :src="avatar" :alt="doctor.name" class="w-full h-full object-cover" />
              </div>
              <div class="min-w-0">
                <p class="text-lg font-bold text-gray-900 truncate">{{ doctor.name }}</p>
                <p class="text-sm text-green-600 font-semibold truncate">{{ doctor.specialization }}</p>
              </div>
            </div>

            <div class="mt-6 space-y-3">
              <button
                class="w-full px-6 py-4 rounded-2xl bg-green-600 text-white font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                @click="goChat"
              >
                <font-awesome-icon icon="comment-dots" />
                <span>Chat with Doctor</span>
              </button>
              <button
                class="w-full px-6 py-4 rounded-2xl bg-white border-2 border-green-200 text-green-700 font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                @click="goAppointment"
              >
                <font-awesome-icon icon="calendar" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </section>

        <aside class="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Contact info</h2>
            <p class="text-sm text-gray-500 mt-1">Quick details from the doctor profile.</p>
          </div>
          <div class="p-6 grid sm:grid-cols-2 gap-4 text-sm">
            <div v-if="doctor.email" class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="text-gray-500">Email</p>
              <p class="font-bold text-gray-900 break-all">{{ doctor.email }}</p>
            </div>
            <div v-if="doctor.phone" class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="text-gray-500">Phone</p>
              <p class="font-bold text-gray-900">{{ doctor.phone }}</p>
            </div>
            <div class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="text-gray-500">Clinic Location</p>
              <p class="font-bold text-gray-900">Egypt, Tanta</p>
            </div>
            <div class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="text-gray-500">Support Phone</p>
              <a class="font-bold text-gray-900 hover:text-green-600 transition-colors" href="tel:+201009291615">
                +01009291615
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>


