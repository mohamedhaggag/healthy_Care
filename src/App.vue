<script setup>
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/signup'
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    <NavBar v-if="!isAuthPage" />
    <RouterView />
    <FooterSection v-if="!isAuthPage" />
  </div>
</template>

<style>
/* Global smooth scroll */
html {
  scroll-behavior: smooth;
}
</style>
