import axiosHttp from 'axios'

// insert all your axios logic here

export const axios = axiosHttp

export default {
  install (Vue) {
    Vue.prototype.$axios = axiosHttp
  }
}
