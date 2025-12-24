<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, isAuthenticated } = useAuth()
const currentMealIndex = ref(0)

// Redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})

// Get user profile data
const userProfile = computed(() => user.value?.profile || {})
const userName = computed(() => user.value?.firstName || user.value?.name || 'User')

// Calculate BMI
const bmi = computed(() => {
  if (!userProfile.value.height || !userProfile.value.currentWeight) {
    return 24 // Default
  }
  const heightInMeters = userProfile.value.height / 100
  const bmiValue = userProfile.value.currentWeight / (heightInMeters * heightInMeters)
  return Math.round(bmiValue * 10) / 10
})

// Get BMI category
const bmiCategory = computed(() => {
  const bmiValue = bmi.value
  if (bmiValue < 18.5) return 'Underweight'
  if (bmiValue < 25) return 'Normal'
  if (bmiValue < 30) return 'Overweight'
  return 'Obese'
})

// Calculate weight difference
const weightDifference = computed(() => {
  if (!userProfile.value.currentWeight || !userProfile.value.targetWeight) {
    return { value: 2, type: 'Lose' }
  }
  const diff = userProfile.value.currentWeight - userProfile.value.targetWeight
  if (diff > 0) {
    return { value: Math.abs(diff), type: 'Lose' }
  } else if (diff < 0) {
    return { value: Math.abs(diff), type: 'Gain' }
  }
  return { value: 0, type: 'Maintain' }
})

// Calculate achievable target (based on goal)
const achievableTarget = computed(() => {
  const diff = weightDifference.value
  if (diff.type === 'Lose') {
    // Assume 2 months for weight loss goal
    const weeks = 8
    const weeklyLoss = 0.5 // kg per week (safe rate)
    const achievable = weeks * weeklyLoss
    return {
      value: Math.min(achievable, diff.value),
      timeframe: '2 months'
    }
  } else if (diff.type === 'Gain') {
    const weeks = 8
    const weeklyGain = 0.3 // kg per week (safe rate)
    const achievable = weeks * weeklyGain
    return {
      value: Math.min(achievable, diff.value),
      timeframe: '2 months'
    }
  }
  return { value: 0, timeframe: '2 months' }
})
const meals = [
  {
    name: 'Breakfast',
    calories: 100,
    items: [
      '1 scrambled egg (100g, unsalted)',
      '1 tomato (50g, uncooked)',
      '1 slice whole-wheat bread',
      '1/2 cup mixed berries',
      '1 cup green tea (unsweetened)',
      '1 glass water'
    ]
  },
  {
    name: 'Mid-Morning',
    calories: 150,
    items: [
      '1 apple (150g)',
      '1 cup plain yogurt (100g)',
      '1/4 cup unsalted almonds',
      '1 cup green tea (unsweetened)',
      '1 glass water'
    ]
  },
  {
    name: 'Lunch',
    calories: 300,
    items: [
      '1 cup grilled chicken breast',
      '1 cup mixed green salad (spinach)',
      '1/2 cup quinoa (cooked)',
      '1 tbsp olive oil & lemon juice',
      '1 glass water'
    ]
  },
  {
    name: 'Afternoon',
    calories: 150,
    items: [
      '1 cup cottage cheese',
      '1/2 cup celery sticks',
      '1/4 cup walnuts',
      '1 cup green tea',
      '1 glass water'
    ]
  },
  {
    name: 'Dinner',
    calories: 300,
    items: [
      '1 cup baked salmon',
      '1 cup steamed broccoli',
      '1/2 cup brown rice',
      '1 tbsp soy sauce (low sodium)',
      '1 glass water'
    ]
  }
]

const nextMeal = () => {
  if (currentMealIndex.value < meals.length - 1) {
    currentMealIndex.value++
  } else {
    currentMealIndex.value = 0
  }
}

const morningExercises = [
  { name: 'Warm-up & dynamic stretching', description: '5-10 minutes of light movement' },
  { name: 'Cardio (light jog)', description: '20-30 minutes at moderate pace' },
  { name: 'Strength training (bodyweight)', description: '15-20 minutes of bodyweight exercises' },
  { name: 'Cool-down & static stretching', description: '5-10 minutes of stretching' }
]

const eveningExercises = [
  { name: 'Warm-up & dynamic stretching', description: '3-5 minutes of light movement' },
  { name: 'Yoga/Pilates (light)', description: '10-15 minutes of gentle yoga or Pilates' },
  { name: 'Cool-down & static stretching', description: '3-5 minutes of stretching' }
]

