<script setup>
</script>

<template>
  <section class="py-20 bg-white overflow-hidden relative">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 -skew-x-12 translate-x-1/4 -z-10"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text Side -->
        <div data-aos="fade-right">
          <h3 class="text-green-500 font-semibold mb-2 uppercase tracking-wide">Testimonials</h3>
          <h2 class="text-4xl md:text-5xl font-bold text-dark mb-8">
            Real Results, <span class="text-green-500">Real People</span>
          </h2>
          
          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative">
            <font-awesome-icon icon="quote-left" class="text-green-200 text-6xl absolute -top-6 -left-4 -z-10" />
            
            <p class="text-lg text-gray-600 italic mb-6 leading-relaxed">
              "I struggled with my weight for years until I found Healthy Care. The personalized plans and expert guidance made all the difference. I've lost 30lbs and feel more energetic than ever before!"
            </p>
            
            <div class="flex items-center gap-4">
               <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                 TD
               </div>
               <div>
                 <h4 class="font-bold text-dark">Tom David</h4>
                 <div class="flex text-yellow-400 text-sm">
                   <font-awesome-icon icon="star" v-for="i in 5" :key="i" />
                 </div>
               </div>
            </div>
          </div>
          
          <div class="mt-8 flex gap-4">
             <button class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-500 transition-colors">
               <font-awesome-icon icon="arrow-left" class="text-gray-500" />
             </button>
             <button class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-500 transition-colors">
               <font-awesome-icon icon="arrow-right" class="text-gray-500" />
             </button>
             
             <div class="ml-auto flex items-center gap-2">
                <span class="text-2xl font-bold text-dark">4.9</span>
                <div class="flex flex-col text-xs text-gray-500">
                  <span>Average</span>
                  <span>Rating</span>
                </div>
             </div>
          </div>
        </div>
        
        <!-- Image Side -->
        <div class="relative">
           <div class="absolute inset-0 bg-green-500 rounded-[3rem] rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
           <img src="https://placehold.co/600x600/eefbf2/0ca84d?text=Before+After+Result" 
                alt="Weight Loss Transformation" 
                class="relative rounded-[3rem] shadow-2xl w-full object-cover z-10 rotate-0 hover:rotate-1 transition-transform duration-500" />
           
           <div class="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl z-20 animate-pulse-slow hidden md:block">
              <p class="text-green-600 font-bold text-4xl mb-1">-30lbs</p>
              <p class="text-gray-500 text-sm font-medium">In just 3 months</p>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
