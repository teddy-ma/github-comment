---
layout: post.liquid
title: 放弃 Heroku, 拥抱 Docker
date: 2016-01-24
---

在 Github Comment v0.1.0 版中, 我使用了 Heroku 作为部署平台。

不过在学习 Docker 的过程中, 我发现这个工具真的能非常大的提升部署的效率。

它带来的生产力提升比使用 Heroku 这样的 PaaS 平台要大得多。

于是趁着这次 v1.0.0 版的发布, 我把官方的 Host 从 Heroku 上转移到我自己的 vps 上的 Docker 容器中。

这样也方便使用自定义域名和其他基础设施（以后可能要用到的数据库，缓存等），这些东西在 Heroku 上都是要钱的。

好了让我们开始吧。

Github Comment 的 Server 端就是一个简单的 nodejs 应用。

要把一个 nodejs 应用部署到 Heroku 上需要两个关键点：

- `Procfile` 文件定义了启动脚本， 内容只有一行 `web: node app.js`，这里只有一个 web 服务器，只要用 node 启动入口文件 `app.js` 即可。

- 环境变量的注入, Heroku 在应用管理界面（也有命令行接口）提供了环境变量的配置，只要把 `.env.example` 中的三个变量定义好，应用就能读取配置并正确启动。

那么要把一个 nodejs 应用 Docker 化原理也类似，无非就是提供环境变量和指定启动脚本。

首先我们先把整个 Github Comment 程序放入一个 image 中。这步很简单，因为整个程序没有硬编码的外部依赖。

先在项目的根目录下创建一个 Dockerfile，它定义了一个 image 会被如何构建出来：

    # 这个 image 的父 image 是 docker 官方的 node image
    # 因为 Github Comment 没有 nodejs 以外的任何依赖，所以不需要其他的构建脚本
    FROM node:latest

    # 把当前路径下的文件都拷贝到镜像中的 /src 目录
    COPY . /src

    # 安装需要的 npm 包
    RUN cd /src; npm install

    # 暴露 5000 端口
    EXPOSE 5000

    # 启动项目
    CMD ["node", "/src/app.js"]

编写 Dockerfile 的难度比想象中容易的多，只要想想：我平时是怎么构建项目的？

在这个例子中很简单，无非就是使用 npm 安装所需的依赖。所以在整个 `Dockerfile` 中只有 RUN 关键字那一句。

然后 `EXPOSE` 关键字指定了容器在内部暴露的端口号，这是用于和宿主或其他容器交互时的端口。

最后的 `CMD` 命令就起到了 `Procfile` 的作用，就是刚才提到的启动脚本。

之后使用命令 `docker build -t mlc880926/github-comment .` 来构建出自己的 image。

构建成功后执行 `docker images` ，就能看到刚才构建好的镜像了：

    REPOSITORY                                   TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
    mlc880926/github-comment                     latest              e7b657ad5ce1        3 days ago          655.4 MB

这样一来第一点就搞定了，下面就是环境变量的注入，Docker 中每个容器都有自己的上下文，

所以环境变量要在启动时注入，使用下面的 shell 命令即可：

    docker run -d -p 5000:5000 --name github-comment \
      -e CLIENT_ID=xxxxxxxxxxx \
      -e CLIENT_SECRET=xxxxxxxxxxx \
      -e PERSON_TOKEN=xxxxxxxxxxx \
      mlc880926/github-comment

这样一来一个 Github Comment 的容器就正式启动了。

大家可以看到我把容器的 5000 端口映射到了宿主机的 5000 端口上，这样的话，客户端在调用的时候也要写上 5000 端口，这样显得很不专业。可是我的 vps 上还有其他服务要跑，而 80 端口只有一个。

碰到这种情况，使用 nginx 这样的 http server 来做反代是一个常见的解决方案。

既然已经使用 Docker 了，那干脆送佛送到西，把 nginx 也 docker 化吧。

首先 docker 官方直接提供了 nginx 的容器, 直接运行

    docker run -it -p 80:80 nginx

docker 就会从官方下载 nginx 的容器并启动, 试着访问你的 vps 的域名或 ip 地址,

如果看到 nginx 的字样就说明启动成功了, 下一步就是做反代了.

这里涉及到两个知识点:

1. 挂载文件系统到容器中
2. 容器之间的通讯

先说第一个, image 是只读的, 相当于 Java 中的类, 而 container 就像一个实例对象,

而把宿主的文件系统挂载到容器中就像新建一个对象时的构造方法一样, 把不同的信息传给每个不同的实例.

对于 nginx 的 image 来说, 我们只要提供一个配置文件既可改变每个 nginx 实例的行为.

命令如下:

    docker run --name nginx -v `pwd`/config/server.conf:/etc/nginx/conf.d/default.conf:ro -d nginx

上面这行命令的意思是, 把当前目录下的 config/server.conf 文件放到容器中的 /etc/nginx/cnof.d/default.conf 位置.

那是 nginx 读取配置文件的路径, 这样一来容器中的 nginx 就会根据我写的配置文件来进行反代了, 内容如下:

    server {
        listen       80;
        server_name  github-comment.songofcode.com;

    	location / {
            	proxy_pass  http://comment:5000;
            }
    }

现在这样启动容器是会报错的, 因为容器找不到 comment 这个域名.

我们的目的是让 comment 指向 Github Comment 所在的容器, 那就要把两个容器链接起来, 使用命令:

    docker run -it -d -p 80:80  --link github-comment:comment \
      -v `pwd`/config/server.conf:/etc/nginx/conf.d/default.conf \
        nginx

上面的命令中 `--link github-comment:comment` 就是说在启动 nginx 容器的时候,
和 `github-comment` 这个容器 (这个名字是启动 Github Comment 容器时用 `--name` 指定的) 连接起来, 并在 nginx 容器中命名为 comment, 成功启动后, 根据配置描述, 只要访问
github-comment.songofcode.com, 就会被反代到 Github Comment 的服务.

这时输入 `docker ps` 查看 docker 的进程, 会发现有两个:

    12dc30ffffce        nginx                                        "nginx -g 'daemon off"   29 hours ago        Up 29 hours         0.0.0.0:80->80/tcp, 443/tcp   evil_galileo
    c00847854896        mlc880926/github-comment                     "node /src/app.js"       45 hours ago        Up 45 hours         0.0.0.0:5000->5000/tcp        github-comment

如果现在使用命令 `docker exec -i -t 12dc30ffffce bash` 进入到 nginx 容器内部去查看 hosts 记录,
会看到类似 `172.17.0.5	comment` 的内容, 这就是容器间通讯的原理了.

至此, 一个原本跑在 Heroku 上的服务就被我迁移 docker 中了。

如果 vps 上有其他 web 服务，都可以用这样的方式来进行反代。所有的服务都可以 docker 化，非常方便做迁移和部署。


<div id="github-comments"></div>
<script src="https://cdn.rawgit.com/teddy-ma/github-comment/v1.0.1/client/github-comment.js"
  id="github-comment" data-username="teddy-ma"
  data-repo="github-comment" data-page-id="4">
</script>
