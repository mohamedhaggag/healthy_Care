import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth'

const orders = ref([])
const currentUserEmail = ref(null)

// Get storage key for current user's orders
const getOrdersKey = (email) => email ? `orders_${email}` : 'orders'

// Load orders for a specific user
const loadUserOrders = (email) => {
  if (typeof window === 'undefined' || !email) {
    orders.value = []
    currentUserEmail.value = null
    return
  }
  
  currentUserEmail.value = email
  const ordersKey = getOrdersKey(email)
  const savedOrders = localStorage.getItem(ordersKey)
  
  if (savedOrders) {
    orders.value = JSON.parse(savedOrders)
  } else {
    orders.value = []
  }
}

// Save orders to localStorage
const saveOrders = () => {
  if (typeof window !== 'undefined' && currentUserEmail.value) {
    const ordersKey = getOrdersKey(currentUserEmail.value)
    localStorage.setItem(ordersKey, JSON.stringify(orders.value))
  }
}

// Initialize - check for logged in user
if (typeof window !== 'undefined') {
  const savedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth')
  if (savedAuth) {
    const authData = JSON.parse(savedAuth)
    if (authData.isAuthenticated && authData.email) {
      loadUserOrders(authData.email)
    }
  }
}

export function useOrders() {
  const { user, isAuthenticated } = useAuth()
  
  // Watch for user changes and load their orders
  watch([user, isAuthenticated], ([newUser, authenticated]) => {
    if (authenticated && newUser?.email) {
      loadUserOrders(newUser.email)
    } else {
      orders.value = []
      currentUserEmail.value = null
    }
  }, { immediate: true })
  
  // Create a new order
  const createOrder = (orderData) => {
    if (!user.value?.email) {
      throw new Error('User must be logged in to create an order')
    }
    
    // Ensure we're using the current user's email
    const userEmail = user.value.email
    if (currentUserEmail.value !== userEmail) {
      loadUserOrders(userEmail)
    }
    
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'completed',
      items: orderData.items || [],
      shipping: orderData.shipping || {},
      payment: orderData.payment || {},
      subtotal: orderData.subtotal || 0,
      shippingCost: orderData.shippingCost || 5.00,
      tax: orderData.tax || 0,
      total: orderData.total || 0
    }
    
    orders.value.unshift(order) // Add to beginning of array (newest first)
    saveOrders()
    
    return order
  }
  
  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.value.find(order => order.id === orderId || order.orderNumber === orderId)
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Manually load user orders
  const loadCurrentUserOrders = () => {
    if (user.value?.email) {
      loadUserOrders(user.value.email)
    } else {
      orders.value = []
      currentUserEmail.value = null
    }
  }
  
  return {
    orders: computed(() => orders.value),
    createOrder,
    getOrderById,
    formatDate,
    loadCurrentUserOrders
  }
}

