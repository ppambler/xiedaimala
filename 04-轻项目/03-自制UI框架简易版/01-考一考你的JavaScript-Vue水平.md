---
typora-copy-images-to: img\01
---

# 考一考你的 JavaScript、Vue水平

## ★第 1 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
window.n = 'window name'
let obj = {
    n: 'obj name',
    sayN(){
        console.log(this.n)
    }
}

let fn = obj.sayN
fn()
```

1.  'window name'
2.  'obj name'
3.  undefined

分析：

考察this的值到底是啥？我们的fn拿到了obj对象的sayN的函数引用，仅此而言，不要想着，这和obj对象有啥关联的！

当我们调用fn函数，根据「this是call的第一个参数」这样的原则，由于这不是在严格模式下，显然`undefined`可以GG了，取而代之的是 `window`

所以答案是 `window name`

## ★第 2 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
window.n = 'window name'
let obj = {
    n: 'obj name',
    sayN: () => {
        console.log(this.n)
    }
}

obj.sayN()
```

1.  'window name'
2.  'obj name'
3.  undefined

分析：

考察的还是this，不过这次的this是在ES6出现的新语法箭头函数里边的，而这个语法的规则，不同普通函数的定义，虽然都是函数，但是对待 `this`，持有不同的观点，箭头函数认为 `this`就是父级作用域的 `this`值，不管时谁调用的，还是传参数指定的，都无效！

由于对象的 `{}`不构成作用域，所以this的值就是window啦！

所以答案还是 `window.name`

## ★第 3 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
class A{
    constructor(){
        this.name = 'A'
    }
    sayName(){
        console.log(this.name)
    }
}
class B extends A{
    constructor(){
        super()
        this.name = 'B'
    }
}

let obj = new B()
console.log(obj.sayName())
```

1.  'A'
2.  'B'
3.  undefined

分析：

看到class这个关键字，想起了面向对象，不过本质还是基于原型的面向对象！ES6无非就是加糖罢了！

new一个对象出来，意味着`constructor`要被执行，有这样一条规则：

> 如果子类中存在构造（constructor）函数，则需要在使用“this”之前首先调用 super()

所以，在这里边，子类B并没有用到继承而来的name属性，而是自己定义了一份！

那么当我们sayName的时候，找到的name是自己的name，而不是来自父类A的name

因此，答案是 `B`

## ★第 4 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
Promise.reject('error')
    .then( ()=>{console.log('success1')}, ()=>{console.log('error1')} )
    .then( ()=>{console.log('success2')}, ()=>{console.log('error2')} )
```

1.  先输出 'error1' 再输出 'error2'
2.  先输出 'error1' 再输出 'success2'
3.  先输出 'success1' 再输出 'success2'
4.  先输出 'success1' 再输出 'error2'

分析：

主题考察的是Promise。代码里边，我们知道`reject`了，即主动模拟了某种行为出错了！那么就会then的第二个回调，即所谓的「失败回调」，而这个回调处理得还行，咩有什么语法报错等情况出现，于是下一个就执行第一个回调，即所谓的「成功回调」

所以答案是：

`先输出 'error1' 再输出 'success2'`

## ★第 5 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```html
<div id=app></div>
```

```js
window.name = 'window name'
let app = new Vue({
    name: 'name 1',
    el: '#app',
    data(){
      return {name:'name 2'}
    },
    created(){
        console.log(this.name)
    }
})
```

1.  'window name'
2.  'name 1'
3.  'name 2'

分析：

这题关键在于created这个钩子函数，不过我忘记这个钩子函数有啥用了！

![Vue生命周期钩子](img/01/lifecycle.png)

看到这图，这个钩子应该是实例挂载到DOM元素上前就触发的！

或许我无法读取到el属性的值，但是其它属性还是可以初始化的对吧！至于mounted钩子里边的this，显然是vue实例，因为按照我之前对 `new` 的认识，JS之父一开始的加糖操作就把this的值搞成是一个空对象了，再加上根据之前对「实现一个MVVM框架」的认识，new的一开始就是 `init`初始化，而这个name属性，显然要比el属性普通得多，对吧！那么name属性的值有无肯定是在el属性有值之前才有的！

所以答案是 `‘name 1’`

> 这题我错了，我猜结果应该是 `name 2`，因为data属性同样也是有值了，而且该值覆盖了原先的name属性！毕竟它在后边！



## ★第 6 题

关于 Vue 中的 key 属性，下列说法正确的有：

1.  当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
2.  为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。
3.  理想的 key 值是每项都有的且唯一的 id。
4.  2.2.0+ 的版本里，当在组件中使用 v-for 时，key 是必须的。

分析：

这题显然是多选，我想这考察的是自己去查阅vue官方文档！

我没有去查阅，据以往做选择题的题感以及已有的一些零碎知识，我猜123这三个答案是很合理的！

> 这一题，有毒啊！我在另一个版本的课程里边，发现这个答案是错误的！
>
> 答案是1234呀！最后一个答案也是正确的！

## ★第 7 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

var Component = Vue.extend({
  mixins: [myMixin],
  methods: {
    hello(){
      console.log('hello from options')
    }
  }
})

var component = new Component()
```

