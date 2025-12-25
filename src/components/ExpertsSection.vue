<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminData } from '../composables/useAdminData'

const router = useRouter()
const { doctors } = useAdminData()

// Show up to 4 doctors on home section, dynamic from admin data
const experts = computed(() => {
  return (doctors.value || []).slice(0, 4).map(d => ({
    id: d.id,
    name: d.name,
    role: d.specialization,
    image: d.avatar || 'https://ui-avatars.com/api/?name=Doctor&background=00c288&color=fff',
    tags: d.tags || []
  }))
})

const goToExpert = (id) => {
  router.push(`/experts/${id}`)
}

const goToConsultation = (id) => {
  router.push({ name: 'expert-connect', params: { id } })
}

const goToAll = () => {
  router.push('/experts')
}
</script>

<template>
  <section id="experts" class="py-20 bg-[#fffdf8]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h3 class="text-green-500 font-semibold mb-2 uppercase tracking-wide">Experts</h3>
        <h2 class="text-4xl md:text-5xl font-bold text-dark">
          Meet Our <span class="text-green-500">Health Experts</span>
        </h2>
        <p class="mt-4 text-gray-500 max-w-2xl mx-auto">
          Our team of qualified professionals is here to guide you on your journey.
        </p>
      </div>

      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="(expert, index) in experts" :key="expert.id || expert.name" 
             class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2"
             data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="relative overflow-hidden h-96 cursor-pointer" @click="goToExpert(expert.id)">
            <div class="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors z-10 transition-all duration-300"></div>
            <img :src="expert.image" :alt="expert.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            
            <div class="absolute bottom-4 left-4 z-20 flex gap-2">
               <span v-for="tag in expert.tags" :key="tag" class="text-xs bg-white/90 backdrop-blur text-green-600 px-2 py-1 rounded-md font-medium shadow-sm">
                 {{ tag }}
               </span>
            </div>
          </div>
          
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold text-dark mb-1">{{ expert.name }}</h3>
            <p class="text-primary font-medium mb-4">{{ expert.role }}</p>
            
            <button
              class="w-full py-2 border border-green-500/30 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300"
              @click="goToConsultation(expert.id)"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <button @click="goToAll" class="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 shadow-lg shadow-green-200 transition-all duration-300">
           See All Experts
        </button>
      </div>
    </div>
  </section>
</template>
