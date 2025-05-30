import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LogInView from "../views/LogInView.vue"
import deleteAccountView from "../views/DeleteAccount.vue"
import createCharacterView from "../views/CharacterCreation.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/deleteAccount', 
    name: 'deleteAccount',
    component: deleteAccountView
  },
  {
    path: '/createCharacter',
    name: 'createCharacter',
    component: createCharacterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
