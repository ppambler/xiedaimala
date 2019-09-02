import tofuA from './A.js'
import tofuB from './B.js'
setTimeout(() => {
  tofuA()
}, 3000)

setTimeout(() => {
  tofuB()
}, 2000)