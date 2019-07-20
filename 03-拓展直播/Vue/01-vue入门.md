---
typora-copy-images-to: img\01
---

# Vue 入门

## ★引子

我想看看「 Vue 入门」是怎样一个讲解姿势！

## ★ Vue 学习路线

### ◇ Vue 脑图

![img](img/01/2019-7-18-11-37-50.png)

### ◇前置知识

![1563592790134](img/01/1563592790134.png)

关于看 Vue 文档：

- 有基础教程、深入教程（深入了解组件）、动画教程、工具和工程的教程、规模化的教程……
- 如果你是靠 Vue 吃饭的 ，那么你得从头看到尾，直到看到「深入响应式原理」这一章，不然，你的Vue基础肯定是存在问题的。（==我只看到基础教程之「Class 与 Style 绑定」，但是之前有看视频教程过了一遍基础教程==）

### ◇解释一下 Vue 脑图

> 如果一个高级前端，ta说ta对Vue很了解的话，那么ta就应该知道脑图里边所提到的所有东西

- 扎实的HTML/CSS/JS基础（语法和细节都得很清楚）

  - HTML 常用标签（如知道div、span、p、section等这些标签就可以了，总之这部分内容学起来很快，不重要）
  - CSS 基础语法（也学习很快，大部分满足即可，不需要学得很深入）
  - Scoped CSS （Vue提供的一个特殊的CSS）
  - JS 基础语法（特别去理解 `new`、`this`这两个关键字是啥意思 ）
  - ES 6 语法（除了了解上边默认的ES3或者是ES5语法以外，你还得了解最新的ES6语法，而其中有两个你必须得知道的就是 `Object.defineProperty` 和 `class`）

  反正这一部分是最难的，当然，如果这一部分没有达到要求也是可以看后面的。

- 设计模式

  - MVC
  - 发布订阅
  - 混入
  - 原型
  - 依赖注入

  这些东西必须要了解，如果不了解的话，Vue的文档会教你了解，如混入和依赖注入，直接看Vue提供的示例即可，它会告诉你它们是什么

- Vue API

  - 有27个

  这一部分内容需要你自己去做笔记理解，如data是干嘛的、props是干嘛的……大概写4篇博客即可！需要注意的是千万不要死记硬背哦！因为这真TM多！

- Webpack 配置

  学会Vue文档之后，其实这还不够呀！你还得学Webpack才行，因为现在前端如果你不会webpack的话，那么基本上你什么项目也搭不起来！

  那么对于Webpack我们需要知道什么东西呢？——需要几个loader和几个工具。

  其中vue-loader是最重要的一个loader。

  还有工具则是 `@vue/cli`和 `eslint`

  总之对于这些loader和工具，你都得有个初步的了解，当面试官问到你的时候，你能说出它们的作用以及如何去配置，那么你就能拿到满分了，不然，如果面试官问你「babel-loader怎么用？」，你说不会，那么你就GG了，基本上就是送命题了。

  总之，说白了，对于这些而言，<mark>会使用才是王道，原理倒是可有可无</mark>

- Vue 全家桶

  - Vuex（最重要，需要弄懂5个概念）
  - Vue Router（4个概念）
  - Axios（2个概念）
  - Jest/Mocha（2个概念）
  - PWA （2个概念）

  最后一个PWA不重要，前面4个重要性依次递减。

  以上提到的15个概念，都弄懂了，那么Vue 全家桶你就会用了。

至此，你掌握了从第一个阶段到这第五个阶段的知识，那么你就是Vue的掌握者了，即你已经完全掌握Vue了，即Vue的所有功能你都会了，而这时候你会发现一个神奇的一幕，那就是你不需要去学习算法和数据结构，而这也是前端的一个特点，即前端的框架使用者是不需要学会算法和数据结构的，那么什么时候需要学会算法和数据结构呢？

这得到最后一部分「高级」阶段！

等你走完了前五步，即Vue基本都会了，那么你会发现按钮要自己做、对话框要自己做等等，于是，你就得去用一些UI框架了

- UI框架

  - Element UI
  - Ant Design Vue
  - iview
  - cube-ui（滴滴出的）
  - Vant

  在这5个当中随便选一到两个去了解就可以了。

  来到这一步，你就是一个Vue的快速开发者了，即你开发得特别快，什么东西只要通过组合一下子就能搞定了，说白了，就是生产力特别得高，而这也是Vue风靡的另一个原因！（之前是中文文档对开发者友好）

  总之，一旦你学会Vue它所有配套的全家桶，然后再找一个UI框架，那么你做什么页面都是超快的！

