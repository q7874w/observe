import observe from './observe'

function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  const vm = this  // 保存this，避免代码中this过多指向混乱
  vm.$options = options   // 后边传递参数的时候会直接传递vm，把options 赋值给vm.$options 调用时更方便直观
  
  if (vm.$options.data) {
    var data = vm.$options.data
  
    // 判断data的数据结构，如果是函数就执行并将this指向 vue实例化对象
    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {}

    // 给vm._data中的数据添加数据劫持,这样我们就可以通过 this.title来访问_data中的数据，而不是this._data.title
    for (var key in data) {
        proxyData(vm,'_data', key)
    }

    // 通过 defineProperty来劫持数据
    observe(vm._data)
  }
}

function proxyData(vm,target,key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
     vm[target][key] = newValue
    }
  })
}

export default Vue