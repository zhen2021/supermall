module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js','.vue','.json'],
      alias:{
        //默认了让@代替src路径   自定义设置路径简写
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',   
    }
    }
  }
}