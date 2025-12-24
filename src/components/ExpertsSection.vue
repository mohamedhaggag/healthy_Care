<script setup>
const experts = [
  {
    name: 'Dr. James Dow',
    role: 'Nutrition Specialist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Diet', 'Health']
  },
  {
    name: 'Dr. Samy El-Sawy',
    role: 'Fitness & Recovery',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Rehab', 'Strength']
  },
  {
    name: 'Dr. Adam Chen',
    role: 'Holistic Health',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Mental', 'Yoga']
  },
  {
    name: 'Dr. Karim Hassan',
    role: 'Sports Medicine',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Sports', 'Recovery']
  }
]
</script>

<template>
  <section class="py-20 bg-[#fffdf8]">
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
        <div v-for="(expert, index) in experts" :key="expert.name" 
             class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2"
             data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="relative overflow-hidden h-96 cursor-pointer" @click="$router.push('/experts/dr-ahmed')">
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
            
            <button class="w-full py-2 border border-green-500/30 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
       <div class="text-center mt-12">
        <button class="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 shadow-lg shadow-green-200 transition-all duration-300">
           See All Experts
        </button>
      </div>
    </div>
  </section>
</template>
