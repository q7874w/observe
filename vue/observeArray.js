import observe from './observe'
const ARR_METHODS = [   // 会改变原数组的7个方法
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
]


const observeArr = function (arr) {
  for (var i = 0; i < arr.length; i++){
    observe(arr[i]) 
  }
}


  var originArrMethods = Array.prototype;  // 拿到Array原型的引用
  var arrMethods = Object.create(originArrMethods);  // 相当于创建了一个新的实例化对象，他的__proto__上有所有的数组方法

  console.log(originArrMethods, '11111');
  console.log(arrMethods, 22222);

  ARR_METHODS.map(function (m) {
    arrMethods[m] = function () {
      var args = Array.prototype.slice.call(arguments);  // 获取调用数组方法时传递过来的参数
      var result = originArrMethods[m].apply(this, args);
      // 到这一步只是把数组原来的方法拿过来执行了一遍
      // 接下来就是给数组中改变的元素添加 数据劫持
      var newArr

      switch (m) {
        case 'push':
        case 'unshift':
          newArr = args
          break;
        case 'splice':
          newArr = args.slice(2)
          break;
        default:
          break;
      }

      newArr && observeArr(newArr)
      return result
    }
  })

 export {
  arrMethods,
  observeArr
}