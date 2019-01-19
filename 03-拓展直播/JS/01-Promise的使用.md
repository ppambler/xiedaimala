---
typora-copy-images-to: img\01
---

# Promise的使用

## ★课程简介

> 若愚老师主讲《Promise的使用和日常学习情况答疑》

**➹：**[Promise · 饥人谷课件](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6/%E5%BC%82%E6%AD%A5/Promise.html)

## ★Promise的用法

### ◇从一个例子入手

```js
function fn1() {
  setTimeout(()=>{
    console.log('fn1')
  }, 1000)
}

function fn2() {
  setTimeout(()=>{
    console.log('fn2')
  }, 1000)
}

function fn3() {
  setTimeout(()=>{
    console.log('fn3')
  }, 1000)
}
```

需求：

> 对于以上代码如何实现: 1秒钟之后输出 fn1, 再过1s输出 fn2, 再过1秒输出 fn3 ?

改装代码：

```js
function fn1(callback) {
  setTimeout(()=>{
    console.log('fn1')
    callback()
  }, 1000)
}

function fn2(callback) {
  setTimeout(()=>{
    console.log('fn2')
    callback()
  }, 1000)
}

function fn3() {
  setTimeout(()=>{
    console.log('fn3')
  }, 1000)
}

```

调用姿势：

```js
fn1(function(){
  fn2(function(){
    fn3()
  })
})
```

fn1的第一个参数是一个匿名函数，相当于是一个函数名……

有几个概念是等同的，如函数名、函数代码、匿名函数等后面只要不加括号的，它们其实都是一个函数地址而已……

所以fn1的callback参数就指向了这个匿名函数了……

接着1s后调用这个匿名函数，这个匿名函数中需要调用fn2，fn2同样是个异步任务，所以它也要等1s后执行回调，回调开始执行，然后调用fn3，1s后，才打印了fn3……

我们可以发现这几个函数所传的callback都是在一个异步任务里的callback里面的，根据对事件循环的理解，显然它们的执行顺序就很容易理解了！

### ◇回调地狱

![1547879234800](img/01/1547879234800.png)

当然，这种callback写法，也是常见的我们去处理异步函数的一种写法！

能否换一种写法？我们不想要下面这种调用姿势了：

```js
fn1(function(){
  fn2(function(){
    fn3()
  })
})
```

可以，引入Promise即可！

### ◇什么是Promise

在讲解这个家伙之前，先聊聊「预案」的概念，预案就是balabala……还是举例子吧！

老板说「下班之前把项目给上线了，就奖励1000块，如果没有搞定就扣500块……」，老板根据项目是否上线制定了两个预案，一个是`+1000`，一个`-500`

