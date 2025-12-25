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
  // Match by stored id (numeric/string) or by slugified name for backward compatibility
  return (
    list.find(d => String(d.id) === id) ||
    list.find(d => slugify(d.name) === id) ||
    null
  )
})

const avatar = computed(() => {
  return doctor.value?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.value?.name || 'Doctor')}&background=00c288&color=fff`
})

const goConsultation = () => {
  router.push({ name: 'expert-connect', params: { id: doctorId.value } })
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <main class="bg-white min-h-screen pt-24 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Link -->
      <router-link to="/experts" class="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 transition-colors group">
        <font-awesome-icon icon="arrow-left" class="mr-2 group-hover:-translate-x-1 transition-transform" />
        All Doctors
      </router-link>

      <div v-if="!doctor" class="bg-gray-50 border border-gray-100 rounded-3xl p-10 text-center">
        <h2 class="text-2xl font-bold text-dark mb-2">Doctor not found</h2>
        <p class="text-gray-600 mb-6">This doctor might have been removed from the admin panel.</p>
        <button @click="router.push('/experts')" class="bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 shadow-md transition-colors">
          Back to doctors
        </button>
      </div>

      <section v-else class="grid lg:grid-cols-12 gap-12 mb-16 items-start">
        <!-- Image -->
        <div class="lg:col-span-4" data-aos="fade-right">
          <div class="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative">
            <div class="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>
            <img :src="avatar" :alt="doctor.name" class="w-full h-auto object-cover md:h-[500px] lg:h-auto" />
          </div>
        </div>

        <!-- Info -->
        <div class="lg:col-span-8" data-aos="fade-left">
          <h1 class="text-4xl font-bold text-dark mb-2">{{ doctor.name }}</h1>
          <p class="text-green-600 font-bold text-lg mb-6">{{ doctor.specialization }}</p>

          <div class="flex flex-wrap gap-3 mb-8">
            <span v-for="tag in (doctor.tags || [])" :key="tag" class="px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm border border-green-100">
              {{ tag }}
            </span>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 mb-10">
            <div v-if="doctor.email" class="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
              <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <font-awesome-icon icon="envelope" />
              </div>
              <div>
                <p class="text-xs text-gray-400 font-semibold">Email</p>
                <p class="text-sm font-semibold text-dark break-all">{{ doctor.email }}</p>
              </div>
            </div>

            <div v-if="doctor.phone" class="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
              <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <font-awesome-icon icon="phone" />
              </div>
              <div>
                <p class="text-xs text-gray-400 font-semibold">Phone</p>
                <p class="text-sm font-semibold text-dark">{{ doctor.phone }}</p>
              </div>
            </div>

            <div v-if="doctor.experience" class="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
              <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <font-awesome-icon icon="briefcase" />
              </div>
              <div>
                <p class="text-xs text-gray-400 font-semibold">Experience</p>
                <p class="text-sm font-semibold text-dark">{{ doctor.experience }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
              <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <font-awesome-icon icon="user-md" />
              </div>
              <div>
                <p class="text-xs text-gray-400 font-semibold">Status</p>
                <p class="text-sm font-semibold text-dark">{{ doctor.status || 'Active' }}</p>
              </div>
            </div>
          </div>

          <button @click="goConsultation" class="bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 shadow-md transition-colors">
            Book a Consultation
          </button>
        </div>
      </section>

    </div>
  </main>
</template>
