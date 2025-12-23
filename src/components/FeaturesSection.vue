<script setup>
const features = [
  {
    id: 1,
    title: 'Great Daily Workout',
    description: 'We have many different types of workouts for you to start.',
    icon: 'person-running',
    bg: 'bg-green-50'
  },
  {
    id: 2,
    title: 'Daily Meal Plans',
    description: 'Detailed daily meal plans to keep your diet on track.',
    icon: 'utensils',
    bg: 'bg-orange-50'
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description: 'Keep track of your calories and progress daily everywhere.',
    icon: 'chart-line',
    bg: 'bg-blue-50'
  },
  {
    id: 4,
    title: 'Standard Diet Plan',
    description: 'Follow our standard diet plans for best results in time.',
    icon: 'apple-whole',
    bg: 'bg-red-50'
  }
]
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h3 class="text-green-500 font-semibold mb-2 uppercase tracking-wide">Why Choose Us</h3>
        <h2 class="text-4xl md:text-5xl font-bold text-dark">
          We Make Your <span class="text-green-500">Health Easy</span>
        </h2>
        <p class="mt-4 text-gray-500 max-w-2xl mx-auto">
          Our features are designed to simplify your health journey with proven methods and expert guidance.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(feature, index) in features" :key="feature.id" 
             class="p-6 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1 bg-white group"
             data-aos="fade-up" :data-aos-delay="index * 100">
          
          <div :class="`w-14 h-14 rounded-full ${feature.bg} text-dark flex items-center justify-center text-xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`">
            <font-awesome-icon :icon="feature.icon" class="opacity-80"/>
          </div>
          
          <h3 class="text-xl font-bold text-dark mb-3">{{ feature.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
