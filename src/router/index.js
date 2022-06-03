import Vue from 'vue'
import VueRouter from 'vue-router'
import MenuView from '../components/MenuView.vue'
import Reservation from '../components/ReservationPage.vue'
import QuestionAdd from '../components/QuestionAddPage.vue'
import Cread from '../components/CreadTestPage.vue'
import Iadl from '../components/IADLTestPage.vue'
import Geriatric from '../components/GeriatricTestPage.vue'
import Global from '../components/GlobalTestPage.vue'

import LoginView from '../views/LoginView.vue'
import Sign from '../views/SignView.vue'
import MainView from '../views/MainView.vue'
import Tested from '../views/ReservationView.vue'
import Search from '../views/SearchPatientView.vue'
import Cognitive from '../views/CognitiveTestView.vue'
import Language from '../views/LanguageTestView.vue'
import Question from '../views/QuestionAddView.vue'
import Paper from '../views/PaperAddView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  },
  {
    path: '/main',
    name: 'Main',
    components: {
      header: MenuView,
      footer: MainView
    }
  },
  {
    path: '/patientadd',
    name: 'Add',
    components: {
      header: MenuView,
      footer: () => import('../components/PatientAddPage.vue')
    }
  },
  {
    path: '/reservation',
    name: 'Reservation',
    components: {
      header: MenuView,
      footer: Reservation
    }
  },
  {
    path: '/reservationedit',
    name: 'ReservationEdit',
    components: {
      header: MenuView,
      footer: () => import('../components/ReservationEditPage.vue')
    }
  },
  {
    path: '/patientedit',
    name: 'Edit',
    components: {
      header: MenuView,
      footer: () => import('../components/PatientEditPage.vue')
    }
  },
  {
    path: '/testedperson',
    name: 'Tested',
    components: {
      header: MenuView,
      footer: Tested
    }
  },
  {
    path: '/searchpatient',
    name: 'Search',
    components: {
      header: MenuView,
      footer: Search
    }
  },
  {
    path: '/cognitive',
    name: 'CognitiveTest',
    components: {
      header: MenuView,
      footer: Cognitive
    }
  },
  {
    path: '/language',
    name: 'LanguageTest',
    components: {
      header: MenuView,
      footer: Language
    }
  },
  {
    path: '/question',
    name: 'Question',
    components: {
      header: MenuView,
      footer: Question
    }
  },
  {
    path: '/questionadd',
    name: 'QuestionAdd',
    components: {
      header: MenuView,
      footer: QuestionAdd
    }
  },
  {
    path: '/paper',
    name: 'Paper',
    components: {
      header: MenuView,
      footer: Paper
    }
  },
  {
    path: '/cread',
    name: 'Cread',
    components: {
      header: MenuView,
      footer: Cread
    }
  },
  {
    path: '/iadl',
    name: 'Iadl',
    components: {
      header: MenuView,
      footer: Iadl
    }
  },
  {
    path: '/geriatric',
    name: 'Geriatric',
    components: {
      header: MenuView,
      footer: Geriatric
    }
  },
  {
    path: '/global',
    name: 'Global',
    components: {
      header: MenuView,
      footer: Global
    }
  },
  {
    path: '/ant',
    name: 'Ant',
    components: {
      header: MenuView,
      footer: () => import('../components/ANTPage.vue')
    }
  },
  {
    path: '/ap',
    name: 'Ap',
    components: {
      header: MenuView,
      footer: () => import('../components/APPage.vue')
    }
  },
  {
    path: '/ins',
    name: 'Ins',
    components: {
      header: MenuView,
      footer: () => import('../components/INSPage.vue')
    }
  },
  {
    path: '/com',
    name: 'Com',
    components: {
      header: MenuView,
      footer: () => import('../components/COMPage.vue')
    }
  },
  {
    path: '/story',
    name: 'Story',
    components: {
      header: MenuView,
      footer: () => import('../components/StoryPage.vue')
    }
  },
  {
    path: '/image',
    name: 'Image',
    components: {
      header: MenuView,
      footer: () => import('../components/ImagePage.vue')
    }
  },
  {
    path: '/step',
    name: 'Step',
    components: {
      header: MenuView,
      footer: () => import('../components/StepPage.vue')
    }
  },
  {
    path: '/cowat',
    name: 'Cowat',
    components: {
      header: MenuView,
      footer: () => import('../components/CowatPage.vue')
    }
  },
  {
    path: '/completion',
    name: 'Completion',
    components: {
      header: MenuView,
      footer: () => import('../components/CompletionPage.vue')
    }
  },
  {
    path: '/priming',
    name: 'Priming',
    components: {
      header: MenuView,
      footer: () => import('../components/PrimingPage.vue')
    }
  },
  {
    path: '/cmpt',
    name: 'Cmpt',
    components: {
      header: MenuView,
      footer: () => import('../components/CMPTPage.vue')
    }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
