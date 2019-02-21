# README

> 项目地址：

## ★API

### ◇**获取 Top250的电影**

> 支持 JSONP

http://api.douban.com/v2/movie/top250?start=0&count=10&callback=fn

范例：

```js
$.ajax({
    url: '//api.douban.com/v2/movie/top250',
    data: {
        start: 0,
        count: 10
    },
    dataType: 'jsonp'
}).done(function(ret){

})
```

### ◇**获取榜单**

> 支持 JSONP

<http://api.douban.com/v2/movie/us_box?start=0&count=10&callback=fn>

范例

```js
$.ajax({
    url: '//api.douban.com/v2/movie/us_box',
    data: {
        start: 0,
        count: 10
    },
    dataType: 'jsonp'
}).done(function(ret){

})
```

### ◇**搜索**

> 支持 jsonp

[http://api.douban.com/v2/movie/search?q=冬天](http://api.douban.com/v2/movie/search?q=%E5%86%AC%E5%A4%A9)

```js
$.ajax({
    url: 'http://api.douban.com/v2/movie/search',
    data: {
        q: '冬天'
    },
    dataType: 'jsonp'
}).done(function(ret){

})
```

## ★源码和效果

[查看效果](http://book.jirengu.com/jirengu-inc/js-works/projects/doubanmovie/index.html)

## ★提示

如果效果中图片展示不出来，可在 html 添加 meta

```html
<meta name="referrer" content="never">
```