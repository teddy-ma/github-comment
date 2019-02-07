var express = require('express');
var request = require('request');
var encode = require('nodejs-base64-encode');
var router = express.Router();

/* 用户鉴权 */
router.post('/auth', function(req, res, next) {
  console.log("in auth session token is: " + req.session.token);
  if (req.session.token) {
    var options = {
      url: 'https://api.github.com/user',
      headers: {
        "Authorization": "token " + req.session.token,
        'user-agent': 'node.js',
        'Content-Type': 'application/json'
      }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var user_info = JSON.parse(body);
        res.json({
          auth: true,
          user_name: user_info.login,
          avatar_url: user_info.avatar_url
        });
      }
    }
    request(options, callback); // user session exist, use token to get user info
  } else { // user session not exist
    var referer = req.header('Referer');
    res.json({
      auth: false,
      login_url: OAUTH_URL + "&" + "state=" + encode.encode(referer, 'base64')
    });
  }
});

module.exports = router;
