// mutations只支持同步代码，而actions可以支持异步代码
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', { num: data.num })
    }, data.time)
  }
}
