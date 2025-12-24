<script setup>
import { onMounted, ref } from 'vue'
import AOS from 'aos'
import ShopHero from '../components/ShopHero.vue'
import ProductFilter from '../components/ProductFilter.vue'
import ProductGrid from '../components/ProductGrid.vue'

// Filter state lifted to parent so both components can react
const priceRange = ref(100)
const rating = ref(0)
const category = ref('')

onMounted(() => {
  AOS.refresh()
})
</script>

<template>
  <main>
    <ShopHero />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid lg:grid-cols-4 gap-12">
        <!-- Sidebar Filter -->
        <aside class="lg:col-span-1">
           <ProductFilter v-model:priceRange="priceRange" v-model:rating="rating" v-model:category="category" />
        </aside>
        
        <!-- Main Content -->
        <div class="lg:col-span-3">
           <ProductGrid :price-range="priceRange" :rating="rating" :category="category" />
        </div>
      </div>
    </div>
  </main>
</template>
