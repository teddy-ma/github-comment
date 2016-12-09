---
layout: post
title: "GitHub Comment 入门教程"
---

# GitHub Comment 入门教程

GitHub Comment 是一款基于 GitHub 账号的第三方社会化评论系统。

## 准备工作

一个 GitHub 账号，一个公共的 Repo，一个该 Repo 下的已创建好的 issue。（以后会考虑自动创建 issue）

## 安装

在你的 html 中加入下面的内容：


    <div id=”github-comments”></div> <!-- 评论组件的容器 -->
    <script defer=”true” src=”https://cdn.rawgit.com/teddy-ma/github-comment/v2.0.0/client/dist/bundle.js"
     id=”github-comment” data-username=”your-github-username”
     data-repo=”your-github-repo” data-page-id=”the issue number”>
    </script>


其中的配置项涉及到：

+ 容器 div 的 id `github-comments`, 必须且不可修改
+ script 的 id `github-comment`, 必须且不可修改
+ data-username 你的 github 用户名
+ data-repo 你的 github 仓库地址
+ data-page-id 你的仓库的 issue 的编号
+ data-ssl 是否使用 https (optional)
+ data-server-url 你自己的服务器的 url (optional)

可参考 [示例](https://www.songofcode.com/how-to-learn-emacs-chinese-edition/)

## 自托管

如果你不喜欢使用第三方的服务想要自己托管 GitHub Comment。
可以查阅 [相关文档](https://medium.com/github-comment/%E8%87%AA%E6%89%98%E7%AE%A1-github-comment-788c2ea6bbe7#.5jw4846q0)
