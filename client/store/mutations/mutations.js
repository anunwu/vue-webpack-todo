export default {
  // 第二个参数只能接受一个基本类型或者一个对象
  updateCount(state, { num, num2 }) {
    state.count = num
  }
}
