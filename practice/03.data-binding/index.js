import Vue from 'vue'

var globalVar =  '111' // 无法被vue实例访问

new Vue({
  el: '#root',
  // 可使用js默认的全局变量，但是自己定义在外层的全局变量不可访问
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     {{ isActive ? 'active' : 'not active'}}
  //     {{ arr.join(' ') }}
  //     {{ Date.now() }}
  //     {{ globalVar }}
  //     {{ html }}
  //     <span v-html="html"></span>
  //   </div>
  // `,
  template: `
<!--    <div :class="{ active: isActive }">-->
    <div :class="['main', { active:  isActive }]"
         :style="[styles, styles2]"
    >
      <p v-html="html"></p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: `<span>666</span>`,
    aaa: 'main',
    styles: {
      color: 'red',
      // 消除浏览器默认样式
      appearance: 'none'
    },
    styles2: {
      color: 'black'
    }
  },
  methods: {
    handleClick() {
      alert('clicked')
    }
  }
})
