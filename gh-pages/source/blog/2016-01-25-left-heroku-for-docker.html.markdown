---
title: 放弃使用 Heroku, 拥抱 Docker
---

# 放弃使用 Heroku, 拥抱 Docker

在 Github Comment v0.1.0 版中, 我使用了 Heroku 作为部署平台.

不过在学习 Docker 的过程中, 我发现这个工具真的能非常大的提升部署的效率.

它带来的生产力提升比使用 Heroku 这样的 PaaS 平台要大得多.

于是趁着这次 v1.0.0 版的发布, 我把官方的 Host 改为了一台 linode 上的 docker.

这样也方便使用自定义域名和其他基础设施(这些东西在 Heroku 上都是要钱的).

Docker 化一个 nodejs app 的难度比想象中要简单得多.

其实只要一个 Dockerfile 文件就能搞定了, 直接看源码就知道该怎么做了.
