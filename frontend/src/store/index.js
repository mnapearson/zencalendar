import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    events: [],
    tasks: [],
  },
  mutations: {
    ...vuexfireMutations,
    SET_USER(state, user) {
      state.user = user;
    },
  },

  actions: {
    bindEvents: firestoreAction((context) => {
      return context.bindFirestoreRef(
        "events",
        db.collection("events").where("userId", "==", context.state.user.uid)
      );
    }),
    bindTasks: firestoreAction((context) => {
      return context.bindFirestoreRef(
        "tasks",
        db.collection("tasks").where("userId", "==", context.state.user.uid)
      );
    }),
  },
  modules: {},
});
