import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    isAuthenticated: localStorage.getItem('isAuthenticated')
  },
  mutations: {
    setUserInfo(state, data) {
        state.userInfo = data;
    },
    setAuthenticated(state, data) {
      state.isAuthenticated = data;
    }
  },
  actions: {

  },
  modules: {}
});
