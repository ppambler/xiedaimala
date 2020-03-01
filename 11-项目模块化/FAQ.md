# FAQ

## 1、在课程里边，做页面布局的时候，老师用到了float，我在想为啥不去用flex呢？

➹：[flex能完全替代float吗？ - 知乎](https://www.zhihu.com/question/308313232)

➹：[float-flex-grid-移动端布局 - 掘金](https://juejin.im/post/5aa7e7966fb9a028df224e72)

## 2、程序要写的性感一点？

要把程序写得有设计感点，不能写的像是一个大胖子一样，总之这程序开发要开发得性感一点

那么，这性感点的程序该如何开发呢？

用类的写法

类到底是什么呢？——它其实是一个功能，说白了，什么功能就是什么类

一个误区：学面向对象的时候，会说到「人分男人女人」、「大象动物」什么的，但这跟程序开发没有半毛钱关系！

总之，类就是一个功能

那么我们为啥要用类呢？

1. 希望这个叫「类」的程序，可以通过一个叫「new」东西，到达复用的任务、目的！

2. 不一定非要复用，即有时不是为了复用而去写类的，而是为了让程序结构化，即让程序看起来干干净净的！（「this」很关键）

总之，用类写出来的东西很漂亮，所以我们愿意用面向对象这种类的方式来写东西！

关于类的继承的目的：

有多个类，其中这些类里边有共用的功能，那么我们可以把这些功能提取出来成一个父类，然后让各个子类去继承这个父类，说白了，这个父类可以去给各个类服务哈！

关于工具函数：

我们要有抽象工具的能力，而这也是我们之所以要学习函数的原因，因为函数它出现的目的就是封装一个功能，而这就到达了「功能遍地使用」的目的了！总之，函数的抽象是非常重要的

而工具函数实际上就是函数，只是它有个特性，那就是它是一个纯函数，因此我们写工具函数的潜台词就是写纯函数

那么纯函数又是啥呢？

举个非纯函数：

``` js
var a = 1
var b = 2
function xxx() {
  return a+b
}
xxx()
// 改变a的值，模拟同样一个函数调用输出了不同的结果！
function xxx() {
  a = 2
  return a+b
}
xxx()
```

我们定义了一个 `xxx` 函数，然后使用它，即 `xxx()`，假如我们把这个 `xxx`函数从当前文件抽离出去，那么其它模块使用它时，显然是报错的！毕竟a和b是不存在的

因此我们得用到形参（函数内部的临时变量）：

``` js
function xxx(a,b) {
  return a+b
}
```

我们`xxx(1,2)`，即传入了两个实参给这两个临时变量，在传入这个过程里边，实际上就是赋值的过程，那么是赋值给a和b吗？

不是的，它们俩的存在是一种映射关系，赋的值其实是在内存里边，说白了，实际上形参的存储也是引用值

因此纯函数的特点有：

1. 不依赖外部，只有一个唯一的通道，那就是传参这个通道哈！然后函数的入参是什么，那么函数就会输出唯一的那一个对应的值
2. 不影响外部任何的变量和方法的执行和输出

而我们的工具函数，就得符合这样的纯函数！

## 3、基本目录的构建？

> 用到了ES6，所以需要用到webpack来构建这个项目

一般约定，项目根目录下有：

1. src目录，然后src下有个index.html，以及js目录

## 4、如何用面向对象的方式写代码？

如你要写个计算器，那么这个功能就是计算器功能啦！于是可有这样一个class：

``` js
class Calculator {

}
```

然后，写了个类，就得写个构造器和初始化方法：

``` js
class Calculator {
  constructor() {

  }
  init() {

  }
}
```

思考一下这个功能有没有事件处理函数的绑定，如果有，那么必须得加一个叫 `bindEvent`的函数去管理它：

``` js
class Calculator {
  constructor() {

  }
  init() {

  }
  bindEvent() {

  }
}
```

至此，搞好了这个写代码毛坯就可以了！至于其它的方法实际上在这里是不需要的！

那么如何让上边这个代码生效呢？

``` js
class Calculator {
  constructor() {
    this.init();
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {

  }
}

new Calculator(); //new 一下就会执行 `init`
```

至此，一个能运行的，最基本的写代码模式就完成了！

一些原则：

1. 所有属性 写在 constructor里边
2. 所有方法 写成单个函数

关于要写啥属性，一般来自于DOM结构，假如有这样的DOM结构：

``` html
<div class="calculator">
  <div class="result">0</div>

  <div class="input-group">
    <input type="text" class="num-input" placeholder="第1个数字" />
    <input type="text" class="num-input" placeholder="第2个数字" />
  </div>

  <div class="btn-group">
    <button data-field="plus">+</button>
    <button data-field="minus">-</button>
    <button data-field="mul">*</button>
    <button data-field="div">/</button>
  </div>
</div>
```

那么我们要拿到的属性有：`calculator`、`result`、`num-input`、`btn-group`

既然是属性，那么我们就得把这些东西写到 class 的 constructor 里边去：

``` js
class Calculator {
  constructor() {
    const oCalculator = document.getElementsByClassName('calculator')[0]
    this.oResult = oCalculator.getElementsByClassName('result')[0]
    this.oFirstInput = oCalculator.getElementsByClassName('num-input')[0]
    this.oSecondInput = oCalculator.getElementsByClassName('num-input')[1]
    this.oBtnGroup = oCalculator.getElementsByClassName('btn-group')[0]
    this.init();
  }

  // init函数决定了程序是否跑起来，即我们new一个实例出来之后，这个class里边的代码是能够跑起来的！
  // 总之程序能否跑起来全靠它了
  init() {
    this.bindEvent();
  }

  // 如果View涉及到点击事件等交互行为的话，那么我们就需要bindEvent这样的函数用于专门管理事件处理函数的绑定！
  bindEvent() {

  }
}

new Calculator(); //new 一下就会执行 init方法
```

在上边的代码里边，为啥要写一个 `const oCalculator`，然后下边那行则是 `this.oResult`呢？

说白了，就是为啥要把 `oCalculator`单独拎出来？

首先你得明白我们在选择 `result`这个DOM的时候，是在document选，还是在 `oCalculator`选，之间的性能考虑问题

显然，在某一个元素下选择某一个节点这样性能会更好一点！

还有，为啥一个用const，一个用this呢？

因为我们定义的实例方法并不会用到 `oCalculator`，而 `oResult` 则是需要被用到的，既然用到了，那么就需要用 `this`，不然这些属性挂载到new出来的实例身上！

总之，有实例方法需要用到的属性，那就用 `this`哈，如果咩有，那就 `const`好了！

> 为啥变量名前边加个o？——那是因为这个变量存储的是一个对象！

由于获取DOM元素过于繁琐，因此，我们需要自己封装一些API，而这也就是为什么我们会用到jQuery、zepto的缘故，毕竟「封装API」这活儿交给了库来做，而不是我们自己去想

不过，有些时候，项目过小，并不需要用到jQuery等这样的库，而是自己去封装（直白点，就是程序员自己封装一套工具哈！），就拿上边的代码来说，我们能否这样写：

```js
$(selector).findOne(className)
$(selector).find(className).eq(1)
```

那么这该如何封装呢？请看这节课：[模拟对象的『链式调用』](https://ke.qq.com/webcourse/index.html#cid=329070&term_id=100390499&taid=3157685726152046&type=1024&vid=5285890793851303953)

``` js
const oCalculator = $(document).findOne('calculator')
this.oResult = $(oCalculator).findOne('result')
this.oFirstInput = $(oCalculator).find('num-input').eq(0)
this.oSecondInput = $(oCalculator).find('num-input').eq(1)
this.oBtnGroup = $(oCalculator).findOne('btn-group')

// selector：可以是document这个全局的大家伙，也可以是局部的某个DOM元素，selector这个名字可以为node，这样语义化好一点！
function $(selector) {
  return {
    findOne(className) {
      return selector.getElementsByClassName(className)[0]
    },
    find(className) {
      this.all = selector.getElementsByClassName(className)
      return this
    },
    eq(index) {
      return this.all[index]
    }
  }
}
```

注：

> 在 HTML DOM (Document Object Model) 中 , 每一个元素都是 节点:
>
> - 文档是一个文档节点。
> - 所有的HTML元素都是元素节点。
> - 所有 HTML 属性都是属性节点。
> - 文本插入到 HTML 元素是文本节点。are text nodes。
> - 注释是注释节点。
>
> 关于Document对象：
>
> document对象是文档的根节点，每张网页都有自己的document对象。window.document属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。
>
> Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。
>

接下来，就是为DOM元素绑定事件处理函数了。

➹：[面向对象的编程概念：从 0 到 1 使用对象 - 知乎](https://zhuanlan.zhihu.com/p/91258807)

➹：[面向对象和函数式编程的本质区别 - 知乎](https://zhuanlan.zhihu.com/p/57708956)





