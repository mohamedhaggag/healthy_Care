<script setup>
const plans = [
  {
    name: 'Free',
    price: '0',
    features: ['5 Days in a Week', '01 Sweatshirt', '01 Bottle of Protein', 'Access to Videos', 'Community Support'],
    recommended: false,
    activeFeatures: 2 // First 2 features active
  },
  {
    name: 'Mid',
    price: '23',
    features: ['5 Days in a Week', '01 Sweatshirt', '01 Bottle of Protein', 'Access to Videos', 'Community Support'],
    recommended: true,
    activeFeatures: 5 // All active
  },
  {
    name: 'Pro',
    price: '123',
    features: ['5 Days in a Week', '01 Sweatshirt', '01 Bottle of Protein', 'Access to Videos', 'Community Support', 'Personal Coach'],
    recommended: false,
    activeFeatures: 6 // All active
  }
]
</script>

<template>
  <section class="py-20 bg-[#fffdf8]" id="plans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 class="text-green-500 font-semibold mb-2 uppercase tracking-wide">The Plans</h3>
      <h2 class="text-4xl md:text-5xl font-bold text-dark mb-16">
        Choose Your Plan And Start<br/>
        Your <span class="text-green-500">Health Journey</span>
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(plan, index) in plans" :key="plan.name" 
             :class="`relative p-8 rounded-3xl transition-all duration-300 ${plan.recommended ? 'bg-white shadow-xl scale-105 border-green-500 border-2 z-10' : 'bg-white shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1'}`"
             data-aos="fade-up" :data-aos-delay="index * 150">
          
          <div v-if="plan.recommended" class="absolute top-0 right-0 left-0 bg-green-500 text-white text-sm font-bold py-1 rounded-t-lg mx-auto w-32 -mt-4 uppercase tracking-widest shadow-md">
             Recommended
          </div>

          <p class="text-gray-500 font-medium mb-4">Plan {{ plan.name }}</p>
          <div class="flex items-baseline justify-center mb-8">
            <span class="text-4xl font-bold text-dark">$</span>
            <span class="text-6xl font-bold text-dark tracking-tight">{{ plan.price }}</span>
            <span class="text-gray-400 ml-1">/mo</span>
          </div>

          <ul class="space-y-4 mb-8 text-left max-w-xs mx-auto">
            <li v-for="(feature, index) in plan.features" :key="index" class="flex items-center gap-3">
              <div :class="`w-5 h-5 rounded-full flex items-center justify-center text-xs ${index < plan.activeFeatures ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`">
                <font-awesome-icon icon="check" />
              </div>
              <span :class="index < plan.activeFeatures ? 'text-gray-700' : 'text-gray-400 line-through decoration-gray-300'">
                {{ feature }}
              </span>
            </li>
          </ul>

          <button :class="`w-full py-3 rounded-full font-bold transition-all duration-300 ${plan.recommended ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200' : 'border border-green-600 text-green-600 hover:bg-green-50'}`">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
