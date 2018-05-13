var express = require('express');
var request = require('request');
var router = express.Router();

// 发起评论
router.post('/', function(req, res, next) {
  var body = req.body.body;
  var repo = req.body.repo;
  var page_id = req.body.page_id;
  var user_name = req.body.user_name;
  var url = 'https://api.github.com/repos/' + user_name + '/' + repo + '/issues/' + page_id + '/comments';
  console.log(req.session.token);
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
  }, function(error, response, body) {
    console.log(error);
    console.log(body);
    res.json({
      body
    });
  });
});

// 已有评论列表
router.get('/', function(req, res, next) {

  var create_issue = (url, token, title, callback) => {
    request.post({
      headers: {
        "Authorization": "token " + token,
        'user-agent': 'node.js',
        'Content-Type': 'application/json'
      },  
      url: url,
      json: {              
        title: title,
        body: "comments below"
      } 
    }, function(error, response, body) {                
      callback(null, body);
    }); 
  };
  
  var user_name = req.query.user_name;
  var repo = req.query.repo;
  var page_id = req.query.page_id; // it's page's uuid (title)

  const isssues_url = `https://api.github.com/repos/${user_name}/${repo}/issues`;
  // check issue first
  request({
    url: isssues_url,
    headers: {
      "Authorization": "token " + PERSON_TOKEN,
      'user-agent': 'node.js',
      'Content-Type': 'application/json'
    }
  }, (error, response, body) => {
    const issue = JSON.parse(body).filter(c=> c.title === page_id)[0];
    
    if(issue) { // issue exist
      var issue_id = issue.number;
      var comments_url = "https://api.github.com/repos/" + user_name + "/" + repo + "/issues/" + issue_id + "/comments";
      //debugger;
      request({
        url: comments_url,
        headers: {
          "Authorization": "token " + PERSON_TOKEN,
          'user-agent': 'node.js',
          'Content-Type': 'application/json'
        }
      }, (error, response, body) => {
        //debugger;
        res.json(JSON.parse(body));
      });
    } else {
      create_issue(isssues_url, PERSON_TOKEN, page_id, (error, result) => {
        if(!error) {
          debugger;
          var issue_id = JSON.parse(result).number;
          var comments_url = "https://api.github.com/repos/" + user_name + "/" + repo + "/issues/" + issue_id + "/comments";
          request({
            url: comments_url,
            headers: {
              "Authorization": "token " + PERSON_TOKEN,
              'user-agent': 'node.js',
              'Content-Type': 'application/json'
            }
          }, (error, response, body) => {
            res.json(JSON.parse(body)); 
          });
        }
      });
    };
    
  });
});

module.exports = router;
