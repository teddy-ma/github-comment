---
title: 放弃 Heroku, 拥抱 Docker
---

# 放弃 Heroku, 拥抱 Docker

在 Github Comment v0.1.0 版中, 我使用了 Heroku 作为部署平台。

不过在学习 Docker 的过程中, 我发现这个工具真的能非常大的提升部署的效率。

它带来的生产力提升比使用 Heroku 这样的 PaaS 平台要大得多。

于是趁着这次 v1.0.0 版的发布, 我把官方的 Host 从 Heroku 上转移到我自己的 vps 上的 Docker 容器中。

这样也方便使用自定义域名和其他基础设施（以后可能要用到的数据库，缓存等），这些东西在 Heroku 上都是要钱的。

Github Comment 的 Server 端就是一个简单的 nodejs 应用。

要把一个 nodejs 应用部署到 Heroku 上需要两个关键点：

- `Procfile` 文件定义了启动脚本， 内容只有一行 `web: node app.js`，这里只有一个 web 服务器，只要用 node 启动入口文件 `app.js` 即可。

- 环境变量的注入, Heroku 在应用管理界面（也有命令行接口）提供了环境变量的配置，只要把 `.env.example` 中的三个变量定义好，应用就能读取配置并正确启动。

那么要把一个 nodejs 应用 Docker 化原理也类似，无非就是提供环境变量和指定启动脚本。

首先我们先把整个 Github Comment 程序放入一个 image 中。这步很简单，因为整个程序没有硬编码的外部依赖。

先来创建一个 Dockerfile，它定义了一个 image 会被如何构建出来：

    # 这个 image 的父 image 是 docker 官方的 node image
    # 因为 Github Comment 没有 nodejs 以外的任何依赖，所以不需要其他的构建脚本
    FROM node:latest

    # 把当前路径下的文件都拷贝到镜像中的 /src 目录
    COPY . /src

    # 安装需要的 npm 包
    RUN cd /src; npm install

    # 在容易内容暴露 5000 端口
    EXPOSE 5000

    # 启动项目
    CMD ["node", "/src/app.js"]

编写 Dockerfile 的难度比想象中容易的多，只要想想：我平时是怎么构建项目的？

这里很简单，无非就是使用 npm 安装所需的依赖。

然后 `EXPOSE` 关键字指定了容器在内部暴露的端口号，这是用于和宿主或其他容易交互时的端口。

最后的 `CMD` 命令就起到了 `Procfile` 的作用，就是刚才提到的启动脚本。

之后使用命令 `docker build -t mlc880926/github-comment .` 来构建出自己的 image。

这样一来第一点就搞定了，下面就是环境变量的注入，Docker 中每个容器都有自己的上下文，

所以环境变量要在启动时注入，使用下面的 shell 命令即可：

    docker run -d -p 5000:5000 --name github-comment \
      -e CLIENT_ID=xxxxxxxxxxx \
      -e CLIENT_SECRET=xxxxxxxxxxx \
      -e PERSON_TOKEN=xxxxxxxxxxx \
      mlc880926/github-comment

这样一来一个 Github Comment 的容器就正式启动了。

大家可以看到我把容器的 5000 端口映射到了宿主机的 5000 端口上，这样的话，客户端在调用的时候，

也要写上 5000 端口，这样显得很不专业。可是我的 vps 上还有其他服务要跑，而 80 端口只有一个。

碰到这种情况，使用 nginx 这样的 http server 来做反代是一个常见的解决方案。

既然已经使用 Docker 了，那干脆送佛送到西，把 nginx 也 docker 化吧。
