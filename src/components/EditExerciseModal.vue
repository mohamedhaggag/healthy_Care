<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-slide-up">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-50">
        <h2 class="text-2xl font-bold text-slate-800">Edit Exercise Schedule</h2>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <font-awesome-icon icon="times" class="text-xl" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
        <div v-for="(ex, index) in localExercises" :key="index" class="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-50 group hover:border-slate-200 transition-all duration-300">
          <div class="grid grid-cols-3 gap-4 mb-3">
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Name</label>
              <input v-model="ex.name" type="text" class="w-full px-4 py-2 bg-white border border-slate-100 rounded-lg outline-none" placeholder="e.g. Cardio" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Duration</label>
              <input v-model="ex.duration" type="text" class="w-full px-4 py-2 bg-white border border-slate-100 rounded-lg outline-none" placeholder="e.g. 45 min" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">BG Color</label>
              <input v-model="ex.bgColor" type="text" class="w-full px-4 py-2 bg-white border border-slate-100 rounded-lg outline-none" placeholder="#fff1f2" />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Benefit</label>
            <textarea v-model="ex.benefit" rows="2" class="w-full px-4 py-2 bg-white border border-slate-100 rounded-lg outline-none resize-none" placeholder="Short benefit or notes"></textarea>
          </div>

          <div class="flex justify-end mt-3 gap-2">
            <button @click="removeExercise(index)" class="px-3 py-2 bg-red-50 text-red-600 rounded-md">Remove</button>
          </div>
        </div>

        <button @click="addExercise" class="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 font-bold text-sm hover:border-[#0a4d8c] hover:text-[#0a4d8c] transition-all flex items-center justify-center gap-2">
          <font-awesome-icon icon="plus" />
          Add Exercise
        </button>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-50 flex gap-4">
        <button @click="saveChanges" class="flex-1 py-3 bg-[#0a4d8c] text-white rounded-lg font-bold hover:bg-[#083d70] transition-all">Save Changes</button>
        <button @click="$emit('close')" class="flex-1 py-3 border-2 border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  exercises: Array
})

const emit = defineEmits(['close', 'save'])

const localExercises = ref([])

watch(() => props.isOpen, (val) => {
  if (val) {
    localExercises.value = JSON.parse(JSON.stringify(props.exercises || []))
  }
})

const addExercise = () => {
  localExercises.value.push({ name: '', benefit: '', duration: '', bgColor: '#fff' })
}

const removeExercise = (index) => {
  localExercises.value.splice(index, 1)
}

const saveChanges = () => {
  emit('save', localExercises.value)
}
</script>

<style scoped>
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards }
.animate-slide-up { animation: slideUp 0.4s ease-out forwards }
.scrollbar-hide::-webkit-scrollbar { display: none }
</style>