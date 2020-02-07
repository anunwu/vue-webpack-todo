import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    // 限制不让外部去修改state的数据，只能通过mutations来修改，但是在production环境下应该取消掉
    strict: isDev ? true : false,
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('my plugins invoked')
        // store.subscribe/subscribeAction/watch....
      }
    ]
    // 模块化
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 0
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus(state, getters, rootState) {
    //         return state.text + rootState.count + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         // 默认从当前模块中寻找，要调用上层的必须传入第三个参数{ root: true }
    //         // commit('updateCount', { num: 55667 }, { root: true })
    //         commit('updateText', rootState.count)
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     actions: {
    //       // 调用模块间的mutations
    //       testActions({ commit }) {
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  // 修改store代码会重新页面，以下使得store也有热更替功能
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
