<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const categories = [
  { icon: 'apple-whole', name: 'Nutrition Basics', desc: 'Master nutritional optimal health' },
  { icon: 'carrot', name: 'Fiber-Rich Food', desc: 'Boost digestion daily' },
  { icon: 'blender', name: 'Healthy Recipes', desc: 'Delicious and nutritious meal' },
  { icon: 'bowl-rice', name: 'Super Food', desc: 'Power nutritional boost' },
  { icon: 'heart-pulse', name: 'Heart Health', desc: 'Keep your ticker strong' },
  { icon: 'leaf', name: 'Plant-Based', desc: 'Green vegetarian options' },
]
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-dark mb-4">Explore Health Topics</h2>
      <p class="text-gray-600 mb-12 max-w-2xl mx-auto">Dive into our curated categories and discover articles that match your wellness goals.</p>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="(cat, index) in categories" :key="cat.name" 
             class="p-6 bg-white border border-gray-100 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all duration-300 group cursor-pointer text-center"
             data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="w-12 h-12 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <font-awesome-icon :icon="cat.icon" class="text-xl"/>
            </div>
            <h3 class="font-bold text-dark text-sm mb-2">{{ cat.name }}</h3>
            <p class="text-xs text-gray-500 leading-tight">{{ cat.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
