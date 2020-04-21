 // 防抖节流函数方法封装  args是func函数需要传的参数
export function debounce(func,delay) {
    let timer = null
    return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this,args)
      },delay)
    }
  }

