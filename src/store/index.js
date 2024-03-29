import Vue from 'vue'
import Vuex from 'vuex'
import state from '@store/state'
import getters from '@store/getters'
import actions from '@store/actions'
import mutations from '@store/mutations'
import app from '@store/modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    app
  },
  strict: true
})
