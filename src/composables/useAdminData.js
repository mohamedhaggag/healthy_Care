import { ref, computed } from 'vue'
import { products as initialProducts } from '../data/products'

// Save functions (hoisted) — must be defined before first use
function saveProducts(productsRef) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminProducts', JSON.stringify(productsRef.value))
  }
}

function saveDoctors(doctorsRef) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminDoctors', JSON.stringify(doctorsRef.value))
  }
}

// Products management
const adminProducts = ref([])

// Doctors management
const doctors = ref([])

// Load data from localStorage
if (typeof window !== 'undefined') {
  // Load products
  const savedProducts = localStorage.getItem('adminProducts')
  if (savedProducts) {
    adminProducts.value = JSON.parse(savedProducts)
  } else {
    // Initialize with products from products.js
    adminProducts.value = initialProducts.map(p => ({
      ...p,
      stock: p.inStock ? 100 : 0,
      reviews: Math.floor(Math.random() * 200) + 50,
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=600&fit=crop'
    }))
    saveProducts(adminProducts)
  }

  // Load doctors
  const savedDoctors = localStorage.getItem('adminDoctors')
  if (savedDoctors) {
    doctors.value = JSON.parse(savedDoctors)
  } else {
    // Initialize with default doctors
    doctors.value = [
      { id: 1, name: 'Dr. Ahmed Hassan', specialization: 'Nutrition Specialist', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', patients: 145, rating: 4.9, status: 'Active', tags: ['Diet', 'Weight Loss'], email: 'ahmed.hassan@healthycare.com', phone: '+20 123 456 7890', experience: '10 years', joinedDate: '2020-01-15' },
      { id: 2, name: 'Dr. Mohamed Ali', specialization: 'Fitness Coach', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', patients: 132, rating: 4.8, status: 'Active', tags: ['Training', 'Cardio'], email: 'mohamed.ali@healthycare.com', phone: '+20 123 456 7891', experience: '8 years', joinedDate: '2020-03-20' },
      { id: 3, name: 'Dr. Omar Khalil', specialization: 'Mental Health', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', patients: 98, rating: 4.7, status: 'Active', tags: ['Therapy', 'Wellness'], email: 'omar.khalil@healthycare.com', phone: '+20 123 456 7892', experience: '12 years', joinedDate: '2019-11-10' },
      { id: 4, name: 'Dr. Youssef Ibrahim', specialization: 'General Practitioner', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', patients: 210, rating: 4.9, status: 'Active', tags: ['General', 'Checkup'], email: 'youssef.i@healthycare.com', phone: '+20 123 456 7893', experience: '15 years', joinedDate: '2018-06-05' },
      { id: 5, name: 'Dr. Karim Mahmoud', specialization: 'Sports Medicine', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', patients: 87, rating: 4.6, status: 'Inactive', tags: ['Sports', 'Injury'], email: 'karim.m@healthycare.com', phone: '+20 123 456 7894', experience: '7 years', joinedDate: '2021-02-14' },
      { id: 6, name: 'Dr. Tarek Samir', specialization: 'Nutrition Specialist', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', patients: 156, rating: 4.8, status: 'Active', tags: ['Nutrition', 'Meal Plans'], email: 'tarek.samir@healthycare.com', phone: '+20 123 456 7895', experience: '9 years', joinedDate: '2020-08-22' },
      { id: 7, name: 'Dr. Amr Fathy', specialization: 'Cardiology', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', patients: 178, rating: 4.9, status: 'Active', tags: ['Heart', 'Cardio'], email: 'amr.fathy@healthycare.com', phone: '+20 123 456 7896', experience: '13 years', joinedDate: '2019-04-18' },
      { id: 8, name: 'Dr. Hossam Adel', specialization: 'Physiotherapy', avatar: 'https://randomuser.me/api/portraits/men/88.jpg', patients: 92, rating: 4.7, status: 'Active', tags: ['Rehab', 'Therapy'], email: 'hossam.adel@healthycare.com', phone: '+20 123 456 7897', experience: '6 years', joinedDate: '2021-09-30' },
      { id: 9, name: 'Dr. Samy El-Sawy', specialization: 'Fitness Coach', avatar: 'https://randomuser.me/api/portraits/men/99.jpg', patients: 124, rating: 4.8, status: 'Active', tags: ['Fitness', 'Strength'], email: 'samy.elsawy@healthycare.com', phone: '+20 123 456 7898', experience: '11 years', joinedDate: '2020-05-12' }
    ]
    saveDoctors(doctors)
  }
}

// Get all orders from all users
const getAllOrders = () => {
  if (typeof window === 'undefined') return []
  
  const allOrders = []
  const keys = Object.keys(localStorage)
  
  keys.forEach(key => {
    if (key.startsWith('orders_')) {
      try {
        const userOrders = JSON.parse(localStorage.getItem(key))
        if (Array.isArray(userOrders)) {
          userOrders.forEach(order => {
            allOrders.push({
              ...order,
              userEmail: key.replace('orders_', '')
            })
          })
        }
      } catch (e) {
        console.error('Error parsing orders:', e)
      }
    }
  })
  
  return allOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Get all users from localStorage
const getAllUsers = () => {
  const allUsers = []
  
  // Get registered users from localStorage directly
  const savedUsers = localStorage.getItem('registeredUsers')
  const registeredUsersList = savedUsers ? JSON.parse(savedUsers) : []
  
  if (registeredUsersList && registeredUsersList.length > 0) {
    registeredUsersList.forEach(user => {
      // Try to get full user data from auth
      let authData = null
      try {
        authData = JSON.parse(localStorage.getItem('auth') || sessionStorage.getItem('auth') || 'null')
      } catch (e) {
        // Ignore
      }
      
      if (authData && authData.email === user.email) {
        allUsers.push({
          id: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=00c288&color=fff`,
          goal: authData.profile?.goal || 'Health',
          status: 'Active',
          joined: new Date(authData.loginTime || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          profile: authData.profile || {}
        })
      } else {
        allUsers.push({
          id: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=00c288&color=fff`,
          goal: 'Health',
          status: 'Active',
          joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          profile: {}
        })
      }
    })
  }
  
  return allUsers
}

export function useAdminData() {
  // Products CRUD
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      images: productData.images || [productData.image || 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=600&fit=crop'],
      inStock: productData.stock > 0,
      createdAt: new Date().toISOString()
    }
    adminProducts.value.push(newProduct)
    saveProducts(adminProducts)
    return newProduct
  }

  const updateProduct = (id, productData) => {
    const index = adminProducts.value.findIndex(p => p.id === id)
    if (index !== -1) {
      adminProducts.value[index] = {
        ...adminProducts.value[index],
        ...productData,
        inStock: productData.stock !== undefined ? productData.stock > 0 : adminProducts.value[index].inStock,
        updatedAt: new Date().toISOString()
      }
      saveProducts(adminProducts)
      return adminProducts.value[index]
    }
    return null
  }

  const deleteProduct = (id) => {
    const index = adminProducts.value.findIndex(p => p.id === id)
    if (index !== -1) {
      adminProducts.value.splice(index, 1)
      saveProducts(adminProducts)
      return true
    }
    return false
  }

  // Doctors CRUD
  const addDoctor = (doctorData) => {
    const newDoctor = {
      id: Date.now(),
      ...doctorData,
      patients: 0,
      rating: 5.0,
      status: doctorData.status || 'Active',
      tags: doctorData.tags || [],
      joinedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }
    doctors.value.push(newDoctor)
    saveDoctors(doctors)
    return newDoctor
  }

  const updateDoctor = (id, doctorData) => {
    const index = doctors.value.findIndex(d => d.id === id)
    if (index !== -1) {
      doctors.value[index] = {
        ...doctors.value[index],
        ...doctorData,
        updatedAt: new Date().toISOString()
      }
      saveDoctors(doctors)
      return doctors.value[index]
    }
    return null
  }

  const deleteDoctor = (id) => {
    const index = doctors.value.findIndex(d => d.id === id)
    if (index !== -1) {
      doctors.value.splice(index, 1)
      saveDoctors(doctors)
      return true
    }
    return false
  }

  // Statistics
  const stats = computed(() => {
    const allUsers = getAllUsers()
    const allOrders = getAllOrders()
    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.total || 0), 0)
    const thisMonthOrders = allOrders.filter(order => {
      const orderDate = new Date(order.date)
      const now = new Date()
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
    })
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + (order.total || 0), 0)
    
    const activeDoctors = doctors.value.filter(d => d.status === 'Active').length
    const activeUsers = allUsers.filter(u => u.status === 'Active').length
    
    return {
      totalUsers: allUsers.length,
      activeUsers: activeUsers,
      totalDoctors: doctors.value.length,
      activeDoctors: activeDoctors,
      totalProducts: adminProducts.value.length,
      inStockProducts: adminProducts.value.filter(p => p.stock > 0).length,
      lowStockProducts: adminProducts.value.filter(p => p.stock > 0 && p.stock < 20).length,
      totalRevenue: totalRevenue,
      monthlyRevenue: thisMonthRevenue,
      totalOrders: allOrders.length,
      monthlyOrders: thisMonthOrders.length
    }
  })

  return {
    // Products
    products: computed(() => adminProducts.value),
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Doctors
    doctors: computed(() => doctors.value),
    addDoctor,
    updateDoctor,
    deleteDoctor,
    
    // Users
    getAllUsers,
    
    // Orders
    getAllOrders,
    
    // Stats
    stats
  }
}

