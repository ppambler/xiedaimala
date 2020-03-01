---
typora-copy-images-to: 00-img\faq
---

# FAQ

## 1、什么是Github Pages？

> GitHub Pages 是一个静态网站托管服务，直接从github仓库托管你个人、公司或者项目页面 ，并且不需要你写任何后端语言来支持。

Github Pages的服务是免费的，但是也有一些限制：

- 仓库空间不大于1G
- 每个月的流量不超过100G
- 每小时更新不超过 10 次

但是这些限制对我们普通人来说肯定没影响的，所以可以忽略。

其他详细信息可以在[Github Pages 文档](https://link.jianshu.com/?t=https%3A%2F%2Fhelp.github.com%2Fcategories%2Fgithub-pages-basics%2F) 里边查看（有中文翻译哈！）

> 这给我的信息是，我可以上传 1G 的内容：

![1568909841304](00-img/faq/1568909841304.png)

➹：[Jekyll + Github Pages 博客搭建入门 - 简书](https://www.jianshu.com/p/9f198d5779e6)

## 2、查看一篇笔记的大纲？

安装这个chrome插件：[Table of contents sidebar](https://chrome.google.com/webstore/detail/ohohkfheangmbedkgechjkmbepeikkej) ，即可看到笔记的大纲！

## 3、常用的 bash 命令？

➹：[★awesome-cheatsheets/bash.sh at master · skywind3000/awesome-cheatsheets](https://github.com/skywind3000/awesome-cheatsheets/blob/master/languages/bash.sh)

➹：[git Bash 命令行大全（持续更新） - webFrontEndDev的博客 - CSDN博客](https://blog.csdn.net/webfrontenddev/article/details/83182436)

➹：[Linux基本bash命令（持续更新） - 毛球饲养员 - CSDN博客](https://blog.csdn.net/u012442157/article/details/73692168)

➹：[github中git bash基础命令行 - 小鹏的编程日志 - 博客园](https://www.cnblogs.com/WangXinPeng/p/8016293.html)

## 4、TPR 是啥东西的简写？

Technic pre-research ： 技术预研！

## 5、写的每个链接都要加上 `➹：` 前缀

因为，这样一来，在本地用 VS Code 浏览md文件时，使用全局搜索，输入`➹：`就可找到所有你引入的链接了……

## 6、图片有阴影的样式？

修改根目录下的 `assets/css/style.css`：

``` css
p img {
    display: block;
    box-shadow: 0 0 5px #555;
    border-radius: 6px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: 0 0 10px #555;
}
```

## 7、移动端，字体加粗样式不明显？

同样，修改根目录下的 `assets/css/style.css`：

``` css
p strong {
  color: #ec4863;
  /* text-decoration: none; */
  background-image: linear-gradient(#ffda66, #ffda66);
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 0 3px;
  transition: background-size 500ms ease-in-out;
  font-weight: 500;
  padding-bottom: 4px;
}

p strong:hover {
    background-size: 100% 3px;
}
```

> 颜色选择：[調色盤、藝術家的色彩配置 - Adobe Color](https://color.adobe.com/zh/explore)

## 8、推荐浏览器外观自定义字体设置？

![字体推荐](assets/img/2020-03-01-13-13-55.png)








