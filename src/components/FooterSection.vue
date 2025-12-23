<script setup>
const footerLinks = [
  {
    title: 'Support',
    links: ['Help Center', 'Account Information', 'About', 'Contact Us']
  },
  {
    title: 'Help',
    links: ['Services', 'Doctors', 'Apps', 'Clinic']
  },
  {
    title: 'Product',
    links: ['Employee Health', 'Access Medical', 'Virtual Care']
  }
]
</script>

<template>
  <footer class="bg-dark text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        <!-- Brand Info -->
        <div>
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <font-awesome-icon icon="leaf" />
            </div>
            <span class="font-bold text-xl tracking-tight">HealthyCare</span>
          </div>
          <p class="text-gray-400 mb-6 leading-relaxed">
            We are dedicated to providing the best health services to ensure a better lifestyle for everyone.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
              <font-awesome-icon icon="paper-plane" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
              <font-awesome-icon icon="phone" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
              <font-awesome-icon icon="envelope" />
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div v-for="section in footerLinks" :key="section.title">
          <h4 class="font-bold text-lg mb-6">{{ section.title }}</h4>
          <ul class="space-y-4">
            <li v-for="link in section.links" :key="link">
              <a href="#" class="text-gray-400 hover:text-green-500 transition-colors">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2024 HealthyCare. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-green-500">Privacy Policy</a>
          <a href="#" class="hover:text-green-500">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
