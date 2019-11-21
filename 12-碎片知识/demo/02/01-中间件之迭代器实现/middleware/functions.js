const middleware = (functions) => {
  function* generator(arr) {
    for (let i = 0; i < arr.length; i++) {
      yield arr[i]
    }
  }
  const iterator = generator(functions)

  const init = () => {
    nextDo(iterator.next())
  }

  // n的数据结构：{value:数组里边的一个个函数元素,done:false}
  function nextDo(n) {
    // 传给value的匿名函数参数就是数组里边的函数元素里边的那个next，只要你next()了，那么就会调用这个callback哈！
    n.value(function () {
      const n = iterator.next()

      if (!n.done) {
        nextDo(n)
      } else {
        return
      }
    })
  }

  init()
}

export default middleware