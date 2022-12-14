import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import RestaurantsView from '@/views/RestaurantsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderView from '@/views/OrderView.vue'
import DashboardAutorisate from '@/views/DashboardAutorisate.vue'
import RedirectQRView from '@/views/RedirectQRView.vue'
import MenuQRView from '@/views/MenuQRView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {name: 'restaurants'}
  },
  {
    path: '',
    name: 'restaurants',
    component: HomeView
  },
  {
    path: '/:link',
    name: 'restaurant',
    children: [
      {
        path: '',
        name: 'restaurant_view',
        component: RestaurantsView,
      },
      {
        path: 'qr',
        name: 'restaurant_qr',
        component: MenuQRView,
      },
    ],
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
    path: '/redirectQR/:desk_key',
    name: 'redirectQR',
    component: RedirectQRView,
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
