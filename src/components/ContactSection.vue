<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goContact = () => {
  router.push('/contact')
}
</script>

<template>
  <section class="relative py-20 px-4">
    <div 
      class="max-w-6xl mx-auto bg-[#eefbf2] rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
      data-aos="fade-up"
    >
      <div class="relative z-10">
        <h2 class="text-3xl md:text-5xl font-bold text-dark mb-6">
          Get Started & Take Care Of Your<br/>
          <span class="text-green-600">Healthy Life</span>
        </h2>
        <p class="text-gray-500 mb-8 max-w-2xl mx-auto">
          Join our community today and start your journey towards a healthier, happier you with our expert guidance.
        </p>
        <button @click="goContact" class="bg-green-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-green-300 hover:bg-green-700 hover:scale-105 transition-all duration-300">
          Contact Us <font-awesome-icon icon="arrow-right" class="ml-2" />
        </button>
      </div>
      
      <!-- Background gradients for CTA -->
      <div class="absolute -top-24 -left-24 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
    </div>
  </section>
</template>
