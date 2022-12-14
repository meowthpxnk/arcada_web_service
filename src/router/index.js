import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import RestaurantsView from '@/views/RestaurantsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderView from '@/views/OrderView.vue'
import DashboardAutorisate from '@/views/DashboardAutorisate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {name: 'restaurants'}
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: HomeView
  },
  {
    path: '/restaurants/:link',
    name: 'restaurant',
    component: RestaurantsView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/dashboard/autorisate',
    name: 'dashboardAutorisate',
    component: DashboardAutorisate
  },
  {
    path: '/orders/:id',
    name: 'order',
    component: OrderView
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
