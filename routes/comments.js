var express = require('express');
var request = require('request');
var router = express.Router();

// 发起评论
router.post('/', function(req, res, next){
  var body = req.body.body;
  var repo = req.body.repo;
  var page_id = req.body.page_id;
  var user_name = req.body.user_name;
  var url = 'https://api.github.com/repos/'+user_name+'/'+repo+'/issues/'+page_id+'/comments';

  request.post({
    headers: {
      "Authorization": "token " + req.session.token,
      'user-agent': 'node.js',
      'Content-Type': 'application/json'
    },
    url: url,
    json: {
      body: body
    }
  }, function(error, response, body){
    res.json({ret: "success"});
  });
});

// 已有评论列表
router.get('/', function(req, res, next) {
  var user_name = req.query.user_name;
  var repo = req.query.repo;
  var page_id = req.query.page_id;

  var options = {
      url: "https://api.github.com/repos/"+user_name+"/"+repo+"/issues/"+page_id+"/comments",
      headers: {
          "Authorization": "token " + PERSON_TOKEN,
          'user-agent': 'node.js',
          'Content-Type': 'application/json'
      }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }
  request(options, callback);
});

module.exports = router;
