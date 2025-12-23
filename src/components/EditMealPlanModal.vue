<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-slide-up">
      <!-- Header -->
      <div class="flex items-center justify-between p-8 border-b border-slate-50">
        <h2 class="text-2xl font-bold text-slate-800">Edit Meal Plan</h2>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <font-awesome-icon icon="times" class="text-xl" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
        <div v-for="(meal, index) in localMeals" :key="index" class="mb-8 last:mb-0 p-6 bg-slate-50/50 rounded-[30px] border border-slate-50 group hover:border-slate-200 transition-all duration-300">
          <div class="grid grid-cols-2 gap-6 mb-4">
            <!-- Meal Name -->
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Meal Name</label>
              <input 
                v-model="meal.name"
                type="text" 
                class="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#0a4d8c]/10 outline-none transition-all"
                placeholder="e.g. Breakfast"
              />
            </div>
            <!-- Time -->
            <div class="relative">
              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Time</label>
              <div class="flex items-center gap-3">
                <input 
                  v-model="meal.time"
                  type="text" 
                  class="flex-1 px-5 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#0a4d8c]/10 outline-none transition-all"
                  placeholder="e.g. 7:00 AM"
                />
                <button @click="removeMeal(index)" class="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>

          <!-- Food Items -->
          <div class="mb-4">
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Food Items</label>
            <textarea 
              v-model="meal.description"
              rows="2"
              class="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#0a4d8c]/10 outline-none transition-all resize-none"
              placeholder="e.g. Oatmeal with berries, Greek yogurt"
            ></textarea>
          </div>

          <!-- Calories -->
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Calories</label>
            <input 
              v-model.number="meal.calories"
              type="number" 
              class="w-full px-5 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#0a4d8c]/10 outline-none transition-all"
              placeholder="e.g. 350"
            />
          </div>
        </div>

        <button @click="addMeal" class="w-full mt-4 py-4 border-2 border-dashed border-slate-200 rounded-[30px] text-slate-400 font-bold text-sm hover:border-[#0a4d8c] hover:text-[#0a4d8c] transition-all flex items-center justify-center gap-2">
          <font-awesome-icon icon="plus" />
          Add Another Meal
        </button>
      </div>

      <!-- Footer -->
      <div class="p-8 border-t border-slate-50 flex gap-4">
        <button 
          @click="saveChanges"
          class="flex-1 py-4 bg-[#0a4d8c] text-white rounded-2xl font-bold hover:bg-[#083d70] transition-all shadow-lg active:scale-95"
        >
          Save Change
        </button>
        <button 
          @click="$emit('close')"
          class="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  meals: Array
})

const emit = defineEmits(['close', 'save'])

const localMeals = ref([])

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    localMeals.value = JSON.parse(JSON.stringify(props.meals))
  }
})

const addMeal = () => {
  localMeals.value.push({
    name: '',
    time: '',
    description: '',
    calories: 0
  })
}

const removeMeal = (index) => {
  localMeals.value.splice(index, 1)
}

const saveChanges = () => {
  emit('save', localMeals.value)
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