// Track completed items
const completedMeals = ref(new Set())
const completedMorningExercises = ref(new Set())
const completedEveningExercises = ref(new Set())

const toggleMealItem = (mealIndex, itemIndex) => {
  const key = `${mealIndex}-${itemIndex}`
  if (completedMeals.value.has(key)) {
    completedMeals.value.delete(key)
  } else {
    completedMeals.value.add(key)
  }
}

const toggleMorningExercise = (index) => {
  if (completedMorningExercises.value.has(index)) {
    completedMorningExercises.value.delete(index)
  } else {
    completedMorningExercises.value.add(index)
  }
}

const toggleEveningExercise = (index) => {
  if (completedEveningExercises.value.has(index)) {
    completedEveningExercises.value.delete(index)
  } else {
    completedEveningExercises.value.add(index)
  }
}

const isMealItemCompleted = (mealIndex, itemIndex) => {
  return completedMeals.value.has(`${mealIndex}-${itemIndex}`)
}

const isMorningExerciseCompleted = (index) => {
  return completedMorningExercises.value.has(index)
}

const isEveningExerciseCompleted = (index) => {
  return completedEveningExercises.value.has(index)
}

// Select all functions
const selectAllMeals = () => {
  meals[currentMealIndex.value].items.forEach((_, index) => {
    completedMeals.value.add(`${currentMealIndex.value}-${index}`)
  })
}

const clearAllMeals = () => {
  meals[currentMealIndex.value].items.forEach((_, index) => {
    completedMeals.value.delete(`${currentMealIndex.value}-${index}`)
  })
}

const selectAllMorningExercises = () => {
  morningExercises.forEach((_, index) => {
    completedMorningExercises.value.add(index)
  })
}

const clearAllMorningExercises = () => {
  completedMorningExercises.value.clear()
}

const selectAllEveningExercises = () => {
  eveningExercises.forEach((_, index) => {
    completedEveningExercises.value.add(index)
  })
}

