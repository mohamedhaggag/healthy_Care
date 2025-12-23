<script setup>
</script>

<template>
  <section class="relative py-32 overflow-hidden bg-cover bg-center h-[100vh]" style="background-image: url('/shop-bg.jpg');">
    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-dark/50 z-0"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-2xl text-center lg:text-left" data-aos="fade-right">
        <div class="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark shadow-sm">
              <font-awesome-icon icon="apple-whole" />
          </div>
          <span class="text-xl font-bold text-white tracking-widest uppercase">Healthy Care</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
          Shop products <span class="text-green-400">that</span><br/>
          support your daily wellness
        </h1>
        
        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
           <span class="px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold shadow-md">
             <font-awesome-icon icon="check" class="mr-1" /> Weight Gain
           </span>
           <span class="px-6 py-2 bg-white/20 text-white border border-white/30 rounded-full text-sm font-bold backdrop-blur-md">
              Weight Loss
           </span>
            <span class="px-6 py-2 bg-white/20 text-white border border-white/30 rounded-full text-sm font-bold backdrop-blur-md">
              Healthy Maintain
           </span>
        </div>
      </div>
    </div>
  </section>
</template>
