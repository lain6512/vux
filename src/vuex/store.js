import Vue from 'vue'
import Vuex from 'vuex'

import State from './state'
import Actions from './actions'
import Mtations from './mutations'

Vue.use(Vuex);



//变量存储
const state = State;
const mutations = Mtations;
const actions = Actions;

export  default new Vuex.Store({
    state,
    mutations,
    actions
})
