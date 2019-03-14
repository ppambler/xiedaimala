---
typora-copy-images-to: img\03
---

# MVVM单向绑定

## ★简介

> MVVM 原理
>
> 项目代码 <https://github.com/jirengu/wheel-mvvm>

## ★MVVM单向绑定的实现（文章）

### ◇概念

MVVM (Model-View-ViewModel) 是一种用于把数据和 UI 分离的设计模式。

MVVM 中的 Model 表示应用程序使用的数据，比如一个用户账户信息(名字、头像、电子邮件等)。Model 保存信息，但通常不处理行为，不会对信息进行再次加工。数据的格式化是由View 处理的。行为一般认为是业务逻辑，封装再 ViewModel 中。

View 是与用户进行交互的桥梁。

ViewModel 充当数据转换器，讲 Model 信息转换为 View 的信息，讲命令从 View 传递到 Model。

### ◇思考

假设有如下代码，data 里的`name`会和视图中的`{{name}}`一一映射，修改 data 里的值，会直接引起视图中对应数据的变化。

```html
<body>
  <div id="app" >{{name}}</div>

  <script>
    function mvvm(){
        //todo...
    }
    var vm = new mvvm({
      el: '#app',
      data: { 
          name: 'jirengu' 
      }
    })
  </script>
<body>
```

如何实现上述 mvvm 呢？

一起回想之前讲的观察者模式和数据监听：

1. 主题(subject)是什么？
2. 观察者(observer)是什么？
3. 观察者何时订阅主题？
4. 主题何时通知更新？

上面的例子中，主题应该是`data`的 `name` 属性，观察者是视图里的`{{name}}`，当一开始执行mvvm初始化(根据 el 解析模板发现`{{name}}`)的时候订阅主题，当`data.name`发生改变的时候，通知观察者更新内容。 我们可以在一开始监控 data.name （Object.defineProperty(data, 'name', {...})），当用户修改 data.name 的时候调用主题的 subject.notify。

### ◇单向绑定实现

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>MVVM 单向绑定</title>
</head>
<body>

<div id="app" >
  <h1>{{name}} 's age is {{age}}</h1>
</div>

<script>

function observe(data) {
  if(!data || typeof data !== 'object') return
  for(var key in data) {
    let val = data[key]
    let subject = new Subject()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        console.log(`get ${key}: ${val}`)
        if(currentObserver){
          console.log('has currentObserver')
          currentObserver.subscribeTo(subject)
        }
        return val
      },
      set: function(newVal) {
        val = newVal
        console.log('start notify...')
        subject.notify()
      }
    })
    if(typeof val === 'object'){
      observe(val)
    }
  }
}

let id = 0
let currentObserver = null

class Subject {
  constructor() {
    this.id = id++
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observer) {
    var index = this.observers.indexOf(observer)
    if(index > -1){
      this.observers.splice(index, 1)
    }
  }
  notify() {
    this.observers.forEach(observer=> {
      observer.update()
    })
  }
}

class Observer{
  constructor(vm, key, cb) {
    this.subjects = {}
    this.vm = vm
    this.key = key
    this.cb = cb
    this.value = this.getValue()
  }
  update(){
    let oldVal = this.value
    let value = this.getValue()
    if(value !== oldVal) {
      this.value = value
      this.cb.bind(this.vm)(value, oldVal)
    }
  }
  subscribeTo(subject) {
    if(!this.subjects[subject.id]){
      console.log('subscribeTo.. ', subject)
       subject.addObserver(this)
       this.subjects[subject.id] = subject
    }
  }
  getValue(){
    currentObserver = this
    let value = this.vm.$data[this.key]
    currentObserver = null
    return value
  }
} 




class mvvm {
  constructor(opts) {
    this.init(opts)
    observe(this.$data)
    this.compile()
  }
  init(opts){
    this.$el = document.querySelector(opts.el)
    this.$data = opts.data
    this.observers = []
  }
  compile(){
    this.traverse(this.$el)
  }
  traverse(node){
    if(node.nodeType === 1){
      node.childNodes.forEach(childNode=>{
        this.traverse(childNode)
      })
    }else if(node.nodeType === 3){ //文本
      this.renderText(node)
    }
  }
  renderText(node){
    let reg = /{{(.+?)}}/g
    let match
    while(match = reg.exec(node.nodeValue)){
      let raw = match[0]
      let key = match[1].trim()
      node.nodeValue = node.nodeValue.replace(raw, this.$data[key])
      new Observer(this, key, function(val, oldVal){
        node.nodeValue = node.nodeValue.replace(oldVal, val)
      })
    }    
  }

}

