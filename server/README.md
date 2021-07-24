# Github Comment 服务端

get /
post /comments
get /comments
post /users/auth
get /callback

dev:

client_id=5db0dec91bf55db2de2c
client_secret=1a69d0f95a962e7767d49c1ac7e124c877ad8935
person_token=

http://localhost:5000/comments?user_name=teddy-ma&repo=github-comment&page_id=v3

http://localhost:5000/comments
  {
    body: "hello",
    page_id: "v3",
    user_name: "teddy-ma",
    repo: "github-comment",
  }
