<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useCart } from '../composables/useCart'
import { useOrders } from '../composables/useOrders'

const router = useRouter()
const { isAuthenticated, user } = useAuth()
const { cart, cartTotal, clearCart } = useCart()
const { createOrder } = useOrders()

const currentStep = ref(1)
const steps = [
  { number: 1, name: 'Cart', completed: false },
  { number: 2, name: 'Checkout', completed: false },
  { number: 3, name: 'Payment', completed: false },
  { number: 4, name: 'Complete', completed: false }
]

// Form data
const shippingInfo = ref({
  name: user.value?.fullName || user.value?.name || '',
  email: user.value?.email || '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  country: 'Egypt'
})

const paymentInfo = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  paymentMethod: 'card'
})

// Form validation errors
const shippingErrors = ref({})
const paymentErrors = ref({})

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  }
  if (cart.value.length === 0) {
    router.push('/cart')
  }
})

// Validation functions
const validateShipping = () => {
  shippingErrors.value = {}
  let isValid = true

  if (!shippingInfo.value.name || shippingInfo.value.name.trim().length < 2) {
    shippingErrors.value.name = 'Name must be at least 2 characters'
    isValid = false
  }

  if (!shippingInfo.value.email || !/^[^\s@]+@[^\s@]+\.com$/.test(shippingInfo.value.email)) {
    shippingErrors.value.email = 'Please enter a valid email (must contain @ and end with .com)'
    isValid = false
  }

  if (!shippingInfo.value.phone || !/^[0-9+\-\s()]+$/.test(shippingInfo.value.phone) || shippingInfo.value.phone.length < 10) {
    shippingErrors.value.phone = 'Please enter a valid phone number (at least 10 digits)'
    isValid = false
  }

  if (!shippingInfo.value.address || shippingInfo.value.address.trim().length < 5) {
    shippingErrors.value.address = 'Address must be at least 5 characters'
    isValid = false
  }

  if (!shippingInfo.value.city || shippingInfo.value.city.trim().length < 2) {
    shippingErrors.value.city = 'City must be at least 2 characters'
    isValid = false
  }

  if (!shippingInfo.value.zipCode || !/^[0-9]+$/.test(shippingInfo.value.zipCode) || shippingInfo.value.zipCode.length < 4) {
    shippingErrors.value.zipCode = 'Zip code must be at least 4 digits'
    isValid = false
  }

  if (!shippingInfo.value.country || shippingInfo.value.country.trim().length < 2) {
    shippingErrors.value.country = 'Please enter a country'
    isValid = false
  }

  return isValid
}

const validatePayment = () => {
  paymentErrors.value = {}
  let isValid = true

  if (paymentInfo.value.paymentMethod === 'card') {
    const cardNumberClean = paymentInfo.value.cardNumber.replace(/\s/g, '')
    if (!paymentInfo.value.cardNumber || !/^[0-9]+$/.test(cardNumberClean) || cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      paymentErrors.value.cardNumber = 'Please enter a valid card number (13-19 digits)'
      isValid = false
    }

    if (!paymentInfo.value.cardName || paymentInfo.value.cardName.trim().length < 3) {
      paymentErrors.value.cardName = 'Cardholder name must be at least 3 characters'
      isValid = false
    }

    if (!paymentInfo.value.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.value.expiryDate)) {
      paymentErrors.value.expiryDate = 'Please enter a valid expiry date (MM/YY)'
      isValid = false
    }

    if (!paymentInfo.value.cvv || !/^[0-9]+$/.test(paymentInfo.value.cvv) || paymentInfo.value.cvv.length < 3 || paymentInfo.value.cvv.length > 4) {
      paymentErrors.value.cvv = 'CVV must be 3-4 digits'
      isValid = false
    }
  }

  return isValid
}

// Format expiry date input
const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4)
  }
  paymentInfo.value.expiryDate = value
}

