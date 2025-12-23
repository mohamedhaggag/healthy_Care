<script setup>
import { ref } from 'vue'

const categories = [
  { name: 'Fresh Fruit', count: 25, active: false },
  { name: 'Vegetables', count: 150, active: true },
  { name: 'Meat', count: 18, active: false },
  { name: 'Snacks', count: 47, active: false },
  { name: 'Beverages', count: 10, active: false },
  { name: 'Beauty & Health', count: 17, active: false },
  { name: 'Bread & Bakery', count: 13, active: false },
]

const ratings = [5, 4, 3, 2, 1]
const priceRange = ref(50)
</script>

<template>
  <div class="space-y-8">
    <!-- Filter Header -->
    <div class="flex items-center justify-between pb-4 border-b border-gray-100">
       <button class="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors">
         <font-awesome-icon icon="sliders" /> Filter
       </button>
    </div>

    <!-- Categories -->
    <div>
      <div class="flex items-center justify-between mb-4 cursor-pointer">
        <h3 class="font-bold text-lg text-dark">All Categories</h3>
        <font-awesome-icon icon="chevron-up" class="text-xs text-gray-400" />
      </div>
      <ul class="space-y-3">
        <li v-for="cat in categories" :key="cat.name" class="flex items-center gap-3 text-gray-600 hover:text-green-600 cursor-pointer group">
          <div :class="`w-4 h-4 rounded border flex items-center justify-center transition-colors ${cat.active ? 'bg-green-600 border-green-600' : 'border-gray-300 group-hover:border-green-400'}`">
             <font-awesome-icon v-if="cat.active" icon="check" class="text-white text-[10px]" />
          </div>
          <span :class="{'font-medium text-green-600': cat.active}">{{ cat.name }}</span>
          <span class="text-xs text-gray-400 ml-auto">({{ cat.count }})</span>
        </li>
      </ul>
    </div>

    <!-- Price Range -->
    <div class="pt-4 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4 cursor-pointer">
        <h3 class="font-bold text-lg text-dark">Price</h3>
        <font-awesome-icon icon="chevron-up" class="text-xs text-gray-400" />
      </div>
      <input type="range" v-model="priceRange" min="0" max="100" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600">
      <div class="mt-2 text-sm text-gray-500 font-medium">
        From: <span class="text-dark font-bold">$0 - ${{ priceRange }}</span>
      </div>
    </div>
    
    <!-- Rating -->
    <div class="pt-4 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4 cursor-pointer">
        <h3 class="font-bold text-lg text-dark">Rating</h3>
        <font-awesome-icon icon="chevron-up" class="text-xs text-gray-400" />
      </div>
      <ul class="space-y-2">
        <li v-for="stars in ratings" :key="stars" class="flex items-center gap-2 cursor-pointer group">
           <div class="w-4 h-4 rounded border border-gray-300 flex items-center justify-center group-hover:border-green-400"></div>
           <div class="flex text-yellow-400 text-xs">
             <font-awesome-icon v-for="n in 5" :key="n" :icon="n <= stars ? 'star' : ['far', 'star']" />
           </div>
           <span class="text-xs text-gray-500">{{ stars }}.0 & up</span>
        </li>
      </ul>
    </div>
  </div>
</template>
