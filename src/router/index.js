import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import InterviewPage from '../views/InterviewPage.vue'
import PageForInterviewee from '@/views/PageForInterviewee.vue'
import PageForInterviewer from '@/views/PageForInterviewer.vue'
import CreateInterviewPage from '../views/CreateInterview.vue'
import InterviewResultPage from '../views/InterviewResult.vue'
import ScorePage from '../views/ScorePage.vue'

const routes = [
  { 
    path: '/', 
    name: 'login',
    component: LoginPage 
  },
  { 
    path: '/interview', 
    name: 'interview',
    component: InterviewPage,
    
  },
  { 
    path: '/interviewee', 
    name: 'interviewee',
    component: PageForInterviewee,
  },
  { 
    path: '/interviewer', 
    name: 'interviewer',
    component: PageForInterviewer,
    
  },
  { 
    path: '/create', 
    name: 'create',
    component: CreateInterviewPage,
    
  },
  { 
    path: '/result', 
    name: 'result',
    component: InterviewResultPage,
    
  },
  { 
    path: '/score', 
    name: 'score',
    component: ScorePage,
    
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  if (to.meta.requiresAuth && !username) {
    next({ name: 'login' })
  } else {
    next()
  }
})

// Error handling
router.onError((error) => {
  console.error('Router error:', error)
  router.push({ name: 'login' })
})

export default router