<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <section class="py-20 px-4">
    <div class="max-w-5xl mx-auto bg-green-500 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden" data-aos="zoom-in">
        <!-- Decoration Circles -->
        <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
            <font-awesome-icon icon="envelope-open-text" />
            <span class="text-sm font-bold">Join Our Community</span>
        </div>
        
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Get Weekly Health Tips Delivered to Your Inbox</h2>
        <p class="text-green-50 mb-10 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive recipes, nutrition guides, and expert wellness advice.</p>
        
        <form class="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" @submit.prevent>
            <input type="email" placeholder="Enter Your Email" class="flex-grow px-6 py-4 rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg placeholder:text-gray-400" />
            <button class="px-8 py-4 bg-dark text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg">
                Subscribe
            </button>
        </form>
      </div>
    </div>
  </section>
</template>
