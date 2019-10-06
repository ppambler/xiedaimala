---
typora-copy-images-to: img\05
---

# 生命周期

> 资源：[生命周期](https://tencentcloudbase.github.io/handbook/tcb14.html)





## ★总结

- 事件有冒泡，Target和currentTarget有区别：

  ![1570358872301](img/05/1570358872301.png)

- 在测试一些东西的时候，以下log信息甚是讨厌：![1570358491967](img/05/1570358491967.png)

- 写在组件上的的 `data-`数据，可以通过`currentTarget`或者 `target` 的dataset获取，后者一般不安全，因为如果发生冒泡，那么该dataset的值就是来自于源头的那个东西，而不是因为冒泡而触发事件执行的那个元素。

  ![1570359307368](img/05/1570359307368.png)

  假如有路由跳转，那么会执行事件源的那个事件的路由，即我点击图片，那就执行图片的路由，而不是它爸爸的路由！

- 小程序不支持navigateTo的外链跳转

- 小程序也支持给`data-*`属性添加wxss样式，比如我们可以给`data-pid`添加样式， `view[data-pid]{margin:30px;}`，`data-*`属性既可以类似于选择器一样的存在，也可以对它进行编程，是不是很强大？

- id、class、style甚至点击事件都是组件携带的数据，都可以用来编程，总之，多利用事件对象获取组件上的数据来进行编程。