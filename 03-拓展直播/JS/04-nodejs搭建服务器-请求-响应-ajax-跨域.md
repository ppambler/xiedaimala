---
typora-copy-images-to: img\04
---

# node.js 搭建服务器、请求、响应、ajax、跨域

## ★课程简介

若愚老师讲解难点

## ★服务器深入浅出（文章）

### ◇什么是服务器？

Web 服务器就是一个软件，这个软件监听某个端口。当一个 Http 请求到达这个端口后这个软件会接收到，根据请求的 url 和参数发送响应数据，这些数据可以是：

1. 本机文件；
2. 通过可执行程序从数据库获取数据后组装的页面

### ◇静态服务器

![img](img/04/57328570.jpg)

> 文件路径可以不与url路径一一对应吧？

### ◇动态服务器

![img](img/04/90174520.jpg)

### ◇一个简单的服务器

以下代码使用的 api 文档[点此查看](https://nodejs.org/dist/latest-v10.x/docs/api/http.html)

```js
var http = require('http')

// var server = http.createServer(function(req, res){
//     console.log('jiengu')
//     res.setHeader("Content-Type","text/html; charset=utf-8")
//     res.write('<h1> 饥人谷</h1>')
//     res.end()
// })
// server.listen(9000)


var server = http.createServer(function(request, response){
  setTimeout(function(){


    response.setHeader('Content-Type','text/html; charset=utf-8')
    response.writeHead(404, 'Not Found')
    response.write('<html><head><meta charset="gbk" /></head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')
    response.write('</html>')

    response.end()
  },2000);
})

console.log('open http://localhost:8080')
server.listen(8080)
```

### ◇一个简单的静态服务器

```js
var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res){
  try{
    var fileContent = fs.readFileSync(__dirname + '/static' + req.url)
    res.write(fileContent)
  }catch(e){
    res.writeHead(404, 'not found')
  }
  res.end()
})

server.listen(8080)
console.log('visit http://localhost:8080' )
```

### ◇支持静态文件动态路由的服务器

```js
var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req, res){
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)

  switch (pathObj.pathname) {
    case '/getWeather':
      var ret
      if(pathObj.query.city == 'beijing'){
        ret = { city: 'beijing', weather: '晴天' }
      }else{
        ret = { city: pathObj.query.city, weather: '不知道' }
      }
      res.end(JSON.stringify(ret))
      break;
    default:
        try{
            var fileContent = fs.readFileSync(__dirname + '/static' + pathObj.pathnamel)
            res.write(fileContent)
            }catch(e){
                res.writeHead(404, 'not found')
            }
       res.end( )
  }
}).listen(8080)
```

## ★Ajax（文章）

### ◇从写代码到页面展现

#### ajax

资料：[ajax](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/Javascript/ajax.html)

##### ajax是什么？

ajax是一种技术方案，但并不是一种新技术。它依赖的是现有的CSS/HTML/Javascript，而其中最核心的依赖是浏览器提供的`XMLHttpRequest`对象，是这个对象使得浏览器可以发出HTTP请求与接收HTTP响应。 实现在页面不刷新的情况下和服务端进行数据交互

##### 怎么实现？

- XMLHttpRequest对象
- fetch [兼容性](http://caniuse.com/#search=fetch)——不支持IE

##### 范例？

1. [ajax](http://js.jirengu.com/gahon/1/edit?html,output)
2. [fetch](http://js.jirengu.com/tohuy/2/edit?html,console,output)

写一个 ajax

```javascript
var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://api.jirengu.com/weather.php', true)
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            //成功了
            console.log(xhr.responseText)
        } else {
            console.log('服务器异常')
        }
    }
}
xhr.onerror = function(){
    console.log('服务器异常')
}
xhr.send()
```

换种写法

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://api.jirengu.com/weather.php', true)
xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        //成功了
        console.log(xhr.responseText)
    } else {
        console.log('服务器异常')
    }
}
xhr.onerror = function(){
    console.log('服务器异常')
}
xhr.send()
```

post 的使用

```javascript
  var xhr = new XMLHttpRequest()
  xhr.timeout = 3000        //可选，设置xhr请求的超时时间
  xhr.open('POST', '/register', true)

  xhr.onload = function(e) { 
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
      console.log(this.responseText)
    }
  }
    //可选
  xhr.ontimeout = function(e) { 
        console.log('请求超时')
  }

  //可选
  xhr.onerror = function(e) {
      console.log('连接失败')
  }
  //可选
  xhr.upload.onprogress = function(e) {
      //如果是上传文件，可以获取上传进度
  }

  xhr.send('username=jirengu&password=123456')
```

封装一个 ajax

```javascript
function ajax(opts){
    var url = opts.url
    var type = opts.type || 'GET'
    var dataType = opts.dataType || 'json'
    var onsuccess = opts.onsuccess || function(){}
    var onerror = opts.onerror || function(){}
    var data = opts.data || {}

    var dataStr = []
    for(var key in data){
        dataStr.push(key + '=' + data[key])
    }
    dataStr = dataStr.join('&')

    if(type === 'GET'){
        url += '?' + dataStr
    }

    var xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            //成功了
            if(dataType === 'json'){
                onsuccess( JSON.parse(xhr.responseText))
            }else{
                onsuccess( xhr.responseText)
            }
        } else {
            onerror()
        }
    }
    xhr.onerror = onerror
    if(type === 'POST'){
        xhr.send(dataStr)
    }else{
        xhr.send()
    }
}

