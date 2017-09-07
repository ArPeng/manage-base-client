import Vue from 'vue'
import Vuex from 'vuex'

import app from './mudules/app'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app
  },
  getters
})
