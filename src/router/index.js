import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'
import Comparison from '../views/Comparison'
import Score from '../views/Score'
import Tournament from '../views/Tournament'
import Profile from '../views/Profile'
import Form from '../views/Form'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    },
    {path: '/comparison', name: 'Comparison', component: Comparison, props: true},
    {path: '/score', name: 'Score', component: Score, props: true},
    {path: '/tournament', name: 'Tournament', component: Tournament, props: true},
    {path: '/profile', name: 'Profile', component: Profile, props: true},
    {path: '/form', name: 'Form', component: Form, props: true},
    {path: '/', redirect: {name: 'Dashboard'}}
  ]
})
