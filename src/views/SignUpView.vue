<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signup, checkEmailExists } = useAuth()
const currentStep = ref(1)
const errorMessage = ref('')

// Step 1: Personal Information
const firstName = ref('')
const lastName = ref('')
const weight = ref('')
const height = ref('')
const age = ref('')
const activityLevel = ref('')

// Step 2: Set Password
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Step 3: Select Goal
const selectedGoal = ref('')

// Step 4: Goal Details
const currentWeight = ref('')
const targetWeight = ref('')
const chronicDisease = ref('')

const goals = [
  { id: 'weight-loss', name: 'Weight Loss', icon: 'weight-hanging' },
  { id: 'weight-gain', name: 'Weight Gain', icon: 'arrow-up' },
  { id: 'health-improvement', name: 'Health Improvement', icon: 'heart' }
]

const steps = [
  { number: 1, title: 'Create account', completed: false },
  { number: 2, title: 'Set Password', completed: false },
  { number: 3, title: 'Select the plan', completed: false },
  { number: 4, title: 'Account Created', completed: false }
]

const currentStepTitle = computed(() => {
  if (currentStep.value === 4 && selectedGoal.value === 'weight-loss') {
    return 'Sign up weight loss'
  }
  return 'Sign up'
})

// Email validation
const isValidEmail = computed(() => {
  if (!email.value) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/
  return emailRegex.test(email.value)
})

// Password validation
const isValidPassword = computed(() => {
  return password.value && password.value.length >= 8
})

// Password match validation
const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value
})

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return firstName.value && lastName.value && weight.value && height.value && age.value && activityLevel.value
  }
  if (currentStep.value === 2) {
    return email.value && password.value && confirmPassword.value && 
           isValidEmail.value && isValidPassword.value && passwordsMatch.value
  }
  if (currentStep.value === 3) {
    return selectedGoal.value !== ''
  }
  if (currentStep.value === 4) {
    return currentWeight.value && targetWeight.value
  }
  return false
})

