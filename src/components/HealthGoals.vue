<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goals = [
  {
    title: 'Weight Loss',
    description: 'We can manage your weight loss journey with our diet plan.',
    icon: 'weight-scale',
    color: 'text-red-400',
    bg: 'bg-red-50',
    btnClass: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
  },
  {
    title: 'Weight Gain',
    description: 'We can manage your weight gain journey with our diet plan.',
    icon: 'dumbbell',
    color: 'text-green-500',
    bg: 'bg-green-50',
    btnClass: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200'
  },
  {
    title: 'Health Maintain',
    description: 'We can manage your health maintenance with our diet plan.',
    icon: 'heart-pulse',
    color: 'text-blue-400',
    bg: 'bg-blue-50',
    btnClass: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
  }
]

const viewGoalPlan = (goalTitle) => {
  router.push({ path: '/plan', query: { goal: goalTitle } })
}
</script>

<template>
  <section class="py-20 bg-[#fffdf8]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 class="text-green-500 font-semibold mb-2 uppercase tracking-wide">Health Goals</h3>
      <h2 class="text-4xl md:text-5xl font-bold text-dark mb-16">
        Choose Your <span class="text-green-500">Health Goal</span>
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(goal, index) in goals" :key="goal.title" 
             class="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:-translate-y-2"
             data-aos="fade-up" :data-aos-delay="index * 100">
          
          <div :class="`w-16 h-16 rounded-2xl ${goal.bg} ${goal.color} flex items-center justify-center text-2xl mx-auto mb-6 transition-transform group-hover:scale-110`">
            <font-awesome-icon :icon="goal.icon" />
          </div>
          
          <h3 class="text-2xl font-bold text-dark mb-4">{{ goal.title }}</h3>
          <p class="text-gray-500 mb-8 leading-relaxed">{{ goal.description }}</p>
          
          <button @click="viewGoalPlan(goal.title)" :class="`px-8 py-3 rounded-full font-medium border transition-all duration-300 w-full md:w-auto ${goal.btnClass}`">
            View Plan <font-awesome-icon icon="arrow-right" class="ml-2 text-sm" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
