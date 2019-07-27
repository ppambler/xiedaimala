---
typora-copy-images-to: img\01
---

# Vue 入门

## ★引子

我想看看「 Vue 入门」是怎样一个讲解姿势！

## ★ Vue 学习路线

![1563622141920](img/01/1563622141920.png)

### ◇ Vue 脑图

![img](img/01/2019-7-18-11-37-50.png)

### ◇前置知识

![1564193415922](img/01/1564193415922.png)

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

  总之，这5个东西，都可以单独作为一个话题去了解它们（搜一些博客、做些总结）。而知道了这5个东西之后，那么  在Vue 3.0发布前，你就学会了Vue 3.0了

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

![1563622199641](img/01/1563622199641.png)

### ◇Vue的读音

![1563621664199](img/01/1563621664199.png)

> wu：上牙齿咬住下嘴唇

上面读音是正确的，而下面那个则是接地气姿势！

 建议大家遇到读错的，并需要告诉ta纠正过来，毕竟这只是一个习惯的问题 ——习惯把东西分开读！比如说一个应用，中国人习惯叫 「A - P - P」，其实是连起来读的ap

总之，这些习惯无法纠正，中国人喜欢一个字一个字的读，而外国则是连读姿势！

### ◇做什么？

做一个井字棋的小游戏。（小时候在地上常玩的游戏，用根树枝或用手指，在地上（有泥土的）画个井字，然后填入× or √）

![1564193720347](img/01/1564193720347.png)

玩法介绍：

三个点连成一线即赢，而且这有必胜的策略——先占角，那么赢得几率就是大于对方的

