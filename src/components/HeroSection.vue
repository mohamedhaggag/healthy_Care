<script setup>
</script>

<template>
  <section class="relative bg-secondary overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <!-- Text Content -->
        <div class="text-center lg:text-left z-10" data-aos="fade-right">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
            <span class="w-2 h-2 rounded-full bg-primary"></span>
            Change Your Habit
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
            Change Your Body <br/>
            <span class="text-primary">=</span> <span class="text-primary">Change Your Life</span>
          </h1>
          
          <p class="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Consistently eat good food and incorporate healthy habits into your daily routine to transform your life and well-being.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12" data-aos="fade-up" data-aos-delay="200">
            <button class="bg-primary text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              View Our Plans
            </button>
            <button class="group flex items-center justify-center gap-2 bg-white text-dark font-semibold px-8 py-3.5 rounded-full border border-gray-200 hover:border-primary/50 hover:text-primary transition-all duration-300">
              <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <font-awesome-icon icon="play" class="text-xs ml-0.5" />
              </span>
              Watch Video
            </button>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start gap-8 border-t border-gray-200 pt-8 mt-8" data-aos="fade-up" data-aos-delay="300">
            <div class="text-center sm:text-left">
              <h4 class="text-2xl font-bold text-dark">10k+</h4>
              <p class="text-sm text-gray-500">Active Members</p>
            </div>
            <div class="text-center sm:text-left">
              <h4 class="text-2xl font-bold text-dark">50+</h4>
              <p class="text-sm text-gray-500">Expert Trainers</p>
            </div>
            <div class="text-center sm:text-left">
              <h4 class="text-2xl font-bold text-dark">96%</h4>
              <p class="text-sm text-gray-500">Satisfaction Rate</p>
            </div>
          </div>
        </div>
        
        <!-- Image Content -->
        <div class="relative w-full flex items-center justify-center px-4 py-8 lg:py-0" data-aos="fade-left" data-aos-delay="200">
          <div class="relative w-full max-w-lg lg:max-w-none">
             <!-- Blob background effect -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-200/40 to-yellow-100/40 rounded-full blur-3xl -z-10"></div>
            
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000&auto=format&fit=crop" 
                 alt="Healthy Lifestyle & Nutrition" 
                 class="w-full h-[600px] rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500 object-cover" />
                 
            <!-- Floating Badge: Healthy Choice -->
            <div class="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow" style="animation-delay: 1.5s;" data-aos="zoom-in" data-aos-delay="700">
               <div class="w-12 h-12 rounded-xl overflow-hidden shadow-inner">
                 <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" alt="Healthy Food" class="w-full h-full object-cover">
               </div>
               <div>
                  <p class="text-xs text-gray-500 font-semibold">Healthy Choice</p>
                  <p class="text-sm font-bold text-green-500">100% Organic</p>
               </div>
            </div>

             <!-- Floating Badge -->
            <div class="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow" data-aos="zoom-in" data-aos-delay="500">
               <div class="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                 <font-awesome-icon icon="heart" />
               </div>
               <div>
                  <p class="text-xs text-gray-500 font-semibold">Calories Burned</p>
                  <p class="text-sm font-bold text-dark">500+ kcal</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(5%); }
}
</style>
