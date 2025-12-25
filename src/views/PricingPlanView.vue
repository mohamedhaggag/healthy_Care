<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlanById } from '../data/plans'

const route = useRoute()
const router = useRouter()

const planId = computed(() => String(route.params.plan || '').toLowerCase())
const plan = computed(() => getPlanById(planId.value))

watch(
  plan,
  p => {
    if (!p) router.replace({ path: '/', hash: '#plans' })
  },
  { immediate: true }
)

const paymentMethod = ref('card')
const isSubmitting = ref(false)
const error = ref('')
const done = ref(false)

const card = ref({
  name: '',
  number: '',
  expiry: '',
  cvc: ''
})

const summaryTotal = computed(() => {
  const p = plan.value
  if (!p) return 0
  return Number(p.price || 0)
})

const submit = async () => {
  error.value = ''
  done.value = false

  if (!plan.value) return

  if (paymentMethod.value === 'card') {
    if (!card.value.name || !card.value.number || !card.value.expiry || !card.value.cvc) {
      error.value = 'Please fill in all card fields.'
      return
    }
  }

  isSubmitting.value = true
  try {
    // UI-only placeholder (no real payment integration yet)
    await new Promise(resolve => setTimeout(resolve, 600))
    done.value = true
  } catch (e) {
    error.value = e?.message || 'Payment failed'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#fffdf8] pt-28 pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-start justify-between gap-6">
        <div>
          <p class="text-green-500 font-semibold uppercase tracking-wide">Plan Details</p>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            Plan <span class="text-green-600">{{ plan?.name }}</span>
          </h1>
          <p class="text-gray-500 mt-2 max-w-2xl">
            {{ plan?.description }}
          </p>
        </div>

        <button
          class="shrink-0 px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-gray-700 font-semibold"
          @click="$router.push({ path: '/', hash: '#plans' })"
        >
          Back
        </button>
      </div>

      <div class="grid lg:grid-cols-12 gap-6">
        <!-- Plan card -->
        <section class="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-7 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <p class="text-gray-500 font-medium">Billing</p>
              <span
                v-if="plan?.recommended"
                class="text-[11px] px-2.5 py-1 rounded-full border border-green-200 text-green-700 bg-green-50 font-bold"
              >
                Recommended
              </span>
            </div>

            <div class="mt-5 flex items-baseline gap-2">
              <span class="text-4xl font-bold text-gray-900">$</span>
              <span class="text-6xl font-bold text-gray-900 tracking-tight">{{ plan?.price }}</span>
              <span class="text-gray-400">/ {{ plan?.interval }}</span>
            </div>
          </div>

          <div class="p-7">
            <h2 class="text-lg font-bold text-gray-900 mb-4">What you get</h2>
            <ul class="space-y-3">
              <li v-for="(f, idx) in plan?.features || []" :key="idx" class="flex items-center gap-3">
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  :class="f.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'"
                >
                  <font-awesome-icon icon="check" />
                </div>
                <span :class="f.included ? 'text-gray-800' : 'text-gray-400 line-through decoration-gray-300'">
                  {{ f.label }}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Payment -->
        <section class="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-7 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Payment Method</h2>
            <p class="text-sm text-gray-500 mt-1">Choose how you want to pay for this plan.</p>
          </div>

          <div class="p-7 space-y-6">
            <div class="grid sm:grid-cols-2 gap-3">
              <label
                class="cursor-pointer rounded-2xl border p-4 flex items-start gap-3 transition-all"
                :class="paymentMethod === 'card' ? 'border-green-300 bg-green-50/40' : 'border-gray-100 hover:border-gray-200'"
              >
                <input v-model="paymentMethod" type="radio" value="card" class="mt-1" />
                <div>
                  <p class="font-bold text-gray-900">Card</p>
                  <p class="text-sm text-gray-500">Visa / MasterCard</p>
                </div>
              </label>

              <label
                class="cursor-pointer rounded-2xl border p-4 flex items-start gap-3 transition-all"
                :class="paymentMethod === 'cash' ? 'border-green-300 bg-green-50/40' : 'border-gray-100 hover:border-gray-200'"
              >
                <input v-model="paymentMethod" type="radio" value="cash" class="mt-1" />
                <div>
                  <p class="font-bold text-gray-900">Cash</p>
                  <p class="text-sm text-gray-500">Pay at clinic / office</p>
                </div>
              </label>

              <label
                class="cursor-pointer rounded-2xl border p-4 flex items-start gap-3 transition-all"
                :class="paymentMethod === 'bank' ? 'border-green-300 bg-green-50/40' : 'border-gray-100 hover:border-gray-200'"
              >
                <input v-model="paymentMethod" type="radio" value="bank" class="mt-1" />
                <div>
                  <p class="font-bold text-gray-900">Bank Transfer</p>
                  <p class="text-sm text-gray-500">IBAN / Account</p>
                </div>
              </label>

              <label
                class="cursor-pointer rounded-2xl border p-4 flex items-start gap-3 transition-all"
                :class="paymentMethod === 'paypal' ? 'border-green-300 bg-green-50/40' : 'border-gray-100 hover:border-gray-200'"
              >
                <input v-model="paymentMethod" type="radio" value="paypal" class="mt-1" />
                <div>
                  <p class="font-bold text-gray-900">PayPal</p>
                  <p class="text-sm text-gray-500">Pay with PayPal account</p>
                </div>
              </label>
            </div>

            <div v-if="paymentMethod === 'card'" class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="font-bold text-gray-900 mb-4">Card details</p>
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="text-sm font-semibold text-gray-700">Name on card</label>
                  <input
                    v-model="card.name"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="text-sm font-semibold text-gray-700">Card number</label>
                  <input
                    v-model="card.number"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 outline-none"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div>
                  <label class="text-sm font-semibold text-gray-700">Expiry</label>
                  <input
                    v-model="card.expiry"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label class="text-sm font-semibold text-gray-700">CVC</label>
                  <input
                    v-model="card.cvc"
                    class="mt-1 w-full px-4 py-3 rounded-2xl bg-white border border-gray-100 focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 outline-none"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <div v-else-if="paymentMethod === 'bank'" class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="font-bold text-gray-900 mb-2">Bank transfer</p>
              <p class="text-sm text-gray-600">
                After clicking confirm, we’ll show you the bank details and a reference number.
              </p>
            </div>

            <div v-else-if="paymentMethod === 'paypal'" class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="font-bold text-gray-900 mb-2">PayPal</p>
              <p class="text-sm text-gray-600">You’ll be redirected to PayPal after confirming.</p>
            </div>

            <div v-else class="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
              <p class="font-bold text-gray-900 mb-2">Cash payment</p>
              <p class="text-sm text-gray-600">Pay at the clinic/office and activate your plan.</p>
            </div>

            <div v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {{ error }}
            </div>
            <div v-if="done" class="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              Payment submitted (demo). Your plan will be activated after confirmation.
            </div>

            <div class="flex items-center justify-between pt-2">
              <div>
                <p class="text-sm text-gray-500">Total</p>
                <p class="text-2xl font-bold text-gray-900">${{ summaryTotal }}</p>
              </div>
              <button
                class="px-7 py-3 rounded-2xl font-bold transition-all shadow-sm"
                :disabled="isSubmitting"
                :class="isSubmitting ? 'bg-gray-200 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'"
                @click="submit"
              >
                {{ isSubmitting ? 'Processing…' : 'Confirm & Pay' }}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>


