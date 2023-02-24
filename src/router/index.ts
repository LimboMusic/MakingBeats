import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import('@/layout/FirstPage/index.vue'),
      path: '/',
      children: [

      ],
    },
  ],
})

export default router