**➹：**[井字棋的最优策略竟是先占角！ - 科学人 - 果壳 科技有意思](https://www.guokr.com/article/4754/)

### ◇需求与描述

1. 只支持单击，不支持联机（因为是入门，所以无须搞那么复杂）
2. 自动判定游戏结果（只要× or ○连成一条线，就断定x胜还是○胜）

作为入门者来说，一般来说，做得的一个项目都是做得不好的，但是这其实做得好不好并不重要，重要的是「你在做的过程中，你不停地去查Vue的文档，然后通过文档去理解这个API」

### ◇编程思想

- 尝试去理解芳芳在写的代码过程中用到的一些思想，如「芳芳是如何解决问题的？是如何分步实现这个入门项目的？代码又是怎么一遍遍被芳芳重写改写的？」

> 做完这个项目，再回过头来看吧！

### ◇使用 @vue/cli 创建 vue 项目

1. 创建一个目录 （vue-demo-1），使用vscode打开

2. 如何初始化这个目录？——使用Vue官方提供的一个小工具 vue-cli，而不是parcel、webpack……

3. 找到vue-cli的官网，直接CRM大法（安装「`yarn global add @vue/cli`」以及测试安装是否成功 `vue --version`）

4. 在当前目录创建 `vue create .`，而不是创建一个新的目录 `vue create hello-world`

   ![1564208503723](img/01/1564208503723.png)

   回车后，不要自动选择eslint，因为它很烦，会阻碍你入门。

   因此，我们选择第二个，即手动选择各种特性（上下移动选项，空格表示选中），我们只要Babel即可，其它的都不要，即便功能少，但对于初学者而言，学起来更方便。

   再摁回车。接下来会提示你，是用分开的配置的文件，还是把所有的配置文件写到package.json里边（选择它推荐的，即直接回车即可）

   接着又问你「是否保存刚才的选择，以备你之后的项目用？」——选择no

   接着又问「你是打算用yarn还是npm？」——显然是yarn啦！这是芳芳的经验之谈，没有为什么。（如果没有装yarn或npm是不会让你选择的，总之这是需要检测到，检测到有二者，就让选择！）

   全部选完后，它就会去安装一些需要用到的工具

   ![1564209414003](img/01/1564209414003.png)

   安装成功后多了很多目录和文件。

5. vue/cli也行相比parcel没有那么智能，但是它的功能是更强大的

以上就是用vue/cli创建一个vue项目的姿势了。

接下来根据安装成功后的提示：

1. 启动http服务：`yarn serve`

   ![1564209734803](img/01/1564209734803.png)

小结：

1. 用到了哪些命令：
   1.  `yarn global add @vue/cli`（默写下来，就像是小学时背古诗默写古诗一样，写个十几遍就好了），这个操作让我们的终端有了 `vue`这个命令
   2.  `vue create hello-world`：如果没有创建项目那就用这个，如果已经有个目录那就用 `vue create .`呗
   3.  `yarn serve`：运行这个命令来开始开发，即所谓的实时预览
2. 如果没有装`yarn`，可以改成是`npm`。但我还是非常推荐你装一下 `yarn`，当然，也有可能过几年 `yarn`也不流行了。毕竟，目前的前端变化时真得快呀！总之以后哪个流行还是得用哪个！（铁打的前端，流水的工具）
3. 接下来就开始写代码了！

**➹：**[介绍 - Vue CLI](https://cli.vuejs.org/zh/guide/#cli-%E6%9C%8D%E5%8A%A1)

## ★ Vue 组件

### ◇如何写代码？

CRM大法

在用vue/cli创建一个vue项目的过程中，无疑是用到了CR姿势，那么接下来就是M了。

而这个M就需要芳芳指导了。

1. 先去看src目录，打开main.js（为啥要先看这个文件呢？因为JS里边有一些不成文的规定，如HTML的第一个文件一定是index.html，同理就是style.css、main.js or app.js，反正这几个文件都是需要你首先要看的，而Vue也是遵守这个规定的）

2. 分析main.js这个文件，如：

   ![1564214612100](img/01/1564214612100.png)

   而这就是M了。

   > `App`这个组件的template，是会替换挂载点的，这就是为啥App.vue的root元素会有个 `id="#app"`的缘故了：
   >
   > ![1564214801073](img/01/1564214801073.png)

以上就是CRM的M的好处了，可以让你在不知道任何东西的情况下，去学会改代码！

接下来分析，为啥页面会显示内容？——显然这是来自于 `App.vue`这个文件

打开这个文件，会提示你装个 Vetur 的插件，可以让这个文件高亮、语法提示等等。

接着，就是对这个文件，进行删除、修改、添加等操作了，于是分析得出 `template`就是我们写的HTML内容，`script`就是我们写的JavaScript，`style`就是我们写的CSS

而它们的顺序可以随意，但是有一个不成文的规定就是先 `template`、接着是`script`、最后是 `style`，反正这样写就是有好处的，至于什么好处，你换个乱得顺序写多了，就知道了。

如果你不知道哪些目录和文件是可以被删掉的，那么那就直接分析删掉呗！反正之后可以创建回来。

- 删掉assets和components目录，反正可以从垃圾回收站回收

### ◇没有思路？

你叫我做一个这样的井字棋？

![1564216220820](img/01/1564216220820.png)

> 图中你会做的那一步是最简化的需求了，如果还不会做，那就去补一些基础知识了。

当你拿到一个复杂的东西的时候，你需要做的是能不能简化、再简化这个东西到自己会做为止？

那么之后，就是不停地加东西就好了。

### ◇点击一个div，变成一个×

如何点一下就出现一个东西？——不知道

那就先让它出现一个东西吧！ ——`<div>×</div>`

如何让它没有呢？——有关 `if……else`，直接抄Vue官网给出的代码

```vue
  <div id="app">
    <div v-if="true">x</div>
    <div v-else>○</div>
  </div>
```

让数据是动态的？——使用data（对象值 or 一个函数值）

点击一下就变？——使用事件监听

默认是空的，点击一下空就显示`×`

```vue
<template>
  <div id="app">
    <div v-if="a">x</div>
    <div v-else v-on:click="a = true" >空</div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      a: false
    }
  }

}
</script>
```

不想出现多余的div？——使用template标签，需要注意的是，template标签上不能绑定事件，毕竟渲染到页面的元素就已经消失了，即无法点击。当然，你是可以加 `v-if`和 `v-else`的

```vue
<template>
  <div class="cell" v-on:click="a = true">
    <template v-if="a">x</template>
    <template v-else></template>
  </div>
</template>
```

![1564222232269](img/01/1564222232269.png)

给上一定的样式，发现字体不居中：

![1564222284586](img/01/1564222284586.png)

这是字体设计的问题，可以搞两个div交叉起来居中

总之，之所以没有居中是因为CSS没写好的缘故，还有字体设计这个不可变的因素的缘故。

当然你也可以这样写死（依赖元素的宽高以及字体大小）：

```css
box-sizing: border-box;
padding-bottom: 20px;
```

![1564222533916](img/01/1564222533916.png)

目前，只搞了一个div。照理说，我们应该从后往前逐渐加东西的，但是我们在这里直接就打算搞9个div出来：

![1564222814500](img/01/1564222814500.png)

结果报错了，因为：

> The template root requires exactly one element.eslint-plugin-vue

在Vue里边说到了，template里边只能由一个root元素，而图中出现了3个root元素，所以我们需要把它们三个给包裹住，这样就不会报错了。

```vue
<template>
  <div>
    <div class="cell" v-on:click="a = true">
      <template v-if="a">x</template>
      <template v-else></template>
    </div>
    <div class="cell" v-on:click="a = true">
      <template v-if="a">x</template>
      <template v-else></template>
    </div>
    <div class="cell" v-on:click="a = true">
      <template v-if="a">x</template>
      <template v-else></template>
    </div>
  </div>
</template>
```

总之，只能写一个root元素是Vue这个框架的规定呀！

可是，即便添加了root元素，还是出现了一个我们不需要的结果：

![kZ7K25pkZv](img/01/kZ7K25pkZv.gif)

那就是为啥点一下，这三兄弟都变`×`了？

其实，这个用脚趾头想也只知道啊！——这3个cell都监听了click事件，但是它们都依赖着data里边的a属性，任意一个cell被点击了，这个a属性值都会被改变，于是这3个cell就都显示了。

所以，有啥办法可以让它们三都是独立的呢？

一种傻逼办法：

- 搞三个属性呗，如a1、a2、a3，可是假如有100个cell呢？（虽然最终是9个），那岂不是这个data对象有100个这样意义一样的属性？或许你会用数组，但template里边还是的要 `a[0]/a[1]……`这样

  ```vue
  <template>
    <div>
      <div class="cell" v-on:click="a[0] = true">
        <template v-if="a[0]">x</template>
        <template v-else></template>
      </div>
      <div class="cell" v-on:click="a[1] = true">
        <template v-if="a[1]">x</template>
        <template v-else></template>
      </div>
      <div class="cell" v-on:click="a[2] = true">
        <template v-if="true">x</template>
        <template v-else></template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "app",
    data() {
      return {
        a: [false,false,false]
      };
    }
  };
  </script>
  ```

  我测试了一下这种姿势，结果发现但我点击cell的时候，数组a的元素值是有发生变化的，但是cell元素就没有响应式的渲染x了。

  官方给出的vue的[数据响应原理](https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)：直接给数组某元素赋值 和 通过length改变数组长度都是不能触发setter从而触发视图更新的。

  所以我们不能这样赋值：`v-on:click="a[0] = true"`

  而是这样：`Vue.set(this.a, 0, true)`，详情看：[③](#san)

另一种先进性姿势：

- 组件化，这可是体现了Vue的先进性呀！

简而言就是，把一个 Cell div 做成是个组件。

于是就创建了一个 `Cell.vue`，一般来说是大写比较好，用于告诉他人这是个组件，不过写小写也没事哈！

那么这个Cell组件的功能是啥呢？——就是我们刚刚实现的功能。

组件搞好之后，就是在App.vue里边使用了它，使用它的姿势也很简单：

1. 导入Cell组件， `import Cell from './Cell.vue'`

2. 注册为App.vue的局部组件 ：

   ```js
   export default {
     name: "app",
     components: {
       Cell, //这个语法很奇怪，这是ES6的新语法哈！
     }
   
   };
   ```

> 可以直接使用自闭合标签 `<Cell />`

至此，就可以实现与第一种傻逼姿势那样的效果了。

而这就是组件化啦！即把一个功能做成是一个组件，然后这个组件就是独立的，如果需要用到多个组件，那就引用多次呗，总之每个组件之间互相没有关系哈！

所以每个Cell都有一个自己的a，即你点这个Cell，另外一个Cell的a不会随着变化。

> 注意，可以这样来 `import Cell from './Cell'` ，`Cell.vue`的 `.vue`可以省略掉，因为Webpack有个配置，可以自动的按某个顺序去找
>
> ![1564240817091](img/01/1564240817091.png)
>
> 反正，加不加都行，总之优先找 `.vue`文件，接着是 `.js`，最后是 `.json`，反正这是有顺序的找的。

### ◇搞9个div

- 用到了flex布局，一行即是一个flex容器

![1564241407457](img/01/1564241407457.png)

按照芳芳的经验来说，一个新人用JavaScript而不是Vue来写这个是相当之难的，因为如何隔绝两个组件之间的变化是件麻烦事，如使用9个变量，控制着9个Cell，而且还得用上面向对象，组件通信等知识，总之，使用了Vue的组件姿势就可以让我们很简单的就能做到了，

### ◇点×之后，得是○才行

老是×的话，就没法玩了

所以如何让x是一个可变的东西呢？——搞个text属性 `text: 'x'`，template里边的`x`值是文本插值姿势 `{{text}}`

既然，x是可变的了，可是如何随着用户点击的不同次数而让text的值为 `○` or `x`呢？——这是这个项目最复杂的地方，而其它部分，倒是很简单。

---

## ★Vue 组件通信






















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

### ②判断本地有没有安装yarn？

1. `yarn --version`

发现没有，于是安装它：`scoop install yarn`

安装的是 `1.17.3`稳定最新版

我之前用npm全局安装了vue-cli：

![1564196701726](img/01/1564196701726.png)

芳芳视频里是用yarn安装的vue-cli，版本是 `3.9.2`。（我早想不用npm作为包管理器，因为当你需要在npm上发布包的时候，需要把淘宝源的设置给注释掉： `//registry=https://registry.npm.taobao.org/`（`~/.npmrc`） ）

于是我全局卸载了 npm 姿势安装的vue-cli：`npm uninstall vue-cli -g`

然而却没有删掉，即便我用管理员权限打开终端卸载它也无用！

就这样，我开始了搜索之旅：

**➹：**[am unable to uninstall vue cli · Issue #1241 · vuejs/vue-cli](https://github.com/vuejs/vue-cli/issues/1241)

这删除姿势是这样的：`npm uninstall -g @vue/cli`

![1564198662056](img/01/1564198662056.png)

而它删除的内容：

![1564198636061](img/01/1564198636061.png)

难道vue-cli官网是错的？

![1564198831128](img/01/1564198831128.png)

因此你这样安装的：

```bash
npm install -g @vue/cli
```

那么卸载就是这样的：

```bash
npm uninstall -g @vue/cli
```

没办法，谁叫自己没有用过 `vue 2.x`的vue-cli呢？

那接下来就用yarn安装吧：

![1564199690777](img/01/1564199690777.png)

根据这个 ： [rxjs-compat-6.2.2.tgz: ESOCKETTIMEDOUT · Issue #6115 · yarnpkg/yarn](https://github.com/yarnpkg/yarn/issues/6115)

于 `.yarnrc`里边配置一下即可（ `code -r ~/.yarnrc` ）：

```
network-timeout 600000
```

> 600000ms = 10min

这下终于可以了：

![1564200197584](img/01/1564200197584.png)

芳芳的是3.9.2版，我们安装的时候，可以指定版本号安装：

```bash
yarn global add @vue/cli@3.9.2
```

指定版本的目的：以防止看视频的时候，因为版本不一致的问题，导致程序运行没有预期效果的出现。（所有技术视频都会存在这个版本问题，毕竟工具时不时就更新了，而视频可能是1年前的、2年前的……）

总之，这是一个非常重要的细节！不然，同样的代码跑不起来，那就真得是让人觉得可以从入门到放弃了。

### <a id="san">③不用组件创建cell的姿势？</a>

```vue
<template>
  <div>
    <div class="cell" v-on:click="xx(0,true)">
      <template v-if="a[0]">x</template>
      <template v-else></template>
    </div>
    <div class="cell" v-on:click="xx(1,true)">
      <template v-if="a[1]">x</template>
      <template v-else></template>
    </div>
    <div class="cell" v-on:click="xx(2,true)">
      <template v-if="a[2]">x</template>
      <template v-else></template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "app",
  data() {
    return {
      a: [false,false,false]
    };
  },
  methods: {
    xx(indexOfItem,newValue) {
      Vue.set(this.a, indexOfItem, newValue)
    }
  }
};
</script>
```



