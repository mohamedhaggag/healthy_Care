import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth'

// Cart state
const cart = ref([])
const wishlist = ref([])
const currentUserEmail = ref(null)

// Get storage key for current user
const getCartKey = (email) => email ? `cart_${email}` : 'cart'
const getWishlistKey = (email) => email ? `wishlist_${email}` : 'wishlist'

// Load cart and wishlist for a specific user
const loadUserData = (email) => {
  if (typeof window === 'undefined' || !email) {
    cart.value = []
    wishlist.value = []
    currentUserEmail.value = null
    return
  }
  
  currentUserEmail.value = email
  const cartKey = getCartKey(email)
  const wishlistKey = getWishlistKey(email)
  
  const savedCart = localStorage.getItem(cartKey)
  const savedWishlist = localStorage.getItem(wishlistKey)
  
  if (savedCart) {
    cart.value = JSON.parse(savedCart)
  } else {
    cart.value = []
  }
  
  if (savedWishlist) {
    wishlist.value = JSON.parse(savedWishlist)
  } else {
    wishlist.value = []
  }
}

// Clear cart and wishlist when user logs out
const clearUserData = () => {
  cart.value = []
  wishlist.value = []
  currentUserEmail.value = null
}

// Initialize - check for logged in user
if (typeof window !== 'undefined') {
  const savedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth')
  if (savedAuth) {
    const authData = JSON.parse(savedAuth)
    if (authData.isAuthenticated && authData.email) {
      loadUserData(authData.email)
    }
  }
}

export function useCart() {
  const { user, isAuthenticated } = useAuth()
  
  // Watch for user changes and load their data
  watch([user, isAuthenticated], ([newUser, authenticated]) => {
    if (authenticated && newUser?.email) {
      loadUserData(newUser.email)
    } else {
      clearUserData()
    }
  }, { immediate: true })
  
  // Cart functions
  const addToCart = (product, quantity = 1) => {
    if (!currentUserEmail.value) {
      // If not logged in, show message
      alert('Please log in to add items to cart')
      return
    }
    
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      })
    }
    
    saveCart()
  }

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
    saveCart()
  }

  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  const saveCart = () => {
    if (typeof window !== 'undefined' && currentUserEmail.value) {
      const cartKey = getCartKey(currentUserEmail.value)
      localStorage.setItem(cartKey, JSON.stringify(cart.value))
    }
  }

  // Wishlist functions
  const addToWishlist = (product) => {
    if (!currentUserEmail.value) {
      // If not logged in, show message
      alert('Please log in to add items to wishlist')
      return
    }
    
    if (!isInWishlist(product.id)) {
      wishlist.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        image: product.images[0],
        rating: product.rating
      })
      saveWishlist()
    }
  }

  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter(item => item.id !== productId)
    saveWishlist()
  }

  const isInWishlist = (productId) => {
    return wishlist.value.some(item => item.id === productId)
  }

  const saveWishlist = () => {
    if (typeof window !== 'undefined' && currentUserEmail.value) {
      const wishlistKey = getWishlistKey(currentUserEmail.value)
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist.value))
    }
  }
  
  // Function to manually load user data (for when auth state changes)
  const loadCurrentUserData = () => {
    if (user.value?.email) {
      loadUserData(user.value.email)
    } else {
      clearUserData()
    }
  }

  // Computed properties
  const cartItemsCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const wishlistCount = computed(() => {
    return wishlist.value.length
  })

  return {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    cartItemsCount,
    cartTotal,
    wishlistCount,
    loadCurrentUserData
  }
}

