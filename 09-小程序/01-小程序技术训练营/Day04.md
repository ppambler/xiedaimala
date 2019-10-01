---
typora-copy-images-to: img\04
---

# JavaScript入门

> 资源：[JavaScript入门](https://tencentcloudbase.github.io/handbook/tcb11.html)

## ★全局对象wx

### ◇**页面链接跳转**

跳转到某个页面：

```js
wx.navigateTo({
  url: '/pages/home/imgshow/imgshow'
})
```

注意，不能跳到tabbar页面哈，即无法这样做（我配置了4个tab）：

```js
wx.navigateTo({
  url: '/pages/list/list'
})
```

每次执行跳转到某个页面都会在页面栈里边push一个页面路由地址，如我从home页开始，跳转了3次某个页面（可以重复跳转同一个页面）：

![1569927662667](img/04/1569927662667.png)

[getCurrentPages](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html)是个全局函数，可以直接获取当前的页面栈！需要注意的是，小程序中页面栈最多十层：

![1569928001665](img/04/1569928001665.png)

使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。如这样：

```js
wx.navigateBack({
  delta: 1
})
```

表示回到上一页：

![1569928228832](img/04/1569928228832.png)

你写2，那么就把最后两个元素移除了，然后当前页面显示的就是最后一个元素的路由

![1569928484814](img/04/1569928484814.png)

回到首页：

![1569928603090](img/04/1569928603090.png)

