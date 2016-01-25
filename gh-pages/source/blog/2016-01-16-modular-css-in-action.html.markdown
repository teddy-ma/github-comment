---
title: 模块化 css 实战
published: false
---

# 模块化 css 实战

GitHub Comment 上线后不久, 我就发现了一个巨大的潜在问题: 样式的加载问题.

因为之前的测试都是放在自己的主页和 GitHub Comment 的项目主页的.

这两个地方我都使用了 SKELETON 这个 css 框架. 所以就想当然的开始使用 SKELETON 提供的 class 来处理样式.

这次想要给一个其他的页面加载评论框, 却发现样式不对, 这才想起这回事.

GitHub Comment 并没有采用 Disqus 那样的 iframe 实现方式.

所以需要的样式会和宿主页面共享, 那么问题就来了: 如果强行引入外部 css 框架甚至仅仅加载必要的样式,

都有可能影响宿主页面的样式(全部写行内样式倒是可以解决问题, 可是臣妾做不到啊...).

关于这个问题, 自然有前辈已经想出了各种解决方案. 比如以 SMACSS 为代表的各类架构.
配合 SASS(SCSS) 等各种 css 预处理器, 可以最大限度的隔离不同的 css 可能造成的冲突.

可是这类方法的限制是: 他们只是一种最佳实践, 没有强制的隔离功能.

这样的方法并不适合 GitHub Comment 的情况, 因为宿主的样式情况是不确定的.

于是我开始寻找其他的解决方案.

最后发现 webpack 的 css module mode 才是王道

具体配置直接看源码即可, [这里有一个在线的例子](http://www.songofcode.com/how-to-learn-emacs-chinese-edition/), 可以使用浏览器的审查元素来查看实现细节.
