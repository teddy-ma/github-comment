var express = require('express');
var request = require('request');
var router = express.Router();

/* 测试用的假数据 */
router.get('/comments', function(req, res, next) {
  var i = 0
  while (i < 1000000000) {
    i++;
  }
  res.json(
    [{
      id: 1,
      user_name: "hanmeimei",
      avatar_url: "https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150",
      body: "My name is hanmeimei"
    }, {
      id: 2,
      user_name: "liqiang",
      avatar_url: "https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150",
      body: "My name is liqiang"
    }]
  );
});

/* 测试用的提交评论 */
router.post('/comments', function(req, res, next) {
  res.json({
    ret: "success"
  });
});

router.post('/session', function(req, res, next){
  var sess = req.session
  if (sess.abc) {
    sess.abc++
    console.log(sess.abc)
  } else {
    sess.abc = 1
    console.log(sess.abc)
  }
  res.end();
});

/* 获取当前用户相关信息 */
router.get('/user', function(req, res, next) {
  // console.log("test session " + req.session.abc);
  // console.log("set session abc value");
  // req.session.abc = Math.random();
  // res.json({
  //   login_url: OAUTH_URL,
  //   user: {
  //     name: "teddy",
  //     avatar: "fdsafsda.png"
  //   }
  // })
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
    console.log(sess.views)
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
    console.log(sess.views)
  }
})

/* 用户鉴权测试 */
router.post('/auth', function(req, res, next) {
  if (Math.random() > 0.5) {
    res.json({
      auth: true,
      user_name: "leifeng",
      avatar_url: "https://placehold.it/150x150"
    });
  } else {
    res.json({
      auth: false,
      login_url: OAUTH_URL
    });
  }
});

module.exports = router;
