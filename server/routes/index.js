var express = require('express');
var request = require('request');
var router = express.Router();

/* 首页 */
// 用于判断服务是否可用
router.get('/', function(req, res, next) {
  res.render('index');
});

/* 授权后的回调 */
// 成功后把 access_token 放到 session 中
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
  }, function(error, response, body) {
    console.log("callback ... " + body.access_token);
    req.session.token = body.access_token;
    console.log("in callback session " + req.session.token);
    res.render('success');
  });
});

module.exports = router;
