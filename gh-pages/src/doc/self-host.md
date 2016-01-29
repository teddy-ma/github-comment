---
layout: post.liquid
title: self-host
date: 2015-12-25
---

# 自托管 GitHub Comment

GitHub Comment 的账号系统是基于 GitHub 的.

因此要自托管 GitHub Comment 必须要在 GitHub 上注册一个 application.

另外最好要一个自己的 [Personal access token](https://github.com/settings/tokens),
否则容易出现拉取 issues 的次数限制.

应用程序需要 CLIENT_ID, CLIENT_SECRET, PERSON_TOKEN 这三个环境变量.

GitHub Comment 后端是使用 nodejs + express 实现的, 因此只要有相应的系统环境或者使用 heroku 之类的平台就可以使用。

GitHub Comment 遵循 [12-Factor](http://12factor.net/zh_cn/) 的原则, 将配置与代码分离.

代码根目录下有一个 `.env.example` 文件, 复制该文件为 `.env` 并修改其中内容为自己的配置即可.

如果使用 heroku, 可以使用 heroku 命令行或在 web 端通过配置环境变量达到相同的结果.
