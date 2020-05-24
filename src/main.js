// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from './plugins/axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faCrown, faAngleRight, faAngleLeft  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCrown, faSearch, faAngleRight, faAngleLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios)

Vue.config.productionTip = false

new Vue({el: '#app', router, render: h => h(App)})