言归正传，到底什么是Promise呢？——它是一个函数，当然它也是一个对象，这个对象有个属性存储了它此刻的状态，默认的状态为**等待态(Pending）**……

那么如何才能让它发生状态变化呢？——这个就得跟随其内部的执行情况而转化了，至于转化的结果要么是**完成态(Fulfilled)**、要么是**拒绝态(Rejected)**，换句话说就是选择哪个预案的问题！白话一点就是，成功调哪个函数，失败调哪个函数

一旦Promise启动之后，如果异步任务成功完成，那么就让其状态从 pending 变成 fullfilled ，然后自动执行 resolve；反之就从 pending 变成 rejected，然后自动执行 reject……

进一步了解：[Promise 对象 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/promise)

### ◇Promise范例

#### AJAX请求——getIp

> 接下来通过结合代码让你来加深刚刚对Promise的理解！

![1547882263580](img/01/1547882263580.png)

当我们调用resolve的时候，此时的Promise实例里面的状态就会发生改变，即从pending变为fulfilled！既然状态改变了，那就会调用`promise.then(s1,e1)`中的s1……其中s1里的参数就是resolve(xxx)里的xxx！

> 我在想这个resolve到底是不是指向then的第一个参数？还是说是这样的：
>
> ```js
> //resolve是异步执行的……可能是有个onResolvedChange之类的事件，然后这个resolve是个回调
> function resolve(xxx) {
>     promise.statues = 'resolved'
>     promise.value = xxx
> }
> ……
> //可能监听resolved状态，然后执行成功预案之类的……
> //then
> function then(s1,e1) {
>     ……
>     promise.onPendingChange = function() {
>          if(promise.statues === 'resolved') {
>     		s1.call(undefined,promise.value)
>     	} else {
>             e1.call(undefined,promise.value)
>     	}
>     }
>     ……
> }
> ```
>
> 此刻我还是打算停留在使用阶段好了，其原理暂且不要去深究……

之前可能存在的误区：

![1547887357159](img/01/1547887357159.png)

总之，这似乎与任务队列相关……

**➹：**[你真的会使用XMLHttpRequest吗？ - WEB前端路上踩过的坑儿 - SegmentFault 思否](https://segmentfault.com/a/1190000004322487)

**➹：**[Easy Mock](https://easy-mock.com/docs)

话说今天的主题是什么？——弄清楚Promise是什么？其内部原理？以及它的用法？

#### 观察状态的变化

向resolve(xxx)添加个延时函数即可

> 新的mock数据API：http://rap2api.taobao.org/app/mock/124878/example/1547900417643

```js
……
setTimeout(()=>{
    resolve(retJson.ip)
} , 5000)
……
//调用姿势：
var promise = getIp().then(data=>{
    console.log(data)
    console.log(promise)
}
).catch(data=>{
    console.log(data)
}
)
console.log(promise)
```

我们5s之后再resolve，为此就有足够的时间去观察promise的状态变化

> 如果不写个延时的话，基本上很难观测到这种变化！从这可以看出resolve是执行了的，因为执行上面最后一行代码的时候已经是resolved状态了！接着才执行成功回调！

结果：

![1547902197918](img/01/1547902197918.png)

promise这个对象一开始是pending状态，之后就变为resolved状态！

这个 有两个中括号的家伙`[[PromiseStatus]]`表示你不能随便用，总之你只能看，不能通过 `promise.[[PromiseStatus]]`这种方式去读取

**➹：**[Promise的内部变量 - SegmentFault 思否](https://segmentfault.com/q/1010000010670739)

#### 假设有多个then

场景类似于「今晚项目上线的话，不单只给你1000奖金，还给你放两天假」，两个成功预案接连发生……

```js
var promise = getIp().then(data=>{
    console.log(data)
    console.log(promise)
}).then(()=>{
    console.log('给你放两天假！')
}).catch(data=>{
    console.log(data)
})
```

#### 对比

我并咩有看到这种加了then、catch的做法……比那种还没有走向回调地狱的那种做法有优势呀！

如果请求比较多或者是异步操作比较多，而且还需要一定的条件，那么它的优势就出现了！

举例来说：我们想要得到一个某个城市的天气，那么首先得获取ip，获取了ip就意味着获取了城市，知道了城市，也就知道了天气，总之就是我们的请求是一个接一个的，是有顺序之分的……即后面的数据是根据前面的数据才有的！

```js
getIp().then(function(ip){
  return getCityFromIp(ip)
}).then(function(city){
  return getWeatherFromCity(city)
}).then(function(data){
  console.log(data)
}).catch(function(e){
  console.log('出现了错误', e)
})
```

在这里写了3个成功预案，第一个预案是给getIp所返的Promise对象而服务的，其它的如此类推，这给人的感觉就像是每次都是在处理一个异步，一个回调……

至于catch，只要有一步出错了，都会走到这儿……

除此之外，我们还可以继续添加更多异步任务，如根据天气获取穿啥衣服的建议等等……用代码来表示的话，就是添加个return，添加个then，然后添加个成功预案……形式上就是从上到下一步步写就好了

而以前那种姿势则是从外往内一层层去写……

总之使用了Promise，我们就换了一种书写方式……而这种方式显然更清爽，更利于我们阅读……

我们可以看一下请求的时序，即数据到了才发下一个ajax请求：

![1547910389907](img/01/1547910389907.png)

#### 最终代码

```js
function getIp() {
  var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://easy-mock.com/mock/5ac2f80c3d211137b3f2843a/promise/getIp', true)
    xhr.onload = function(){
      var retJson = JSON.parse(xhr.responseText)  // {"ip":"58.100.211.137"}
      resolve(retJson.ip)
    }
    xhr.onerror = function(){
      reject('获取IP失败')
    }
    xhr.send()
  })
  return promise
}

function getCityFromIp(ip) {
  var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://easy-mock.com/mock/5ac2f80c3d211137b3f2843a/promise/getCityFromIp?ip='+ip, true)
    xhr.onload = function(){
      var retJson = JSON.parse(xhr.responseText)  // {"city": "hangzhou","ip": "23.45.12.34"}
      resolve(retJson.city)
    }
    xhr.onerror = function(){
      reject('获取city失败')
    }
    xhr.send()
  })
  return promise
}
function getWeatherFromCity(city) {
  var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://easy-mock.com/mock/5ac2f80c3d211137b3f2843a/promise/getWeatherFromCity?city='+city, true)
    xhr.onload = function(){
      var retJson = JSON.parse(xhr.responseText)   //{"weather": "晴天","city": "beijing"}
      resolve(retJson)
    }
    xhr.onerror = function(){
      reject('获取天气失败')
    }
    xhr.send()
  })
  return promise
}

getIp().then(function(ip){
  return getCityFromIp(ip)
}).then(function(city){
  return getWeatherFromCity(city)
}).then(function(data){
  console.log(data)
}).catch(function(e){
  console.log('出现了错误', e)
})
```

我们可以看到请求参数很重要，其参数值一般都是上一个成功预案的promise对象的resolve参数值！

#### 假设出错呢？

模拟错误：把第二个请求的域名改成一个不存在的域名就好了……

![1547911069864](img/01/1547911069864.png)

错误原因，就是reject的参数值！

在错误处理上，使用Promise相比我们之前的回调要简单的多！毕竟以前的那种姿势，每一个异步请求都要写一个关于失败的预案，如果有3个请求那就得必须写3个error了，这样一叠加起来就显得特别烦了！而Promise，就在最后一个then的后面写一个catch就好了，所以写3次好还是写1次好？只要不是傻的，都会选择写1次！

#### 小结

1. 如果能明白上面所说的两种方法，那么对于日常生活中的使用也就足够了！

接下来将会对一些特殊情况进行讲解——主要看看如何去用

### ◇特殊场景使用

#### Promise.all

举个例子：目前有多个异步请求，我想要得到的结果是什么呢？——当所有的异步请求操作都ok之后，我想拿到一个总结果！

如：目前我们前端需要3个接口，然后后端就提供了3个接口，分别是小明的家庭详细、工作信息、兴趣爱好……

我们获取小明的三个不同信息分别是三个不同的接口！

那么我问题来了，我想要一个总数据，即把这三个数据打包起来后的数据，你说怎么办？具体代码就是，一个大的数据有3个属性

由于请求发出的时机是不一样，那么导致处理成功预案的时机也是不一样的！所以说把这三个数据拼装起来一个，然后等所有成功回调执行之后才得到总数据，然后再干其它的，显然这很难干！

![1547914830100](img/01/1547914830100.png)

为此Promise.all这个API的用武之地就出来了！

它是什么呢？——如果你了解过JavaScript基于原型的面向对象的话，显然你是很容易理解它是什么的。它就是Promise这个构造函数原型上的一个方法，之前的then也是，这就是为什么Promise实例能访问到then，其实你也可以把看它作是静态方法……

> 额我觉得这说法有误额……all是个静态方法额，只能被Promise这个构造函数调用，其实例是不行的，你看一下下面这个测试你就知道了：
>
> [②](#er)



















## ★Promise答疑

## ★总结

- 如果我继续按照这样的效率看视频的话，显然是不行的！我得对视频中所讲的每一个小点都得按自己的理解一遍后，才记笔记，如果不理解就多看几遍，总之下笔需理解，而不是说一句话就写一句话……还有就是关于信噪比的问题，你得明确哪些是噪音，即无用信息……

  对了，还有一个就是，反复的内容尽可能少记，不会的内容就多记！

## ★Q&A

### ①使用在线的mock，经常会出现500错误？

**➹：**[通过设置chrome浏览器解决跨域问题，在本地进行开发工作 - 哭个六 - 博客园](https://www.cnblogs.com/kugeliu/p/6566462.html)

### <a id="er">②测试结果<a>

简单的一个Promise实例：

```js
function fn() {
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{resolve('apple')},3000)
	})
}
var p = fn()
```

测试结果：

![1547916301315](img/01/1547916301315.png)

