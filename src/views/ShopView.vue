<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import ShopHero from '../components/ShopHero.vue'
import ProductFilter from '../components/ProductFilter.vue'
import ProductGrid from '../components/ProductGrid.vue'

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
           <ProductFilter />
        </aside>
        
        <!-- Main Content -->
        <div class="lg:col-span-3">
           <ProductGrid />
        </div>
      </div>
    </div>
  </main>
</template>