ajax({
    url: 'http://api.jirengu.com/weather.php',
    data: {
        city: '北京'
    },
    onsuccess: function(ret){
        console.log(ret)
    },
    onerror: function(){
        console.log('服务器异常')
    }
})
```

##### 详细使用

[参考这里](https://segmentfault.com/a/1190000004322487)

### ◇跨域

## ★什么是 Web 服务器

### ◇一次过

它是一个软件，其中分为静态服务器和动态服务器两种，前者甚是简单，即本地资源路径与url一一对应，而其中的资源是静态的，如我部署这个笔记到到github上，就是按静态服务器处理的，就像这样访问：

![1548168589916](img/04/1548168589916.png)

至于后者，资源是动态的，url可不是非得与服务器的本地资源路径一致的

### ◇本节课讲什么？

讲解服务器、AJAX，然后与之相关的一些知识！

### ◇什么是Web服务器？

举个例子来说：

1. 访问https://xiedaimala.com的时候，可以看到一个页面
2. 访问https://baidu.com的时候，也可以看到一个页面
3. 当我把当前这个md文件上传到自己的GitHub上，然后通过GitHub Pages部署该文件所对应的仓库，然后就可以通过url访问该md文件HTMl化后的文件了！

4. ……

或许你会疑问：

为啥我们可以通过url来访问这些文件？

为啥我当前电脑xx盘中有许多小视频（你懂的……），人家就不可以通过url来访问我的小视频呢？

是不是得必须把这些资源放到某个地方上去，别人才能看得见呢？

这其中到底是不是有什么东西做了支撑？

……

这就涉及到Web服务器的概念啦！

举个例子：

在本地建个文件夹，里面有个index.html文件，就像这样：

![1548209952731](img/04/1548209952731.png)

此刻你想访问我这个文件，然后你就打开浏览器，然后输入一个东西想看到我这个页面，你说可以不？——显然不可以哈！

或许你会说这是因为你的这台电脑没有在公网上，所以才无法访问的，所谓的公网就是一个提供一个能够公共访问IP的这么一个东西，总之就是通过公网ip，浏览器就能找到你这台电脑就对了……

**➹：**[外网公网是什么意思_百度知道](https://zhidao.baidu.com/question/692210293638867364.html)

既然你这样说，那我就在阿里云上购买一个服务器好了，而这个服务器就相当于是我这台电脑，而且还有一个公网的ip，这样一来别人就可以通过ip地址找到我所购买的（应该说是租赁的）服务器了……就像这样：

![1548212342555](img/04/1548212342555.png)

当我把小视频上传到了这台服务器中的root目录中的zzz文件夹中，然后通过 `公网ip/zzz/`访问，结果还是看不见东西……

既然不是公网ip的问题，所以咋办？

这个时候我们就需要一个东西，一个叫做Web服务器的东西……

那么它是什么呢？

它是一个软件，这个软件可以去监听你当前电脑上的某个端口（如监听这个端口上的http请求）。当这个 Http 请求到达这个端口后，由于这个软件也在监听这个端口，所以这个请求一到端口上，它立刻就能听得到！能听到之后它就会根据比如说用户的配置，然后去返回一些东西，，通过HTTP协议返回一些数据……

换句话说，一个请求到这个服务器之后，用户能够看到什么是由这个服务器上装的某一个软件决定的。

这个软件说你可以看到我的某个文件夹下的某几个文件，那此刻这几个文件的数据就会发送给浏览器，发送给用户，然后他就能看得见，这就是一个Web服务器。

那么这个Web服务器它可以干什么事情呢？

它可以把这个当前电脑上面的文件给拿出去，然后扔给你。它也可以干吗？它也可以命令某些可执行的文件，可执行的程序去执行，而执行的过程中会生成数据，然后把生成的数据拿给你！

所以这个服务器一般来说会把它分为静态服务器和动态服务器，当然，你也可以不用这样去分……

#### 静态服务器

什么叫静态服务器？

![1548218701503](img/04/1548218701503.png)

1. 一台机器（也就是电脑），与之对应的域名是这个  `jirengu.github.io`
2. 这个机器的某个文件夹下有两个文件夹，这两个——`project1`和`project2`
3. `project1`下面有这个文件—`a.html`
4. 当用户访问`jirengu.github.io/project1/a.html`的时候，实际上这个请求相当于是到了这个机器  ，然后这个机器的软件就会根据你这个url后缀里面这个 `/project1/a.html` ，然后就会读对应的文件夹，然后把其中的文件里面的数据给拿到，然后再发给用户，然后这个东西就到用户的电脑，用户就看到这个HTML了。换句话说，这个服务器做事情很简单，就是根据你访问的路径，然后去找对应的的文件，然后把这个文件拿给你，所以它叫静态服务器

#### 动态服务器

动态服务器给的数据的种类就比较多了！比如说我们这个a.html数据太死了……

举个例子来说，a.html是个静态页面，可是它这里面的数据，我希望它是实时变动的，这该怎么办呢？

总之就是让不同用户访问它的时候所看到的结果是不一样的……

没有办法可以做到，因为a.html这个页面是死的……

所以，我们现在需要一个程序可以帮我们做到数据是动态的而不是静态的！

而这个程序的逻辑可能是这个样子的：

![img](img/04/90174520.jpg)

当我们输入 `xiedaimala.com/courses`这个地址以后，这个请求实际上就到达了这个服务器，这个服务器里面安装了一个我们刚刚所说的web server，即Web服务器——一个软件

然后它就会根据你写的这个url的配置，把你这个请求交给某个程序，这个程序实际上，不管是用PHP、Ruby、nodejs，还是JAVA、Python等来写的，反正它就相当于是一个可执行的程序！注意这个程序里的代码可能是你自己去写的！

交给它之后，里面的代码就会处理这个请求，然后会从View中拿到对应的模板，然后从模型（Model）里面拿到对应的数据，接着把数据和模板几个进行拼接（一个复杂的页面可是由好几个组件构成的，这意味着会有好几个模板，不过目前，前端已经把后端生成模板的活给干了！），然后生成一个新的页面，这个页面实际上就是一个很大的一串字符串，然后把这个东西发回去，所以用户看到的就是一个可变的数据。

换句话说，此刻当用户输入 `xiedaimala.com/courses` 的时候，并不是去找这个服务器下面有个目录叫courses中的默认文件index.html，而是Controller（控制器）它去决定去找谁要数据，决定去拿哪个模板，然后把这个数据塞到这个模板里面，拼成一个新的HTML字符串，然后返回去。

所以这整个请求响应的过程是动态的。换句话说，有一个可执行的程序能够去执行你这个代码。

而静态服务器比较简单，没有什么执行，就是根据你给的url路径去找。

所以经常有人会说，我写了一个nodejs代码——一个server，写完之后把它上传到GitHub上，然后用GitHub Pages做预览。

然而为什么没有执行这个server呢？

那是因为GitHub Pages它本身是一个静态服务器，你把这文件上传上去，你访问它，你看的是这个文件，而不是去执行这个文件，然后得到它的结果。

所以它是不支持的，它只是支持展示一些静态页面。那如果想要用更复杂的功能，那你需要自己去搭服务器，把你的代码上传的一个支持nodejs的这么一套环境上才可以。

这就是关于静态服务器和动态服务器这么一个概念。

### ◇小结

- “网络服务器（Web server）”可以代指硬件或软件，或者是它们协同工作的整体。

- 你在阿里云上租赁了一台服务器，那么这台服务器就相当于是你经常使用的笔记本一样，当然，这其中一般会配置linux系统，而除此之外空空如也，即没有所谓的QQ等软件之类的……如果你把这台服务器当作是类似于云盘之类的用作备份的话，显然有点大材小用了，而且也存不了多少东西（似乎涉及到文件服务器）

  为此很多时候我们必须得为这台很纯粹的服务器添加点东西才行

  如果你想让服务器提供Web服务的，那么你就得使用一些诸如Apache、nginx等之类的软件才行（主要是提供HTTP服务的……）

  如果你想让服务器还能提供数据库服务的，那么你就得使用一些Oracle、MySQL等之类的软件才行

  所以此刻你的服务器有多种身份了，可以说它是Web服务器，也可以说数据库服务器……反正这台服务器提供了什么服务，那么它就是什么样的服务器了。

  总之，你租赁了一台服务器，那么你就得搞点Web服务器软件，这样用户才能通过url访问某些资源吧，如果你搭建的是动态Web服务器的话，那么你得搞点MySQL之类的软件，为此好提供数据库服务……

  ![1548231851392](img/04/1548231851392.png)

  所以什么是Web服务器？

  Web 服务器就是一个软件，这个软件（如Nginx、Apache、Tomcat之类的）监听某个端口。当一个 Http 请求到达这个端口后这个软件会接收到，根据请求的 url 和参数发送响应数据，这些数据可以是：

  1. 本机文件；
  2. 通过可执行程序（用Java/nodejs等语言写的程序，这应该是Web后端程序员干的活儿吧！）从数据库获取数据后组装的页面

- 为了让用户在浏览器地址栏里输入的url是有结果的，那么你的服务器得开启http服务才行！

**➹：**[什么是网络服务器？ - MDN](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_web_server)

**➹：**[服务器 - Wikiwand](https://www.wikiwand.com/zh-hans/%E6%9C%8D%E5%8A%A1%E5%99%A8)

**➹：**[文件服务器 - Wikiwand](https://www.wikiwand.com/zh-hans/%E6%96%87%E4%BB%B6%E6%9C%8D%E5%8A%A1%E5%99%A8)

**➹：**[Nginx - Wikiwand](https://www.wikiwand.com/zh-hans/Nginx)

**➹：**[Apache和Apache Tomcat的区别是什么？ - 知乎](https://www.zhihu.com/question/37155807)







## ★总结

- 我觉得我得选择一门Web后端语言来学习才行，如nodejs，因为它用的是JavaScript……唯有这样，我才觉得知识面算是比较完整的，当然诸如算法、数据结构、网络、数学、英语等之类的，你都得花时间去学习它们，因为它们贯穿了你整个程序员生涯……

  总之目前的学习方向就是抓大放小……然后先找一份工作，稳定下来了之后再慢慢升级……

- 这个东西和那个东西之间存在什么关系？这个东西在整个执行流程中扮演了什么角色？这两个问题很值得去探究！

  如：

  服务器和服务器软件之间的关系？

  只要服务器提供了Web服务，那么我们就叫可以叫它Web服务器，很多时候我们都把web服务器指代为软件或硬件，或者说是软硬件协同工作的结合体！

  可执行程序在整个请求和响应过程中扮演了什么角色？

  目前我所了解到的：可执行程序跟Web服务器打交道，也跟数据库服务器打交道

  

## ★Q&A

