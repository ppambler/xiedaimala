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

```
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

```
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

```
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

## ★总结

## ★Q&A

