import Toast from './Toast'

const obj = {}

// main.js安装会调用它执行，会传入Vue
obj.install = function (Vue) {
  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor

  // 3、将组件对象手动的挂载到某个元素上
  toast.$mount(document.createElement('div'))

  // 4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 在vue原型上加入toast对象
  Vue.prototype.$toast = toast
}

export default obj