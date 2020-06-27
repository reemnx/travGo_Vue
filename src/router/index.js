import Vue from 'vue'
import VueRouter from 'vue-router'
import feed from '../views/feed'
import AboutPage from '../views/AboutPage'
import BooksPage from '../views/BooksPage'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'feed',
    component: feed
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
  path: '/books',
  name: 'BooksPage',
  component: BooksPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
