<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const benefits = [
  'Supports healthy digestion',
  'Helps maintain steady blood sugar',
  'Promotes heart health',
  'Aids in weight management',
  'Feeds beneficial gut bacteria'
]

const fiberFoods = [
  { name: 'Lentils', amount: '15.6 g', serving: '1 cup cooked' },
  { name: 'Black Beans', amount: '15 g', serving: '1 cup cooked' },
  { name: 'Avocado', amount: '10 g', serving: '1 whole' },
  { name: 'Chia Seeds', amount: '10 g', serving: '2 tbsp' },
  { name: 'Broccoli', amount: '5 g', serving: '1 cup' },
  { name: 'Oats', amount: '4 g', serving: '1 cup cooked' },
]
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Content Side -->
        <div data-aos="fade-right">
           <span class="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
               <font-awesome-icon icon="leaf" /> Fiber Focus
           </span>
          <h2 class="text-3xl md:text-4xl font-bold text-dark mb-6">Why Fiber is Essential for Your Health</h2>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Most adults need 25-30 grams of fiber daily, but the average intake is only 15 grams. Boost your fiber intake with these naturally rich foods for better health.
          </p>

          <ul class="space-y-4 mb-8">
            <li v-for="benefit in benefits" :key="benefit" class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs shadow-sm">
                <font-awesome-icon icon="check" />
              </div>
              <span class="text-gray-700 font-medium">{{ benefit }}</span>
            </li>
          </ul>
        </div>

        <!-- Cards Side -->
        <div class="grid grid-cols-2 gap-4" data-aos="fade-left">
            <div v-for="food in fiberFoods" :key="food.name" class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 class="text-green-500 font-bold text-xl mb-1">{{ food.amount }}</h4>
                <div class="font-bold text-dark mb-1">{{ food.name }}</div>
                <div class="text-xs text-gray-400">{{ food.serving }}</div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>
