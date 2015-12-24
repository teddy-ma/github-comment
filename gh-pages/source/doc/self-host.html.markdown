# 自托管 GitHub Comment

GitHub Comment 的账号系统是基于 GitHub 的.

因此要自托管 GitHub Comment 必须要在 GitHub 上注册一个 application.

另外最好要一个自己的 [Personal access token](https://github.com/settings/tokens),
否则容易出现拉取 issues 的次数限制.

应用程序需要 CLIENT_ID,CLIENT_SECRET,PERSON_TOKEN 这三个环境变量.

GitHub Comment 后端是使用 nodejs + express 实现的, 因此只要有相应地系统环境或者使用 heroku 之类的平台
就可以启用了.
