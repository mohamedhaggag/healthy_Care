<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <section class="relative bg-dark pt-32 pb-20 overflow-hidden">
    <!-- Background Image Overlay logic would go here if we had the specific image, using a placeholder/color for now that matches design -->
    <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" alt="Healthy Food" class="w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div class="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-2xl text-white" data-aos="fade-up">
        <!-- Tag -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <font-awesome-icon icon="leaf" class="text-green-400" />
            <span class="text-sm font-semibold tracking-wide">Your Guide to Healthier Living</span>
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Nourish Your Body with <span class="text-green-500">Nature's Best</span>
        </h1>
        
        <p class="text-gray-300 text-lg mb-8 leading-relaxed">
          Discover expert insights on nutrition, fiber-rich foods, and wholesome recipes to transform your health journey naturally.
        </p>

        <div class="flex flex-wrap gap-8 items-center">
            <button class="px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-green-50 transition-all duration-300 flex items-center gap-2 group">
                Explore Articles
                <font-awesome-icon icon="arrow-right" class="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div class="flex gap-8 text-sm font-medium" data-aos="fade-up" data-aos-delay="200">
                <div>
                    <span class="block text-green-400 font-bold text-lg">300+</span>
                    <span class="text-gray-400">Articles</span>
                </div>
                 <div>
                    <span class="block text-green-400 font-bold text-lg">15K+</span>
                     <span class="text-gray-400">Readers</span>
                </div>
                 <div>
                    <span class="block text-green-400 font-bold text-lg">500+</span>
                     <span class="text-gray-400">Recipes</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>