const clearAllEveningExercises = () => {
  completedEveningExercises.value.clear()
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="/meal-plan-hero.png" alt="Meal Plan" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0a3d2e]/95 to-[#0a3d2e]/70"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left Side - Text -->
          <div class="text-white">
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
              {{ userName }}'s personal <span class="text-[#c8ff00]">health plan</span>
            </h1>
            <p class="text-xl text-gray-200 mb-8">
              Get a routine tailored specifically to your {{ userProfile.goal || 'health' }} goals.
            </p>
            <button class="px-8 py-3 bg-[#c8ff00] text-[#0a3d2e] font-semibold rounded-lg hover:bg-[#b3e600] transition-colors shadow-lg">
              Start Now
            </button>
          </div>
          
          <!-- Right Side - Stats Card -->
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-6">Your Progress</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-200">Current BMI</span>
                <span class="text-2xl font-bold text-[#c8ff00]">{{ bmi }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-200">Goal</span>
                <span class="text-lg font-semibold text-white">{{ weightDifference.type }} {{ weightDifference.value }}kg</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-200">Target Timeline</span>
                <span class="text-lg font-semibold text-white">{{ achievableTarget.timeframe }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Professional Weight Loss Program Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" data-aos="fade-up">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
          <span class="text-primary font-semibold text-sm uppercase tracking-wide">Certified Program</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-dark mb-6">
          Professional <span class="text-primary">Health Program</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Extensive Super-Nutrition & Exercise Program developed by Board-certified experts from WHO, CDC, and American College of Sports and Medicine.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <div class="text-center" data-aos="zoom-in" data-aos-delay="100">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <font-awesome-icon icon="certificate" class="text-primary text-2xl" />
            </div>
            <p class="font-bold text-dark">WHO Certified</p>
          </div>
          <div class="text-center" data-aos="zoom-in" data-aos-delay="200">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <font-awesome-icon icon="user-md" class="text-primary text-2xl" />
            </div>
            <p class="font-bold text-dark">Expert Doctors</p>
          </div>
          <div class="text-center" data-aos="zoom-in" data-aos-delay="300">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <font-awesome-icon icon="chart-line" class="text-primary text-2xl" />
            </div>
            <p class="font-bold text-dark">Track Progress</p>
          </div>
          <div class="text-center" data-aos="zoom-in" data-aos-delay="400">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <font-awesome-icon icon="trophy" class="text-primary text-2xl" />
            </div>
            <p class="font-bold text-dark">Proven Results</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Body Composition Analysis Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20 shadow-xl">
          <h3 class="text-3xl font-bold text-dark mb-8 text-center">Body Composition Analysis</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="100">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <font-awesome-icon icon="weight" class="text-primary text-2xl" />
              </div>
              <div class="text-5xl font-bold text-primary mb-2">{{ bmi }}</div>
              <div class="text-gray-600 font-semibold text-sm uppercase tracking-wide">BMI Index</div>
              <div class="mt-3 px-3 py-1 bg-primary/10 rounded-full inline-block">
                <span class="text-sm font-bold text-primary">{{ bmiCategory }}</span>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="200">
              <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <font-awesome-icon icon="chart-pie" class="text-blue-500 text-2xl" />
              </div>
              <div class="text-5xl font-bold text-blue-500 mb-2">{{ bmiCategory }}</div>
              <div class="text-gray-600 font-semibold text-sm uppercase tracking-wide">Category</div>
            </div>
            <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="300">
              <div class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <font-awesome-icon icon="bullseye" class="text-orange-500 text-2xl" />
              </div>
              <div class="text-4xl font-bold text-orange-500 mb-2">
                {{ weightDifference.value }}KG
              </div>
              <div class="text-gray-600 font-semibold text-sm uppercase tracking-wide">{{ weightDifference.type }}</div>
            </div>
            <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="400">
              <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <font-awesome-icon icon="trophy" class="text-green-500 text-2xl" />
              </div>
              <div class="text-4xl font-bold text-green-500 mb-2">
                {{ achievableTarget.value }}KG
              </div>
              <div class="text-gray-600 font-semibold text-sm uppercase tracking-wide">Target</div>
              <div class="text-xs text-gray-500 mt-2">{{ achievableTarget.timeframe }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Your Plan Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-dark mb-4">{{ userName }}'s Plan</h2>
        <p class="text-gray-600 text-lg max-w-4xl">
          A custom-controlled molecular diet plan according to the principles of nutritional science to achieve optimal body composition goals.
          <span v-if="userProfile.goal" class="font-semibold text-primary">
            Your goal: {{ userProfile.goal === 'weight-loss' ? 'Weight Loss' : userProfile.goal === 'weight-gain' ? 'Weight Gain' : 'Health Improvement' }}
          </span>
        </p>
      </div>
    </section>

    <!-- Meals Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-10">
          <div>
            <h2 class="text-4xl font-bold text-dark mb-2">Daily Meal Plan</h2>
            <p class="text-gray-600">Nutritionally balanced meals for optimal results</p>
          </div>
          <div class="flex items-center gap-3">
            <button 
              @click="selectAllMeals"
              class="px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <font-awesome-icon icon="check-double" />
              <span>Select All</span>
            </button>
            <button 
              @click="clearAllMeals"
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <font-awesome-icon icon="times" />
              <span>Clear All</span>
            </button>
            <button 
              @click="nextMeal"
              class="px-8 py-3 bg-primary text-white rounded-xl hover:bg-green-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>Next Meal</span>
              <font-awesome-icon icon="arrow-right" />
            </button>
          </div>
        </div>
        
        <div class="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-3xl font-bold text-dark mb-2">
                {{ meals[currentMealIndex].name }}
              </h3>
              <div class="flex items-center gap-2">
                <div class="px-4 py-1 bg-primary/10 rounded-full">
                  <span class="text-primary font-bold text-sm">{{ meals[currentMealIndex].calories }} Calories</span>
                </div>
              </div>
            </div>
            <div class="hidden md:block w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="utensils" class="text-primary text-3xl" />
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="(item, index) in meals[currentMealIndex].items" 
              :key="index"
              @click="toggleMealItem(currentMealIndex, index)"
              :class="[
                'flex items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer',
                isMealItemCompleted(currentMealIndex, index) ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-50 hover:bg-primary/5 border-2 border-transparent'
              ]"
            >
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200',
                isMealItemCompleted(currentMealIndex, index) ? 'bg-primary' : 'bg-gray-300'
              ]">
                <font-awesome-icon icon="check" class="text-white text-sm" />
              </div>
              <span :class="[
                'font-medium transition-all duration-200',
                isMealItemCompleted(currentMealIndex, index) ? 'text-primary line-through' : 'text-gray-700'
              ]">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notes from Doctor Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 md:p-10 shadow-lg">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="user-md" class="text-white text-xl" />
            </div>
            <h3 class="text-2xl font-bold text-dark">Doctor's Recommendations</h3>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <font-awesome-icon icon="tint" class="text-blue-500" />
              </div>
              <div>
                <h4 class="font-bold text-dark mb-1">Stay Hydrated</h4>
                <p class="text-gray-600 text-sm">Aim for at least 8 glasses of water throughout the day.</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <font-awesome-icon icon="calendar-check" class="text-green-500" />
              </div>
              <div>
                <h4 class="font-bold text-dark mb-1">Consistency is Key</h4>
                <p class="text-gray-600 text-sm">Follow the meal plan consistently and avoid skipping meals.</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <font-awesome-icon icon="chart-line" class="text-purple-500" />
              </div>
              <div>
                <h4 class="font-bold text-dark mb-1">Track Progress</h4>
                <p class="text-gray-600 text-sm">Monitor your progress weekly and adjust as needed.</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <font-awesome-icon icon="dumbbell" class="text-orange-500" />
              </div>
              <div>
                <h4 class="font-bold text-dark mb-1">Exercise Regularly</h4>
                <p class="text-gray-600 text-sm">Combine this diet plan with regular exercise for best results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exercise Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-dark mb-4">Exercise Routine</h2>
          <p class="text-gray-600 text-lg">Structured workout plan for optimal fitness</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Morning Session -->
          <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-2 border-orange-200 shadow-lg" data-aos="fade-right">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <font-awesome-icon icon="sun" class="text-white text-xl" />
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-dark">Morning Session</h3>
                <p class="text-orange-600 font-semibold">30-45 Minutes</p>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="selectAllMorningExercises"
                  class="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-semibold"
                  title="Select All"
                >
                  <font-awesome-icon icon="check-double" />
                </button>
                <button 
                  @click="clearAllMorningExercises"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                  title="Clear All"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>
            <ul class="space-y-3">
              <li 
                v-for="(exercise, index) in morningExercises" 
                :key="index"
                @click="toggleMorningExercise(index)"
                :class="[
                  'flex items-start gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer',
                  isMorningExerciseCompleted(index) ? 'bg-white border-2 border-orange-500' : 'bg-white shadow-sm hover:shadow-md border-2 border-transparent'
                ]"
              >
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200',
                  isMorningExerciseCompleted(index) ? 'bg-orange-500' : 'bg-gray-300'
                ]">
                  <font-awesome-icon icon="check" class="text-white text-sm" />
                </div>
                <div class="flex-1">
                  <div :class="[
                    'font-bold transition-all duration-200',
                    isMorningExerciseCompleted(index) ? 'text-orange-500 line-through' : 'text-gray-800'
                  ]">{{ exercise.name }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ exercise.description }}</div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Evening Session -->
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200 shadow-lg" data-aos="fade-left">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <font-awesome-icon icon="moon" class="text-white text-xl" />
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-dark">Evening Session</h3>
                <p class="text-purple-600 font-semibold">15-20 Minutes</p>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="selectAllEveningExercises"
                  class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-semibold"
                  title="Select All"
                >
                  <font-awesome-icon icon="check-double" />
                </button>
                <button 
                  @click="clearAllEveningExercises"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                  title="Clear All"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </div>
            <ul class="space-y-3">
              <li 
                v-for="(exercise, index) in eveningExercises" 
                :key="index"
                @click="toggleEveningExercise(index)"
                :class="[
                  'flex items-start gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer',
                  isEveningExerciseCompleted(index) ? 'bg-white border-2 border-purple-500' : 'bg-white shadow-sm hover:shadow-md border-2 border-transparent'
                ]"
              >
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200',
                  isEveningExerciseCompleted(index) ? 'bg-purple-500' : 'bg-gray-300'
                ]">
                  <font-awesome-icon icon="check" class="text-white text-sm" />
                </div>
                <div class="flex-1">
                  <div :class="[
                    'font-bold transition-all duration-200',
                    isEveningExerciseCompleted(index) ? 'text-purple-500 line-through' : 'text-gray-800'
                  ]">{{ exercise.name }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ exercise.description }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Chat with Specialist Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-aos="fade-up">
      <div class="max-w-7xl mx-auto">
        <div class="bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div class="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-4 border-white/30">
              <font-awesome-icon icon="user-md" class="text-5xl" />
            </div>
            <div class="flex-1 text-center md:text-left">
              <h3 class="text-3xl md:text-4xl font-bold mb-2">Dr. Ahmed Hassan</h3>
              <p class="text-green-100 text-lg mb-6">Nutritionist & Wellness Expert</p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button class="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                  <font-awesome-icon icon="comment-dots" />
                  <span>Chat with Specialist</span>
                </button>
                <button class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 flex items-center justify-center gap-2">
                  <font-awesome-icon icon="calendar" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

