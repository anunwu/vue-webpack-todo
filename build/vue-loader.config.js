// 以下配置仅为了学习讲师的课程，现在出现的vue-loader已经帮我们做了以下的配置了
module.exports = (isDev) => {
  return {
    // 默认取出<template></template>中前后多余空格
    preserverWhiteSpace: true,
    // 将.vue中的样式代码也一并打包到最终的.css文件
    extractCSS: !isDev,
    cssModules: {
      // 使.vue文件中的css类名是由路径-文件名-5位哈希值组成的
      // 但前提是需要在.vue文件的html代码中:class="$style.[类名]"
      // ==> 最终网页看到的类名是：路径-文件名-哈希值，没有显示文件内定义的类名，隐秘性较好
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      // 允许在html中使用驼峰命名类名,css中的main-header会自动转化为mainHeader与html中的类名对应
      camelCase: true
    }
  }
}
