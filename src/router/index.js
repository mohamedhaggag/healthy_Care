import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/plan',
            name: 'plan',
            component: () => import('../views/PlanView.vue')
        },
        {
            path: '/shop',
            name: 'shop',
            component: ShopView
        },
        {
            path: '/blogs',
            name: 'blogs',
            component: () => import('../views/BlogsView.vue')
        },
        {
            path: '/blogs/:slug',
            name: 'blog-details',
            component: () => import('../views/BlogDetailsView.vue')
        },
        {
            path: '/experts/:id',
            name: 'expert-profile',
            component: () => import('../views/DoctorProfileView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignUpView.vue')
        },
        {
            path: '/product/:id',
            name: 'product-details',
            component: () => import('../views/ProductDetailsView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue')
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: () => import('../views/WishlistView.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue')
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: () => import('../views/CheckoutView.vue')
        },
        {
            path: '/order-complete',
            name: 'order-complete',
            component: () => import('../views/OrderCompleteView.vue')
        },
        {
            path: '/doctor-dashboard',
            name: 'doctor-dashboard',
            component: () => import('../views/DoctorDashboardView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/doctor-clients',
            name: 'doctor-clients',
            component: () => import('../views/ClientsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/doctor-client-details/:id',
            name: 'doctor-client-details',
            component: () => import('../views/ClientDetailsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/doctor-messages',
            name: 'doctor-messages',
            component: () => import('../views/MessagesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin-dashboard',
            name: 'admin-dashboard',
            component: () => import('../views/AdminDashboardView.vue'),
            meta: { requiresAdmin: true }
        },
        {
            path: '/admin-users',
            name: 'admin-users',
            component: () => import('../views/AdminUsersView.vue'),
            meta: { requiresAdmin: true }
        },
        {
            path: '/admin-doctors',
            name: 'admin-doctors',
            component: () => import('../views/AdminDoctorsView.vue'),
            meta: { requiresAdmin: true }
        },
        {
            path: '/admin-products',
            name: 'admin-products',
            component: () => import('../views/AdminProductsView.vue'),
            meta: { requiresAdmin: true }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
})

router.beforeEach((to, from, next) => {
    const authData = JSON.parse(localStorage.getItem('auth') || sessionStorage.getItem('auth') || 'null')
    const isDoctor = authData?.isDoctor || localStorage.getItem('doctor_auth') === 'true'
    const isAdmin = authData?.isAdmin === true

    if (to.meta.requiresAdmin && !isAdmin) {
        next('/login')
    } else if (to.meta.requiresAuth && !isDoctor && !isAdmin) {
        next('/login')
    } else if (to.path === '/login' && (isDoctor || isAdmin)) {
        next(isAdmin ? '/admin-dashboard' : '/doctor-dashboard')
    } else {
        next()
    }
})

export default router