1.  'hello from mixin!'
2.  'hello from options'

分析：

遇到知识盲点了，这个`extend`方法难道是「扩展」之意？还是「继承」之意呢？

还有这个 `mixins`是关键字，对吧！那么它的作用是什么呢？

这给我的感觉类似于`props`这个属性啊！

既然一个Component是组件之意，我们默认显然是自有的methods方法对吧！可这里多了个`mixins`，显然这里不会多此一举，因此，我可以认为，这里的mixins中的第一个元素变量的methods属性值就是替换的结果！

因此，答案是 1

> 难道「多此一举」是个坑？这题，我是真得不懂啊！
>
> 既然不是1，那就是2了！
>
> 我查阅了官方文档：
>
> ➹：[API — Vue.js](https://cn.vuejs.org/v2/api/index.html#Vue-extend)
>
> 它是一个全局API，使用这个基本的Vue构造函数，我们就可以创建出一个所谓的「子类」了！
>
> 有两个点需要注意一下：
>
> 1. **参数是一个包含组件选项的对象**
> 2. `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数
>
> 而题目中并没有包含组件选项啊！也就是所谓的template属性！
>
> 既然答案没错，那么问题的管家就是mixins这个属性了：
>
> ➹：[混入 — Vue.js](https://cn.vuejs.org/v2/guide/mixins.html)
>
> 按照官方的说法：
>
> 混入 (mixin) 提供了一种非常**灵活**的方式，来**分发 Vue 组件中的可复用功能**。一个**混入对象**可以包含**任意**组件**选项**。当**组件使用混入对象**时，所有**混入对象的选项将被“混合”进入该组件本身的选项**。
>
> 官方里边有个例子与之类似，只是结果是`1`，至此，我认为，先混入对象，然后其methods方法被我们覆盖了！这就类似于子类继承了父类的属性方法，但是子类还是可以覆盖这些继承而来的属性和方法的！
>
> 突然，明白Vue.extend的结果就是个Vue实例，既然是实例，那也就是说它是组件咯！
>
> 根据这里的介绍：
>
> ➹：[Vue 实例 — Vue.js](https://cn.vuejs.org/v2/guide/instance.html)
>
> **所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)**

## ★第 8 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
function getSomething(){
    setTimeout(function(){
        return 'hello'
    })
}

let something = getSomething()
console.log(something)
```

1.  'hello'
2.  timer 的 id
3.  undefined

分析：

这题忒简单了吧！调用这个`getSomething`函数，延时函数里边那个回调函数扔到web APis里边去就不管了，默认最小值好像有个4ms延时。接下来，没有return，默认就返回的结果就是`undefined`

然后lo出结果之后，清空call stack，接着执行那个延时函数里边的callback

返回一个 `hello`

所以结果是 `undefined`

## ★第 9 题

下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）

```js
let _name = 'MyName'
let obj = {}
Object.defineProperty(obj, 'name', {
    get(){
        return _name
    },
    set(value){
        _name = value
    }
})

obj.name = 'NewName'
console.log(_name)
```

1.  'MyName'
2.  'NewName'
3.  undefined

分析：
考察这个 `defineProperty`API的特性，根据所传的第3个参数，这是在劫持数据，或者说setter/getter时都会执行一个函数！

因此在这里，这个 `‘name’`属性是被监控的，所以我们对其赋值的话，那么全局变量 `_name`的值也会发生变动，有种隔山打牛的调调！

所以全局变量 `_name`的值是 `NewName`

## ★结果

![1555780027715](img/01/1555780027715.png)

改正答案后，终于全对了！

