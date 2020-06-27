import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import postModule from './modules/post.module'
import userModule from './modules/user.module'

export default new Vuex.Store({
  state: {
    msgData: '',
    isMsgShown: false
  },
  mutations: {
    activateMsg(state){
      state.isMsgShown = true ;
    },
    disableMsg(state){
      state.isMsgShown = false ;
    },
    setMsg(state , {content}){
      state.msgData = content
    }
  },
  actions: {
  },
  modules: {
    postModule,
    userModule
  }
})
