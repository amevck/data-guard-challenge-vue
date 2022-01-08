import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', redirect: '/marketing' },
  {
    path: '/marketing',
    name: 'marketing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    props: { path: "marketing", name: "tab1" }
  },
  {
    path: '/finance',
    name: 'finance',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    props: { path: "finance", name: "tab2" }
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    props: { path: "personnel", name: "tab3" }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