let vm = new mvvm({
  el: '#app',
  data: { 
    name: 'jirengu',
    age: 3
  }
})

setInterval(function(){
  vm.$data.age++
}, 1000)


</script>
</body>
</html>
```

## ★MVVM之单向绑定的实现

### ◇MVVM

MVVM是个什么鬼东西？与之对应的MVC思想我之前有了解过，可是这MVVM到底是什么呀？

> MVVM (Model-View-ViewModel) 是一种用于把数据和 UI 分离的**设计模式**。

Model即模型，View即视图，然后ViewModel就ViewModel吧！

虽然知道了它们的中文意思，但它们各自具体表示什么东西呢？

- MVVM 中的 Model 表示应用程序使用的数据

  当我们把这个框架写出来之后，你就会有一个很深刻的感受啦！总之，Model即数据，这个数据和我们页面上看到的数据是一一对应，不过它仅仅只是数据哈！比如一个用户账户信息(名字、头像、电子邮件等)。

  Model它保存信息，但通常不处理行为，不会对信息进行再次加工。

  而数据的格式化则是由View 处理的。至于行为一般认为是业务逻辑，至此就把行为封装再在ViewModel 中。

- View 是与用户进行交互的桥梁。换句话说，就是用户所看到的页面，也就是所谓的视图啦！比如说页面上有一个按钮，然后还有一段话，其中话里边还有个关键字，但是这个关键字是我们的数据映射上去的，然后其它地方就是所谓的View，当然你也可以认为是模板。当用户点击某个按钮的时候，然后再由ViewModel去做一件事情，如去做一个行为——拿到数据，然后把数据放到那个关键字里边

  ![1552556379745](img/03/1552556379745.png)

- ViewModel 充当数据转换器，将Model 信息转换为 View 的信息，将命令从 View 传递到 Model。

  所以说：

  Model（数据）、View（模板）、ViewModel（数据和模板之间的一个映射关系、一个处理流程）

这就是MVVM啦！现在你该知道MVVM是个什么鬼东西了吧！是不是很简单？

> 有关MVC和MVVM的图：[①](#yi)

### ◇单向绑定

#### 思路

> 把数据映射到View上！

![1552561395624](img/03/1552561395624.png)

> 注意页面上显示的可不是 `{{name}}`，而是一个来自于data的映射值！
>
> 更复杂一点的还有，比如说data中还有其它属性，而其中某个属性值是一个对象，这样的多层级映射，还有就是对视图添加一些方法、指令之类的，实现双向绑定等等……

言归正传，我们该如何实现这个mvvm？

我们之前了解过数据劫持以及观察者模式，这似乎隐隐约约可以用上啊！

既然如此，那么如何用呢？

在此之前我们需要考虑这些问题：

1. 主题是什么？
2. 观察者是什么？
3. 什么时候去订阅这个数据的变化？
4. 当数据变化之后，怎样更新到这个视图上？

根据之前所学的知识，我们可以得出：

1. data.name就是主题
2. {{name}}就是观察者
3. 解析模板时，即需要展示数据的时候就去订阅，订阅好之后，data.name的数据就展示出去啦！
4. 用户再次去修改 data.name中的数据的时候，就会通知观察者们去更新数据啦！当然，更新完之后，又会展示新的数据啦！

大概就是这样的思路了，那么如何实现呢？请往下看

#### 实现

















## ★总结



## ★Q&A

### <a id="yi">①关于MVC和MVVM的图</a>

MVC：

![img](img/03/mvc.png)



MVVM：

![img](img/03/mvvm.png)

你看MVVM有没有一种发布订阅模式的即视感？——只是publisher和event bus是单向的

总之我们可以见着View和Model是完全解耦的，它们俩的通信都是交由ViewModel来处理的！还有就是View很薄，ViewModel很厚，薄在是个模板，厚在所有的业务逻辑都部署在这儿

**➹：**[MVC，MVP 和 MVVM 的图示 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

**➹：**[Scaling Isomorphic Javascript Code - Nodejitsu Inc.](https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)







