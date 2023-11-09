// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/store/auth";


const routes = [

{
  path: '/',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
},
{
  path: '/register/',
  name: 'Register',
  component: () => import('@/views/Register.vue'),
},
{
  path: '/forgotpw/',
  name: 'ForgotPw',
  component: () => import('@/views/ForgotPw.vue'),
},
{
  path: '/tnc/',
  name: 'tnc',
  component: () => import('@/views/Tnc.vue'),
},
  
  {
    path: '/home/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/donate/',
    name: 'Donate',
    component: () => import('@/views/Donate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/application/',
    name: 'Application',
    component: () => import('@/views/UserApplication.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/faq/',
    name: 'FAQ',
    component: () => import('@/views/FAQ.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/stats/',
    name: 'Stats',
    component: () => import('@/views/Stats.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/',
    component: () => import('@/layouts/Home/HomeAdminNav.vue'),
    children: [
      {
        path: 'homepage',
        name: 'Adminhome',
        component: () => import('@/views/HomeAdmin.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: () => import('@/views/AdminInventory.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'database',
        name: 'Database',
        component: () => import('@/views/DataBase.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/FAQ/',
    name: 'FAQ',
    component: () => import('@/views/FAQ.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/application/',
    name: 'Application',
    component: () => import('@/views/UserApplication.vue'),
    meta: { requiresAuth: true }
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.$state.user) {
    return {
      path: '/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  } 
})

export default router;


