import { ref, computed } from 'vue'

const isAuthenticated = ref(false)
const user = ref(null)
const registeredUsers = ref([])

// Load from localStorage on initialization
if (typeof window !== 'undefined') {
  const savedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth')
  if (savedAuth) {
    const authData = JSON.parse(savedAuth)
    isAuthenticated.value = authData.isAuthenticated || false
    user.value = authData
  }
  
  // Load registered users
  const savedUsers = localStorage.getItem('registeredUsers')
  if (savedUsers) {
    registeredUsers.value = JSON.parse(savedUsers)
  }
}

export function useAuth() {
  const login = (email, password, rememberMe = false) => {
    const authData = {
      email: email,
      isAdmin: email === 'Admin@gmail.com',
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
      name: email.split('@')[0] // Simple name extraction
    }
    
    user.value = authData
    isAuthenticated.value = true
    
    if (rememberMe) {
      localStorage.setItem('auth', JSON.stringify(authData))
    } else {
      sessionStorage.setItem('auth', JSON.stringify(authData))
    }
  }

  const checkEmailExists = (email) => {
    const emailLower = email.toLowerCase()
    // Check if it's the admin email
    if (emailLower === 'admin@gmail.com') {
      return true
    }
    // Check registered users
    return registeredUsers.value.some(user => user.email.toLowerCase() === emailLower)
  }

  const signup = (userData, rememberMe = false) => {
    // Check if email already exists
    if (checkEmailExists(userData.email)) {
      throw new Error('An account with this email already exists. Please use a different email or log in.')
    }
    
    const authData = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      name: userData.firstName,
      isAdmin: false,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
      // Profile data
      profile: {
        weight: userData.weight,
        height: userData.height,
        age: userData.age,
        activityLevel: userData.activityLevel,
        goal: userData.goal,
        currentWeight: userData.currentWeight,
        targetWeight: userData.targetWeight,
        chronicDisease: userData.chronicDisease || ''
      }
    }
    
    // Add to registered users
    registeredUsers.value.push({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    })
    
    // Save registered users to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value))
    }
    
    user.value = authData
    isAuthenticated.value = true
    
    if (rememberMe) {
      localStorage.setItem('auth', JSON.stringify(authData))
    } else {
      sessionStorage.setItem('auth', JSON.stringify(authData))
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('auth')
    sessionStorage.removeItem('auth')
    
    // Clear cart and wishlist when logging out
    // This will be handled by useCart watching the auth state
  }

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth')
      if (savedAuth) {
        const authData = JSON.parse(savedAuth)
        isAuthenticated.value = authData.isAuthenticated || false
        user.value = authData
      }
    }
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    login,
    signup,
    logout,
    checkAuth,
    checkEmailExists
  }
}

