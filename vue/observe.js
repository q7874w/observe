import { arrMethods, observeArr } from './observeArray'
function observe(data) {
  if (typeof data !== 'object' || data === null) return
  return new Observer(data)
}

function Observer(data) {

  // 因为defineProperty是用来劫持对象的，所以数组的劫持需要单独来实现
  if (Array.isArray(data)) {
    data.__proto__ = arrMethods
    observeArr(data)
  } else {
    this.walk(data)
  }
}

Observer.prototype.walk = function (data) {
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++){
    var key = keys[i],
      value = data[key]
    reactiveData(data,key,value)
  }
}

function reactiveData(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('响应式数据：获取', value);
      return value
    },
    set(newValue) {
      console.log('响应式数据：设置', newValue);
      if (value === newValue) return;
      value = newValue
    }
  })
}

export default observe