接下来还有两个部分，而这两个部分是给高级前端准备的！那么这有多高级呢？工资20K以上的前端需要去知道的！

- Vue 3.0（目前还未发布）

  - TypeScript（一定要学会，因为Vue3.0使用它把之前的版本给重写了）
  - React Hooks（借鉴了React Hooks的API风格，所以要学它，而学了它之后，你对Vue3.0也会学得更好。一个尴尬的地方是，以前用2.0的人，如果不学React，那么ta可能对新的语法还不如它的敌对方React用得更好！至此，引发了一个争论，有人说不需要借鉴React的，也有人说只要是好的就应该去借鉴。）
  - Proxy API（JS 新出的API）
  - Reactive 风格（这是一种编程风格，可以去了解一下）
  - 函数式编程（了解）

  如果你想要在Vue3.0发布的时候，就马上学会使用它的话，那么你需要先学会以上这个5个东西才行！

  总之，这5个东西，都可以单独作为一个话题去了解它们（搜一些博客、做些总结）。而知道了这5个东西之后，那么  在Vue 3.0发布前，你就会学会了Vue 3.0了

- 高级

  - 虚拟DOM
  - Diff算法
  - 模板编译

  什么叫高级，如果你答对这些题，那么你就可以进BAT之类的公司了，以上三个点就是常问点。

  只要这个阶段才会涉及到数据结构和算法，之前的那几个阶段都不会涉及到！

  总之 ，学到Vue 3.0这个阶段，其实你对工资就已经很满意了，而学到后面，就越学越难了

以上，就是对Vue学习的一个大概线路规划了！

总之，就是从基础的，到对设计模式的积累，再到 Vue API 的学习，这3部分，属于初学者要学的；  第四部分是稍微难一点的有关工程化和工具的配置以及使用的知识。

前边4个是入门。

会Vue全家桶就可以找工作了。

而后边3个部分，是涨薪用的方法！

讲完学习路线以后，就来到「动手干」这步了。

注意，千万不要把文档拿到手就先去看，而是可以先尝试着去做一两个小项目来练练手。

## ★动手干

> 通过做一个小项目来让我们对Vue有一个深切的理解！







## ★总结



## ★Q&A

### ①高亮markdown语法？

> 引子：==使用Typora是能看到背景色为黄色的，但是在github pages上浏览是看不见的==

文字样式：

```html
<font face="黑体">我是黑体字</font>
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=3 face="黑体">color=#0099ff size=3 face="黑体"</font>
<font color=#00ffff size=4>color=#00ffff size=4</font>
<font color=gray size=5>color=gray size=5</font>
```

效果：



<font face="黑体">我是黑体字</font>

<font face="微软雅黑">我是微软雅黑</font>

<font face="STCAIYUN">我是华文彩云</font>

<font color=#0099ff size=3 face="黑体">color=#0099ff size=3 face="黑体"</font>

<font color=#00ffff size=4>color=#00ffff size=4</font>

<font color=gray size=5>color=gray size=5</font>



黄色高亮：

```html
<mark>我的背景底色为黄色</mark>
```

<mark>我的背景底色为黄色</mark>

按照自己的习惯封装一下：

```html
<font color=Tomato size=4>Tomato色的文字</font>
<mark bgcolor=Tomato>Tomato</mark>
```



<font color=Tomato size=4>Tomato色的文字</font>



<mark bgcolor=Tomato>Tomato</mark>



关于bgcolor这个属性不起作用呀！于是这样来：



```html
<table><tr><td bgcolor=Tomato>背景色是Tomato</td></tr></table>
```





<table><tr><td bgcolor=Tomato>背景色是Tomato</td></tr></table>





不够一般用 `<mark></mark>`就足够了。

接下来就是使用搜狗输入法的 <mark>自定义短语设置</mark>了：

![1563595383779](img/01/1563595383779.png)

<mark>我的天呀</mark>



<font color=Tomato size=4>我的天呀</font>



<mark> </mark>

<font color=Tomato size=4>Hello World！</font>

可见，在Github pages上浏览，只有 `<mark></mark>`是起作用的。

**➹：**[CSDN-markdown 文字样式设置（字体, 大小, 颜色, 高亮底色） - 走过的都是未来 - CSDN博客](https://blog.csdn.net/thither_shore/article/details/52181464)





