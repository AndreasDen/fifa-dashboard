import Vue from 'vue'
import Router from 'vue-router'
import TeamOverview from '../views/TeamOverview'
import PlayerOverview from '../views/PlayerOverview'
import PlayerComparison from '../views/PlayerComparison'
import NewGameForm from '../views/NewGameForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/team-overview',
      name: 'TeamOverview',
      component: TeamOverview,
      props: true
    },
    {path: '/player-overview', name: 'PlayerOverview', component: PlayerOverview, props: true},
    {path: '/player-comparison', name: 'PlayerComparison', component: PlayerComparison, props: true},
    {path: '/new-game-form', name: 'NewGameForm', component: NewGameForm, props: true},
    {path: '/', redirect: {name: 'TeamOverview'}}
  ]
})