const nextStep = () => {
  // Validate email and check for duplicates before proceeding from step 2
  if (currentStep.value === 2) {
    errorMessage.value = ''
    
    if (!isValidEmail.value) {
      errorMessage.value = 'Please enter a valid email address (must contain @ and end with .com)'
      return
    }
    
    if (!isValidPassword.value) {
      errorMessage.value = 'Password must be at least 8 characters long'
      return
    }
    
    if (!passwordsMatch.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }
    
    if (checkEmailExists(email.value)) {
      errorMessage.value = 'An account with this email already exists. Please use a different email or log in.'
      return
    }
  }
  
  if (canProceed.value && currentStep.value < 4) {
    errorMessage.value = '' // Clear any previous errors
    currentStep.value++
  } else if (currentStep.value === 4 && canProceed.value) {
    // Complete signup
    handleComplete()
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleComplete = () => {
  errorMessage.value = ''
  
  // Check if email already exists
  if (checkEmailExists(email.value)) {
    errorMessage.value = 'An account with this email already exists. Please use a different email or log in.'
    currentStep.value = 2 // Go back to email step
    return
  }
  
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    weight: weight.value,
    height: height.value,
    age: age.value,
    activityLevel: activityLevel.value,
    goal: selectedGoal.value,
    currentWeight: currentWeight.value,
    targetWeight: targetWeight.value,
    chronicDisease: chronicDisease.value
  }
  
  try {
    // Save user data and authenticate
    signup(userData, true)
    
    // Redirect to home page
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred during signup. Please try again.'
    currentStep.value = 2 // Go back to email step
  }
}

const selectGoal = (goalId) => {
  selectedGoal.value = goalId
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl w-full">
      <!-- Logo -->
      <div class="mb-8">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <font-awesome-icon icon="leaf" />
          </div>
          <span class="font-bold text-xl text-primary tracking-tight">HEALTHY CARE</span>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Left Side - Progress Indicator -->
        <div class="lg:col-span-2 hidden lg:block">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <div class="space-y-6">
              <div
                v-for="(step, index) in steps"
                :key="step.number"
                class="flex items-center gap-4"
              >
                <div
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                    currentStep > step.number
                      ? 'bg-primary text-white'
                      : currentStep === step.number
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500'
                  ]"
                >
                  <font-awesome-icon
                    v-if="currentStep > step.number"
                    icon="check"
                    class="text-sm"
                  />
                  <span v-else>{{ step.number }}</span>
                </div>
                <div>
                  <p
                    :class="[
                      'font-semibold',
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                    ]"
                  >
                    {{ step.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Form -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <!-- Step 1: Personal Information -->
            <div v-if="currentStep === 1">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
              <p class="text-gray-600 mb-8">Sign up to begin your healthy lifestyle</p>

              <form @submit.prevent="nextStep" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      id="firstName"
                      v-model="firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      id="lastName"
                      v-model="lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      id="weight"
                      v-model="weight"
                      type="number"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Weight"
                    />
                  </div>
                  <div>
                    <label for="height" class="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                    <input
                      id="height"
                      v-model="height"
                      type="number"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Height"
                    />
                  </div>
                  <div>
                    <label for="age" class="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      id="age"
                      v-model="age"
                      type="number"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Age"
                    />
                  </div>
                </div>

                <div>
                  <label for="activityLevel" class="block text-sm font-medium text-gray-700 mb-2">Daily Activity Level (From 1-5)</label>
                  <select
                    id="activityLevel"
                    v-model="activityLevel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select activity level</option>
                    <option value="1">1 - Sedentary</option>
                    <option value="2">2 - Lightly Active</option>
                    <option value="3">3 - Moderately Active</option>
                    <option value="4">4 - Very Active</option>
                    <option value="5">5 - Extremely Active</option>
                  </select>
                </div>

                <button
                  type="submit"
                  :disabled="!canProceed"
                  :class="[
                    'w-full py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg',
                    canProceed
                      ? 'bg-primary text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  Next
                </button>

                <div class="text-center">
                  <span class="text-gray-600">Already have an account? </span>
                  <RouterLink to="/login" class="text-primary hover:text-green-600 font-semibold">
                    Sign in
                  </RouterLink>
                </div>
              </form>
            </div>

            <!-- Step 2: Set Password -->
            <div v-if="currentStep === 2">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>

              <!-- Error Message -->
              <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {{ errorMessage }}
              </div>

              <form @submit.prevent="nextStep" class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    id="email"
                    v-model="email"
                    type="text"
                    required
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                      email && !isValidEmail ? 'border-red-300' : 'border-gray-300'
                    ]"
                    placeholder="example@email.com"
                    @blur="errorMessage = ''"
                  />
                  <p v-if="email && !isValidEmail" class="mt-1 text-sm text-red-600">
                    Email must contain @ and end with .com
                  </p>
                  <p v-if="email && isValidEmail && checkEmailExists(email)" class="mt-1 text-sm text-red-600">
                    An account with this email already exists
                  </p>
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                      password && !isValidPassword ? 'border-red-300' : 'border-gray-300'
                    ]"
                    placeholder="Enter your password (min 8 characters)"
                    @blur="errorMessage = ''"
                  />
                  <p v-if="password && !isValidPassword" class="mt-1 text-sm text-red-600">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    required
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                      confirmPassword && !passwordsMatch ? 'border-red-300' : 'border-gray-300'
                    ]"
                    placeholder="Confirm your password"
                    @blur="errorMessage = ''"
                  />
                  <p v-if="confirmPassword && !passwordsMatch" class="mt-1 text-sm text-red-600">
                    Passwords do not match
                  </p>
                </div>

                <div class="flex gap-4">
                  <button
                    type="button"
                    @click="prevStep"
                    class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    :disabled="!canProceed"
                    :class="[
                      'flex-1 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg',
                      canProceed
                        ? 'bg-primary text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    Next
                  </button>
                </div>

                <div class="text-center">
                  <span class="text-gray-600">Already have an account? </span>
                  <RouterLink to="/login" class="text-primary hover:text-green-600 font-semibold">
                    Sign in
                  </RouterLink>
                </div>
              </form>
            </div>

            <!-- Step 3: Select Goal -->
            <div v-if="currentStep === 3">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Select your current goal to personalize your experience</h1>

              <form @submit.prevent="nextStep" class="space-y-6 mt-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    v-for="goal in goals"
                    :key="goal.id"
                    @click="selectGoal(goal.id)"
                    :class="[
                      'p-6 border-2 rounded-xl cursor-pointer transition-all duration-200',
                      selectedGoal === goal.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/50'
                    ]"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <font-awesome-icon :icon="goal.icon" />
                      </div>
                      <div
                        v-if="selectedGoal === goal.id"
                        class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center"
                      >
                        <font-awesome-icon icon="check" class="text-xs" />
                      </div>
                    </div>
                    <h3 class="font-semibold text-gray-900">{{ goal.name }}</h3>
                  </div>
                </div>

                <div class="flex gap-4">
                  <button
                    type="button"
                    @click="prevStep"
                    class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    :disabled="!canProceed"
                    :class="[
                      'flex-1 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg',
                      canProceed
                        ? 'bg-primary text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    Next
                  </button>
                </div>

                <div class="text-center">
                  <span class="text-gray-600">Already have an account? </span>
                  <RouterLink to="/login" class="text-primary hover:text-green-600 font-semibold">
                    Sign in
                  </RouterLink>
                </div>
              </form>
            </div>

            <!-- Step 4: Goal Details -->
            <div v-if="currentStep === 4">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">What's Your Goal, {{ firstName || 'User' }}</h1>

              <form @submit.prevent="handleComplete" class="space-y-6 mt-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="currentWeight" class="block text-sm font-medium text-gray-700 mb-2">Current Weight</label>
                    <input
                      id="currentWeight"
                      v-model="currentWeight"
                      type="number"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Current weight (kg)"
                    />
                  </div>
                  <div>
                    <label for="targetWeight" class="block text-sm font-medium text-gray-700 mb-2">Target Weight</label>
                    <input
                      id="targetWeight"
                      v-model="targetWeight"
                      type="number"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Target weight (kg)"
                    />
                  </div>
                </div>

                <div>
                  <label for="chronicDisease" class="block text-sm font-medium text-gray-700 mb-2">Chronic Disease</label>
                  <select
                    id="chronicDisease"
                    v-model="chronicDisease"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select Your Health Condition</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="hypertension">Hypertension</option>
                    <option value="heart-disease">Heart Disease</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div class="flex gap-4">
                  <button
                    type="button"
                    @click="prevStep"
                    class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    :disabled="!canProceed"
                    :class="[
                      'flex-1 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg',
                      canProceed
                        ? 'bg-primary text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    Complete
                  </button>
                </div>

                <div class="text-center">
                  <span class="text-gray-600">Already have an account? </span>
                  <RouterLink to="/login" class="text-primary hover:text-green-600 font-semibold">
                    Sign in
                  </RouterLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

