---
layout: post.liquid
title: 模块化 css 实战
date: 2016-01-16
---

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

我找到了很多模块化 css 的思想：

- https://github.com/grvcoelho/css
- https://smacss.com/
- http://oocss.org/
- https://en.bem.info/

上述思路共同点是：

- 所有的 css 都由同一人(团队)把控
- 通过人为的规定来组织代码
- (可能)需要依赖外部工具(人工编写费时费力)

这和我的适用场景不符。

最后发现 webpack 的 css module mode 才是王道。

- sass 的定义

        @import "~susy/sass/susy";
        .github_comment_form_wrapper {
          @include container();
          height: $input_height;
          margin-top: 1rem;
        }

- react 的引用

        var style = require('./app.scss');
        var Avatar = React.createClass({
          render: function() {
            return (
              <div className={style.github_comment_avatar}>
                <img className={style.avatar} title={this.props.name} src={this.props.avatar} />
              </div>
            );
          }
        });

最后结果：

![](http://www.songofcode.com/sliders/assets/images/opensource-times/react-modular-css.png)

[这里有一个在线的例子](http://www.songofcode.com/how-to-learn-emacs-chinese-edition/), 可以使用浏览器的审查元素来查看实现细节.


<div id="github-comments"></div>
<script src="https://cdn.rawgit.com/teddy-ma/github-comment/v1.0.1/client/github-comment.js"
  id="github-comment" data-username="teddy-ma"
  data-repo="github-comment" data-page-id="3">
</script>