const nextStep = () => {
  // Validate before proceeding
  if (currentStep.value === 2) {
    if (!validateShipping()) {
      return // Don't proceed if validation fails
    }
  } else if (currentStep.value === 3) {
    if (!validatePayment()) {
      return // Don't proceed if validation fails
    }
  }

  if (currentStep.value < 4) {
    steps[currentStep.value - 1].completed = true
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    // Clear errors when going back
    if (currentStep.value === 3) {
      paymentErrors.value = {}
    } else if (currentStep.value === 2) {
      shippingErrors.value = {}
    }
    currentStep.value--
  }
}

const placeOrder = () => {
  // Create order with all details
  const orderData = {
    items: cart.value.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    })),
    shipping: { ...shippingInfo.value },
    payment: { 
      method: paymentInfo.value.paymentMethod,
      // Don't save sensitive payment details
      cardLast4: paymentInfo.value.cardNumber ? paymentInfo.value.cardNumber.slice(-4) : ''
    },
    subtotal: subtotal.value,
    shippingCost: shipping.value,
    tax: tax.value,
    total: total.value
  }
  
  // Create and save the order
  const order = createOrder(orderData)
  
  // Simulate order placement
  setTimeout(() => {
    clearCart()
    // Pass order number to order complete page
    router.push({ 
      path: '/order-complete', 
      query: { orderNumber: order.orderNumber } 
    })
  }, 1000)
}

const subtotal = computed(() => cartTotal.value)
const shipping = computed(() => 5.00)
const tax = computed(() => cartTotal.value * 0.1)
const total = computed(() => subtotal.value + shipping.value + tax.value)
</script>

