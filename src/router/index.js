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
    const isAuthenticated = localStorage.getItem('doctor_auth') === 'true'

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else if (to.path === '/login' && isAuthenticated) {
        // If a logged in doctor tries to go to login, send them to dashboard
        next('/doctor-dashboard')
    } else {
        next()
    }
})

export default router
