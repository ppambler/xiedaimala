---
typora-copy-images-to: img\03
---

# MVVM单向绑定

## ★简介

> MVVM 原理
>
> 项目代码 <https://github.com/jirengu/wheel-mvvm>

## ★MVVM单向绑定的实现

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

