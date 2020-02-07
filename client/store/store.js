import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    // 限制不让外部去修改state的数据，只能通过mutations来修改，但是在production环境下应该取消掉
    strict: isDev ? true : false,
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
