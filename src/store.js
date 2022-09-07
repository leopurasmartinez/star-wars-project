import { createStore } from 'vuex';

function initialState() {
  return {
    isShowToast: false,
    personData: {}
  }
}

export default createStore({
  state: initialState(),
  mutations: {
    setShowToast(state, visible) {
      state.isShowToast = visible;
    },
    setPersonData(state, data) {
      state.personData = data;
    }
  },
});