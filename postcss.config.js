module.exports = {
  plugins: {
    autoprefixer: {},

    "postcss-px-to-viewport": {
      viewportWidth: 375,   // 视窗宽度，对应的设计稿宽度
      viewportHeight: 667,  // 视窗高度，对应设计稿高度
      unitPrecision: 5,     //  指定'px'转换为视窗单位值的小数位数（很多情况无法整除）
      viewportUnit: 'vw',   //  指定需要转换成的视窗单位，建议使用 vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  //指定不需要转换的类,可在想不转换的元素上加上类ignore也可
      minPixelValue: 1,     //小于或等于'1px'不转换为视窗单位
      mediaQuery: false,     //允许在媒体查询中转换'px'
      exclude:[]          //排除的文件不转换  必须是js正则，/正则规则/

      //  /^abc/: 匹配的内容必须以abc内容开头
      //  /abc/: 匹配所有含有abc的字符串
      //  /abc$/: 匹配内容必须以abc结尾
    }

  }
}