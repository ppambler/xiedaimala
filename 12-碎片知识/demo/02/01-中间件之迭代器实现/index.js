import M from './middleware/functions.js'

M([
  function test1(next) {
    console.log(1)
    next()
  },
  function test2(next) {
    console.log(2)
    next()
  },
  function test3(next) {
    console.log(3)
    next()
  },
  function test4(next) {
    console.log(4)
    // next()
  },
  function test5(next) {
    console.log(5)
    next()
  },
  function test6(next) {
    console.log(6)
    next()
  }
])