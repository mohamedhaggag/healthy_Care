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
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-dark text-white py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left Side - Text -->
          <div>
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
              {{ userName }}'s personal <span class="text-primary">health plan</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8">
              Get a routine tailored specifically to your {{ userProfile.goal || 'health' }} goals.
            </p>
            <button class="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg">
              Start Now
            </button>
          </div>
          
          <!-- Right Side - Notebook Illustration -->
          <div class="relative">
            <div class="bg-white rounded-lg shadow-2xl p-8 text-dark">
              <div class="flex gap-4">
                <!-- Left Page -->
                <div class="flex-1 border-r-2 border-gray-200 pr-4">
                  <h3 class="font-bold text-lg mb-4 text-gray-600">MEAL</h3>
                  <ul class="space-y-2">
                    <li class="text-sm">Day 1</li>
                    <li class="text-sm">Day 2</li>
                    <li class="text-sm">Day 3</li>
                    <li class="text-sm">Day 4</li>
                    <li class="text-sm">Day 5</li>
                  </ul>
                </div>
                <!-- Right Page -->
                <div class="flex-1 pl-4">
                  <h3 class="font-bold text-2xl mb-4">MEAL PLAN</h3>
                  <div class="space-y-3">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-primary"></div>
                      <span class="text-sm">Breakfast</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-primary"></div>
                      <span class="text-sm">Lunch</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-primary"></div>
                      <span class="text-sm">Dinner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Decorative Icons -->
            <div class="absolute -top-4 -right-4 w-12 h-12 text-primary opacity-20">
              <font-awesome-icon icon="carrot" class="text-4xl" />
            </div>
            <div class="absolute -bottom-4 -left-4 w-12 h-12 text-primary opacity-20">
              <font-awesome-icon icon="weight" class="text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Professional Weight Loss Program Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">
          Professional Weight Loss Program
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Extensive Super-Nutrition & Exercise Program developed by Board-certified experts from WHO, CDC, and American College of Sports and Medicine.
        </p>
      </div>
    </section>

    <!-- Body Composition Analysis Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div class="max-w-7xl mx-auto">
        <div class="border-2 border-primary rounded-xl p-8 bg-white">
          <h3 class="text-2xl font-bold text-dark mb-6">Body Composition Analysis</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-secondary rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-primary mb-2">{{ bmi }}</div>
              <div class="text-gray-600 font-medium">BMI</div>
              <div class="text-sm text-primary mt-2">{{ bmiCategory }}</div>
            </div>
            <div class="bg-secondary rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-primary mb-2">{{ bmiCategory }}</div>
              <div class="text-gray-600 font-medium">Category</div>
            </div>
            <div class="bg-secondary rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-primary mb-2">
                {{ weightDifference.type }} {{ weightDifference.value }}KG
              </div>
              <div class="text-gray-600 font-medium">Maintain/Lose/Gain (KG)</div>
            </div>
            <div class="bg-secondary rounded-lg p-6 text-center">
              <div class="text-4xl font-bold text-primary mb-2">
                {{ weightDifference.type }} {{ achievableTarget.value }}KG
              </div>
              <div class="text-gray-600 font-medium">Achievable Target</div>
              <div class="text-sm text-gray-500 mt-2">within {{ achievableTarget.timeframe }}</div>
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
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-dark">Meals</h2>
          <button 
            @click="nextMeal"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Next
          </button>
        </div>
        
        <div class="bg-secondary rounded-xl p-8 border-2 border-primary/20">
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-dark mb-2">
              {{ meals[currentMealIndex].name }} ({{ meals[currentMealIndex].calories }} Cal)
            </h3>
          </div>
          
          <ul class="space-y-3">
            <li 
              v-for="(item, index) in meals[currentMealIndex].items" 
              :key="index"
              class="flex items-center gap-3"
            >
              <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <font-awesome-icon icon="check" class="text-white text-xs" />
              </div>
              <span class="text-gray-700">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Notes from Doctor Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div class="max-w-7xl mx-auto">
        <div class="bg-primary/10 border-2 border-primary/30 rounded-xl p-8">
          <h3 class="text-xl font-bold text-dark mb-4">Notes from doctor:</h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start gap-3">
              <span class="text-primary mt-1">•</span>
              <span>Stay hydrated throughout the day. Aim for at least 8 glasses of water.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary mt-1">•</span>
              <span>Follow the meal plan consistently and avoid skipping meals.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary mt-1">•</span>
              <span>Monitor your progress weekly and adjust as needed.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary mt-1">•</span>
              <span>Combine this diet plan with regular exercise for best results.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Exercise Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-dark mb-8">Exercise</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Morning Session -->
          <div class="bg-secondary rounded-xl p-6 border-2 border-primary/20">
            <h3 class="text-xl font-bold text-dark mb-4">Morning Session (30-45 Min)</h3>
            <ul class="space-y-4">
              <li 
                v-for="(exercise, index) in morningExercises" 
                :key="index"
                class="flex items-start gap-3"
              >
                <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <font-awesome-icon icon="check" class="text-white text-xs" />
                </div>
                <div class="flex-1">
                  <div class="font-medium text-gray-800">{{ exercise.name }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ exercise.description }}</div>
                </div>
                <font-awesome-icon icon="arrow-right" class="text-primary mt-1" />
              </li>
            </ul>
          </div>

          <!-- Evening Session -->
          <div class="bg-secondary rounded-xl p-6 border-2 border-primary/20">
            <h3 class="text-xl font-bold text-dark mb-4">Evening Session (15-20 Min)</h3>
            <ul class="space-y-4">
              <li 
                v-for="(exercise, index) in eveningExercises" 
                :key="index"
                class="flex items-start gap-3"
              >
                <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <font-awesome-icon icon="check" class="text-white text-xs" />
                </div>
                <div class="flex-1">
                  <div class="font-medium text-gray-800">{{ exercise.name }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ exercise.description }}</div>
                </div>
                <font-awesome-icon icon="arrow-right" class="text-primary mt-1" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Chat with Specialist Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div class="max-w-7xl mx-auto">
        <div class="bg-primary rounded-xl p-8 text-white">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <font-awesome-icon icon="user-md" class="text-4xl" />
            </div>
            <div class="flex-1 text-center md:text-left">
              <h3 class="text-2xl font-bold mb-2">Dr. Alice P. Smith</h3>
              <p class="text-green-100 mb-4">Nutritionist & Dietitian</p>
              <button class="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                Chat with your specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

