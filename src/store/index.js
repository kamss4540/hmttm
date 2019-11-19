import Vue from 'vue'
import Vuex from 'vuex'
// 操作userLocal的方法
import { setUserLocal, getUserLocal } from '@/utils/userlocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getUserLocal()
  },
  mutations: {
    setuser: function (state, userinfo) {
      state.user = userinfo
      setUserLocal(userinfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
