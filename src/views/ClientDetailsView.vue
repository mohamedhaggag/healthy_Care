<template>
  <div class="flex h-screen bg-[#f8faff] overflow-hidden">
    <!-- Shared Sidebar -->
    <DoctorSidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto ml-64 p-8 animate-fade-in">
      <!-- Back Link -->
      <router-link to="/doctor-clients" class="flex items-center gap-2 text-[#0a4d8c] font-semibold text-sm mb-6 hover:translate-x-[-4px] transition-transform duration-300">
        <font-awesome-icon icon="arrow-left" />
        <span>Back to Clients</span>
      </router-link>

      <!-- Client Profile Header -->
      <div v-if="client" class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 mb-8 animate-slide-up">
        <div class="flex flex-wrap items-center justify-between gap-6">
          <div class="flex items-center gap-6">
            <div class="relative">
              <img :src="client.avatar" class="w-24 h-24 rounded-full border-4 border-white shadow-md" alt="Avatar" />
              <div class="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-3xl font-extrabold text-[#0a4d8c]">{{ client.name }}</h1>
                <span class="px-3 py-1 bg-blue-50 text-[#0a4d8c] text-[10px] font-bold rounded-full uppercase tracking-wider">{{ client.goal }}</span>
              </div>
              <div class="grid grid-cols-4 gap-8">
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">Age</p>
                  <p class="text-lg font-bold text-slate-800">{{ client.age }} years</p>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">Height</p>
                  <p class="text-lg font-bold text-slate-800">{{ client.height }} cm</p>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">Current Weight</p>
                  <p class="text-lg font-bold text-slate-800">{{ client.currentWeight }} kg</p>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">Target Weight</p>
                  <p class="text-lg font-bold text-slate-800">{{ client.targetWeight }} kg</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <router-link :to="`/doctor-messages?client=${clientId}`" class="flex items-center gap-2 px-6 py-3 bg-[#0a4d8c] text-white rounded-2xl text-sm font-bold shadow-lg hover:bg-[#083d70] transition-all active:scale-95">
              <font-awesome-icon icon="comment" />
              Chat
            </router-link>
            <button class="flex items-center gap-2 px-6 py-3 border-2 border-[#0a4d8c] text-[#0a4d8c] rounded-2xl text-sm font-bold hover:bg-[#0a4d8c]/5 transition-all active:scale-95">
              <font-awesome-icon icon="edit" />
              Update Plan
            </button>
          </div>
        </div>

        <div class="mt-10">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-sm font-bold text-slate-800">Overall Progress</h2>
            <span class="text-lg font-black text-[#0a4d8c]">{{ client.progress }}%</span>
          </div>
          <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div class="h-full bg-[#0a4d8c] transition-all duration-1000 ease-out" :style="{ width: client.progress + '%' }"></div>
          </div>
          <div class="flex justify-between mt-3">
            <p class="text-[10px] font-bold text-slate-400 uppercase">14 days on plan</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase">Started: 11/15/2023</p>
          </div>
        </div>
      </div>

      <!-- Plan Sections -->
      <div v-if="client" class="grid grid-cols-2 gap-8 mb-8">
        <!-- Meal Plan -->
        <div class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 animate-slide-up delay-200">
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                <font-awesome-icon icon="utensils" />
              </div>
              <h2 class="font-bold text-slate-800">Meal Plan</h2>
            </div>
            <button @click="isEditModalOpen = true" class="p-2 text-slate-300 hover:text-slate-600 transition-colors">
              <font-awesome-icon icon="edit" />
            </button>
          </div>
          <div class="space-y-6">
            <div v-for="(meal, index) in mealPlan" :key="index" class="flex justify-between items-start pb-6 border-b border-slate-50 last:border-0 last:pb-0">
              <div>
                <p class="font-bold text-slate-800 mb-1">{{ meal.name }}</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">{{ meal.time }}</p>
                <p class="text-xs text-slate-500 leading-relaxed">{{ meal.description }}</p>
              </div>
              <span class="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{{ meal.calories }} cal</span>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
            <p class="font-bold text-slate-800">Total Daily Calories</p>
            <p class="text-xl font-black text-green-500">{{ totalCalories }} cal</p>
          </div>
        </div>

        <!-- Exercise Schedule -->
        <div class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 animate-slide-up delay-300">
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-50 text-[#0a4d8c] rounded-xl flex items-center justify-center">
                <font-awesome-icon icon="running" />
              </div>
              <h2 class="font-bold text-slate-800">Exercise Schedule</h2>
            </div>
            <button @click="isEditExerciseOpen = true" class="p-2 text-slate-300 hover:text-slate-600 transition-colors">
              <font-awesome-icon icon="edit" />
            </button>
          </div>
          <div class="space-y-4">
            <div v-for="(exercise, index) in exercisesRef" :key="index" 
                 class="flex justify-between items-center p-4 rounded-2xl transition-all duration-300 hover:shadow-md"
                 :style="{ backgroundColor: exercise.bgColor }">
              <div>
                <p class="text-sm font-bold text-slate-800 mb-1">{{ exercise.name }}</p>
                <p class="text-[10px] text-slate-500 font-medium italic">{{ exercise.benefit }}</p>
              </div>
              <span class="text-[10px] font-black text-slate-700 uppercase">{{ exercise.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Activity -->
      <div class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 mb-8 animate-slide-up delay-400">
        <h2 class="font-bold text-slate-800 mb-2">Weekly Activity</h2>
        <p class="text-xs text-slate-400 mb-8">Your activity score this week</p>
        
        <div class="flex items-end justify-between h-40 mb-8 px-8">
          <div v-for="(bar, index) in weeklyChart" :key="index" class="flex flex-col items-center gap-4 w-12">
            <div class="w-full bg-green-100 rounded-t-xl transition-all duration-1000 ease-out" 
                 :style="{ height: bar.height + '%', backgroundColor: bar.active ? '#dcfce7' : '#f0fdf4' }"></div>
            <p class="text-[10px] font-bold text-slate-400 uppercase">{{ bar.day }}</p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-8 pt-8 border-t border-slate-50">
          <div class="text-center">
            <p class="text-xl font-black text-[#0a4d8c] mb-1">1450</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase">calories</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-black text-[#0a4d8c] mb-1">2.4L</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase">Water</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-black text-[#0a4d8c] mb-1">6548</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase">calories</p>
          </div>
        </div>
      </div>

      <!-- Doctor's Notes -->
      <div class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 animate-slide-up delay-500">
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="sticky-note" />
            </div>
            <h2 class="font-bold text-slate-800">Doctor's Notes & Recommendations</h2>
          </div>
          <button @click="isAddNoteOpen = true" class="flex items-center gap-2 px-4 py-2 bg-[#0a4d8c] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#083d70] transition-all">
            <font-awesome-icon icon="plus" class="text-[10px]" />
            Add Note
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="(note, index) in notes" :key="index" class="p-6 bg-slate-50/50 border border-slate-50 rounded-[30px] hover:shadow-md transition-all duration-300">
            <div class="flex justify-between items-center mb-3">
              <p class="text-xs font-bold text-[#0a4d8c]">Dr. Ahmed</p>
              <p class="text-[10px] font-medium text-slate-400">{{ note.date }}</p>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed">{{ note.content }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <EditMealPlanModal 
      :is-open="isEditModalOpen" 
      :meals="mealPlan"
      @close="isEditModalOpen = false"
      @save="handleSaveMealPlan"
    />

    <EditExerciseModal
      :is-open="isEditExerciseOpen"
      :exercises="exercisesRef"
      @close="isEditExerciseOpen = false"
      @save="handleSaveExercises"
    />

    <AddNoteModal
      :is-open="isAddNoteOpen"
      @close="isAddNoteOpen = false"
      @save="handleSaveNote"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DoctorSidebar from '../components/DoctorSidebar.vue'
import EditMealPlanModal from '../components/EditMealPlanModal.vue'
import EditExerciseModal from '../components/EditExerciseModal.vue'
import AddNoteModal from '../components/AddNoteModal.vue'
import { useAuth } from '../composables/useAuth'
import { buildDoctorClients, getCurrentDoctor } from '../services/doctorPortal'

const isEditModalOpen = ref(false)

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

const doctor = computed(() => getCurrentDoctor(user.value))
const clients = computed(() => buildDoctorClients(doctor.value))

const clientId = computed(() => String(route.params.id || ''))
const client = computed(() => clients.value.find(c => c.id === clientId.value) || null)

watch(
  client,
  (c) => {
    if (!c) router.push('/doctor-clients')
  },
  { immediate: true }
)

const mealPlan = ref([
  { name: 'Breakfast', time: '7:00 AM', calories: 350, description: 'Oatmeal with berries, Greek yogurt' },
  { name: 'Morning Snack', time: '10:00 AM', calories: 150, description: 'Apple with almonds' },
  { name: 'Lunch', time: '1:00 PM', calories: 500, description: 'Grilled chicken, quinoa, vegetables' },
  { name: 'Afternoon Snack', time: '4:00 PM', calories: 200, description: 'Protein shake' },
  { name: 'Dinner', time: '7:00 PM', calories: 550, description: 'Baked salmon, sweet potato, salad' }
])

const totalCalories = computed(() => {
  return mealPlan.value.reduce((total, meal) => total + (meal.calories || 0), 0)
})

const handleSaveMealPlan = (updatedMeals) => {
  mealPlan.value = updatedMeals
  isEditModalOpen.value = false
}

// Exercises should be reactive so edits persist
const exercisesRef = ref([
  { name: 'Cardio', benefit: 'benefit: warm your body', duration: '45 min', bgColor: '#fff1f2' },
  { name: 'Squat', benefit: 'benefit: warm your body', duration: '10 * 3', bgColor: '#fef2f2' },
  { name: 'Cardio', benefit: 'benefit: warm your body', duration: '45 min', bgColor: '#fff1f2' },
  { name: 'Squat', benefit: 'benefit: warm your body', duration: '10 * 3', bgColor: '#fef2f2' },
  { name: 'Cardio', benefit: 'benefit: warm your body', duration: '45 min', bgColor: '#fff1f2' },
  { name: 'walk', benefit: 'Active Recovery', duration: '30 min', bgColor: '#f0fdf4' },
  { name: 'Squat', benefit: 'benefit: warm your body', duration: '10 * 3', bgColor: '#fefce8' }
])

const isEditExerciseOpen = ref(false)
const handleSaveExercises = (updated) => {
  exercisesRef.value = updated
  isEditExerciseOpen.value = false
}

// Add Note modal state & save handler
const isAddNoteOpen = ref(false)
const handleSaveNote = (content) => {
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  notes.value.unshift({ date, content })
  isAddNoteOpen.value = false
}


const weeklyChart = [
  { day: 'Sun', height: 60, active: false },
  { day: 'Mon', height: 80, active: false },
  { day: 'Tue', height: 70, active: false },
  { day: 'Wed', height: 75, active: false },
  { day: 'Thu', height: 90, active: false },
  { day: 'Fri', height: 50, active: false },
  { day: 'Sat', height: 65, active: false }
]

const notes = ref([
  { date: 'Dec 20, 2024', content: 'Client showing excellent progress. Weight loss is steady and healthy. Compliance with meal plan is good. Recommended increasing water intake to 3L per day.' },
  { date: 'Dec 13, 2024', content: 'Client reported feeling more energetic. Sleep quality has improved. Suggested adding more protein to breakfast for better satiety.' },
  { date: 'Dec 6, 2024', content: 'Initial consultation completed. Client is motivated and committed to the weight loss plan. Starting weight: 92kg. Target: 75kg.' }
])
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
</style>
