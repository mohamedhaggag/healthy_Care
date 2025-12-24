<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminData } from '../composables/useAdminData'

const router = useRouter()
const { doctors } = useAdminData()

const search = ref('')
const filter = ref('All')

const specializations = computed(() => {
  const specs = new Set((doctors.value || []).map(d => d.specialization).filter(Boolean))
  return ['All', ...Array.from(specs)]
})

onMounted(() => {
  if (specializations.value.length > 0 && !specializations.value.includes(filter.value)) {
    filter.value = 'All'
  }
})

const filteredDoctors = computed(() => {
  const q = search.value.trim().toLowerCase()
  return (doctors.value || []).filter(d => {
    const matchesSearch =
      !q ||
      (d.name || '').toLowerCase().includes(q) ||
      (d.specialization || '').toLowerCase().includes(q) ||
      (d.tags || []).some(t => (t || '').toLowerCase().includes(q))
    const matchesFilter = filter.value === 'All' || d.specialization === filter.value
    return matchesSearch && matchesFilter
  })
})

const goToProfile = (doctorId) => {
  router.push(`/experts/${doctorId}`)
}
</script>

<template>
  <main class="min-h-screen bg-white pt-24 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-start justify-between gap-6 mb-10">
        <div>
          <h1 class="text-4xl font-bold text-dark">All Doctors</h1>
          <p class="text-gray-500 mt-2">This list updates automatically when you add doctors from the admin panel.</p>
        </div>
        <button
          class="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          @click="router.push('/')"
        >
          Back to Home
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
        <div class="md:col-span-8">
          <div class="relative">
            <font-awesome-icon icon="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search by name, specialization, or tag..."
              class="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none"
            />
          </div>
        </div>
        <div class="md:col-span-4">
          <select
            v-model="filter"
            class="w-full py-3 px-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-200 focus:border-green-300 outline-none"
          >
            <option v-for="s in specializations" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>

      <div v-if="filteredDoctors.length === 0" class="text-center py-16">
        <p class="text-gray-500 font-semibold">No doctors found.</p>
        <p class="text-gray-400 text-sm mt-2">Try changing the search or filter.</p>
      </div>

      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="doc in filteredDoctors"
          :key="doc.id"
          class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
        >
          <div class="relative overflow-hidden h-72 cursor-pointer" @click="goToProfile(doc.id)">
            <div class="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors z-10"></div>
            <img
              :src="doc.avatar || 'https://ui-avatars.com/api/?name=Doctor&background=00c288&color=fff'"
              :alt="doc.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div class="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
              <span
                v-for="tag in (doc.tags || []).slice(0, 3)"
                :key="tag"
                class="text-xs bg-white/90 backdrop-blur text-green-700 px-2 py-1 rounded-md font-semibold shadow-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-dark mb-1">{{ doc.name }}</h3>
            <p class="text-green-600 font-semibold mb-4">{{ doc.specialization }}</p>

            <div class="space-y-2 text-sm text-gray-600">
              <div v-if="doc.email" class="flex items-center gap-2">
                <font-awesome-icon icon="envelope" class="text-gray-400" />
                <span class="truncate">{{ doc.email }}</span>
              </div>
              <div v-if="doc.phone" class="flex items-center gap-2">
                <font-awesome-icon icon="phone" class="text-gray-400" />
                <span>{{ doc.phone }}</span>
              </div>
              <div v-if="doc.experience" class="flex items-center gap-2">
                <font-awesome-icon icon="briefcase" class="text-gray-400" />
                <span>{{ doc.experience }}</span>
              </div>
            </div>

            <button
              class="mt-6 w-full py-2.5 border border-green-500/30 text-green-700 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300 font-semibold"
              @click="goToProfile(doc.id)"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


