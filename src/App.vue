<script setup>
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const isNoNavPage = computed(() => {
  return route.path === '/login' || 
         route.path === '/signup' || 
         route.path === '/doctor-dashboard'
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    <NavBar v-if="!isNoNavPage" />
    <RouterView />
    <FooterSection v-if="!isNoNavPage" />
  </div>
</template>

<style>
/* Global smooth scroll */
html {
  scroll-behavior: smooth;
}
</style>
