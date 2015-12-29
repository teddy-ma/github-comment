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

module.exports = router;
