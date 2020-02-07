// 类似于组件内的computed
export default {
  fullName (state) {
    return `${ state.firstName } ${ state.lastName }`
  }
}