<template>
  <div v-if="isAuthenticated && cart.length > 0" class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-between">
          <div 
            v-for="(step, index) in steps" 
            :key="step.number"
            class="flex items-center flex-1"
          >
            <div class="flex items-center flex-1">
              <div 
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all',
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
              <div class="ml-3 hidden sm:block">
                <p 
                  :class="[
                    'font-semibold',
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  ]"
                >
                  {{ step.name }}
                </p>
              </div>
            </div>
            <div 
              v-if="index < steps.length - 1"
              :class="[
                'h-1 flex-1 mx-2',
                currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Step 1: Cart Review -->
      <div v-if="currentStep === 1" class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-dark mb-6">Review Your Cart</h2>
        
        <div class="space-y-4 mb-6">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-20 h-20 object-contain"
            />
            <div class="flex-1">
              <h3 class="font-semibold text-dark">{{ item.name }}</h3>
              <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
            <div class="text-lg font-bold text-primary">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-4">
          <router-link 
            to="/cart"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Cart
          </router-link>
          <button 
            @click="nextStep"
            class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Continue to Checkout
          </button>
        </div>
      </div>

      <!-- Step 2: Shipping Information -->
      <div v-if="currentStep === 2" class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-dark mb-6">Shipping Information</h2>
        
        <form @submit.prevent="nextStep" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input 
                v-model="shippingInfo.name"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.name ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Enter your full name"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.name" class="mt-1 text-sm text-red-600">{{ shippingErrors.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input 
                v-model="shippingInfo.email"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.email ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="example@email.com"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.email" class="mt-1 text-sm text-red-600">{{ shippingErrors.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input 
                v-model="shippingInfo.phone"
                type="tel"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.phone ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="+20 123 456 7890"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.phone" class="mt-1 text-sm text-red-600">{{ shippingErrors.phone }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Country *</label>
              <input 
                v-model="shippingInfo.country"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.country ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Egypt"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.country" class="mt-1 text-sm text-red-600">{{ shippingErrors.country }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input 
                v-model="shippingInfo.address"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.address ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Street address, building number"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.address" class="mt-1 text-sm text-red-600">{{ shippingErrors.address }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input 
                v-model="shippingInfo.city"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.city ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Cairo"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.city" class="mt-1 text-sm text-red-600">{{ shippingErrors.city }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
              <input 
                v-model="shippingInfo.zipCode"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                  shippingErrors.zipCode ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="12345"
                @blur="validateShipping()"
              />
              <p v-if="shippingErrors.zipCode" class="mt-1 text-sm text-red-600">{{ shippingErrors.zipCode }}</p>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <button 
              type="button"
              @click="prevStep"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button 
              type="submit"
              class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>

      <!-- Step 3: Payment -->
      <div v-if="currentStep === 3" class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-dark mb-6">Payment Information</h2>
        
        <form @submit.prevent="nextStep" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select 
              v-model="paymentInfo.paymentMethod"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div v-if="paymentInfo.paymentMethod === 'card'">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                <input 
                  v-model="paymentInfo.cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                  maxlength="19"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                    paymentErrors.cardNumber ? 'border-red-300' : 'border-gray-300'
                  ]"
                  @input="paymentInfo.cardNumber = paymentInfo.cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()"
                  @blur="validatePayment()"
                />
                <p v-if="paymentErrors.cardNumber" class="mt-1 text-sm text-red-600">{{ paymentErrors.cardNumber }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                <input 
                  v-model="paymentInfo.cardName"
                  type="text"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                    paymentErrors.cardName ? 'border-red-300' : 'border-gray-300'
                  ]"
                  placeholder="Name on card"
                  @blur="validatePayment()"
                />
                <p v-if="paymentErrors.cardName" class="mt-1 text-sm text-red-600">{{ paymentErrors.cardName }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input 
                    v-model="paymentInfo.expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    required
                    maxlength="5"
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                      paymentErrors.expiryDate ? 'border-red-300' : 'border-gray-300'
                    ]"
                    @input="formatExpiryDate"
                    @blur="validatePayment()"
                  />
                  <p v-if="paymentErrors.expiryDate" class="mt-1 text-sm text-red-600">{{ paymentErrors.expiryDate }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                  <input 
                    v-model="paymentInfo.cvv"
                    type="text"
                    placeholder="123"
                    required
                    maxlength="4"
                    :class="[
                      'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                      paymentErrors.cvv ? 'border-red-300' : 'border-gray-300'
                    ]"
                    @input="paymentInfo.cvv = paymentInfo.cvv.replace(/\D/g, '')"
                    @blur="validatePayment()"
                  />
                  <p v-if="paymentErrors.cvv" class="mt-1 text-sm text-red-600">{{ paymentErrors.cvv }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 class="font-bold text-dark mb-4">Order Summary</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <hr class="border-gray-300 my-2" />
              <div class="flex justify-between text-lg font-bold text-dark">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <button 
              type="button"
              @click="prevStep"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button 
              type="submit"
              class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Review Order
            </button>
          </div>
        </form>
      </div>

      <!-- Step 4: Order Review -->
      <div v-if="currentStep === 4" class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-dark mb-6">Review Your Order</h2>
        
        <!-- Order Items -->
        <div class="space-y-4 mb-6">
          <div 
            v-for="item in cart" 
            :key="item.id"
            class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-20 h-20 object-contain"
            />
            <div class="flex-1">
              <h3 class="font-semibold text-dark">{{ item.name }}</h3>
              <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
            <div class="text-lg font-bold text-primary">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <!-- Shipping Details -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 class="font-bold text-dark mb-4">Shipping Details</h3>
          <div class="text-sm text-gray-600 space-y-1">
            <p>{{ shippingInfo.name }}</p>
            <p>{{ shippingInfo.address }}</p>
            <p>{{ shippingInfo.city }}, {{ shippingInfo.zipCode }}</p>
            <p>{{ shippingInfo.country }}</p>
            <p class="mt-2">Phone: {{ shippingInfo.phone }}</p>
          </div>
        </div>

        <!-- Total -->
        <div class="bg-primary/10 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center text-2xl font-bold text-dark">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex justify-end gap-4">
          <button 
            @click="prevStep"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button 
            @click="placeOrder"
            class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

