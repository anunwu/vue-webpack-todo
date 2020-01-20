// v-on v-bind v-for v-model v-show v-if v-else-if v-else [v-pre v-once v-cloak]
import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
    <!--    只显示text内容，'Text：'不显示-->
      <div v-text="text">Text:{{ text }}</div>
      <div>Text: {{ text }}</div>
      <div v-html="html"></div>
<!--      用display来切换状态-->
      <div v-show="active"></div>
<!--      通过文档流增删来实现-->
      <div v-if="active">active: {{ text }}</div>
<!--      不要用index作为key，因为key是作为唯一标志内容的值，但是index实际上与内容关系不大，能用id就用id-->
      <div v-else-if="text === 0" :key="item">Text: {{ text }}</div>
      <div v-else>not active</div>
      <ul>
        <li v-for="(item, index) in arr">{{ index }} : {{ item }}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{ index }}: {{ key }} : {{ val }}</li>
      </ul>
<!--      v-model用于input标签 .number .trim .lazy -->
      <input type="text" v-model.number="text">
      <input type="checkbox" v-model="active">
      <div>
<!--        value="1" 默认是字符串“1”，加上v-binding使得其是数字1-->
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
    </div>
  `,
  data: {
    text: 0,
    active: false,
    html: `<span>this is html</span>`,
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
  }
})
