<script setup>
import { ref, watch, toRef } from 'vue'

const props = defineProps({
  priceRange: { type: Number, default: 100 },
  rating: { type: Number, default: 0 },
  category: { type: String, default: '' }
})
const emit = defineEmits(['update:priceRange', 'update:rating', 'update:category'])

const categories = [
  { name: 'Fresh Fruit', count: 25 },
  { name: 'Vegetables', count: 150 },
  { name: 'Meat', count: 18 },
  { name: 'Snacks', count: 47 },
  { name: 'Beverages', count: 10 },
  { name: 'Beauty & Health', count: 17 },
  { name: 'Bread & Bakery', count: 13 },
]

const ratings = [5, 4, 3, 2, 1]

const localPriceRange = ref(props.priceRange)
const localRating = ref(props.rating)
const localCategory = ref(props.category)

// Keep local state and emit updates to parent
watch(() => props.priceRange, (v) => localPriceRange.value = v)
watch(() => props.rating, (v) => localRating.value = v)
watch(() => props.category, (v) => localCategory.value = v)

watch(localPriceRange, (v) => emit('update:priceRange', v))
watch(localRating, (v) => emit('update:rating', v))
watch(localCategory, (v) => emit('update:category', v))
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
      <div @click="localCategory = ''" class="flex items-center justify-between mb-4 cursor-pointer">
        <h3 :class="['font-bold text-lg', localCategory === '' ? 'text-green-600' : 'text-dark']">All Categories</h3>
        <font-awesome-icon icon="chevron-up" class="text-xs text-gray-400" />
      </div>
      <ul class="space-y-3">
        <li v-for="cat in categories" :key="cat.name" @click="localCategory = (localCategory === cat.name ? '' : cat.name)" class="flex items-center gap-3 text-gray-600 cursor-pointer group">
          <div :class="`w-4 h-4 rounded border flex items-center justify-center transition-colors ${localCategory === cat.name ? 'bg-green-600 border-green-600' : 'border-gray-300 group-hover:border-green-400'}`">
             <font-awesome-icon v-if="localCategory === cat.name" icon="check" class="text-white text-[10px]" />
          </div>
          <span :class="{'font-medium text-green-600': localCategory === cat.name}">{{ cat.name }}</span>
        </li>
      </ul>
    </div>

    <!-- Price Range -->
    <div class="pt-4 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4 cursor-pointer">
        <h3 class="font-bold text-lg text-dark">Price</h3>
        <font-awesome-icon icon="chevron-up" class="text-xs text-gray-400" />
      </div>
      <input type="range" v-model="localPriceRange" min="0" max="100" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600">
      <div class="mt-2 text-sm text-gray-500 font-medium">
        From: <span class="text-dark font-bold">$0 - ${{ localPriceRange }}</span>
      </div>
    </div>
    
    <!-- Rating -->
    <div class="pt-4 border-t border-gray-100">
      <div class="flex items-center justify-between mb-4 cursor-pointer">
        <h3 class="font-bold text-lg text-dark">Rating</h3>
        <font-awesome-icon icon="chevron-up" class="text-xs text-gray-400" />
      </div>
      <ul class="space-y-2">
        <li v-for="stars in ratings" :key="stars" @click="localRating = (localRating === stars ? 0 : stars)" class="flex items-center gap-2 cursor-pointer group">
           <div :class="['w-4 h-4 rounded border flex items-center justify-center', localRating === stars ? 'bg-green-600 border-green-600' : 'border-gray-300 group-hover:border-green-400']"></div>
           <div class="flex text-yellow-400 text-xs">
             <font-awesome-icon v-for="n in 5" :key="n" :icon="n <= stars ? 'star' : ['far', 'star']" />
           </div>
           <span class="text-xs text-gray-500">{{ stars }}.0 & up</span>
        </li>
      </ul>
    </div>
  </div>
</template>
