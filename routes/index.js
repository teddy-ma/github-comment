var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* 授权后的回调 */
router.get('/callback', function(req, res, next) {
  var session_code = req.query.code;
  request.post({
    url: 'https://github.com/login/oauth/access_token',
    json: true,
    form: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: session_code
    }
  }, function(error, response, body){
    req.session.token = body.access_token;
    res.render('success');
  });
});

/* 测试用的假数据 */
router.get('/fake_comments', function(req, res, next) {
  res.json(
    [
      {
        id: 1,
        user_name: "hanmeimei",
        avatar_url: "https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150",
        body: "My name is hanmeimei"
      },
      {
        id: 2,
        user_name: "liqiang",
        avatar_url: "https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150",
        body: "My name is liqiang"
      }
    ]
  );
});


module.exports = router;
