<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white w-full max-w-lg rounded-[20px] shadow-2xl overflow-hidden animate-slide-up">
      <div class="flex items-center justify-between p-6 border-b border-slate-50">
        <h2 class="text-lg font-bold text-slate-800">Add Note</h2>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600">
          <font-awesome-icon icon="times" />
        </button>
      </div>

      <div class="p-6">
        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2">Note</label>
        <textarea v-model="content" rows="6" class="w-full px-4 py-3 bg-white border border-slate-100 rounded-lg outline-none resize-none" placeholder="Write a note for the client..."></textarea>
      </div>

      <div class="flex gap-3 p-6 border-t border-slate-50">
        <button @click="save" class="flex-1 py-3 bg-[#0a4d8c] text-white rounded-lg font-bold hover:bg-[#083d70]">Save</button>
        <button @click="$emit('close')" class="flex-1 py-3 border-2 border-slate-200 text-slate-600 rounded-lg font-bold">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close', 'save'])
const content = ref('')

watch(() => props.isOpen, (val) => {
  if (val) content.value = ''
})

const save = () => {
  if (!content.value.trim()) return
  emit('save', content.value.trim())
}
</script>

<style scoped>
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
.animate-fade-in { animation: fadeIn 0.2s ease-out forwards }
.animate-slide-up { animation: slideUp 0.28s ease-out forwards }
</style>