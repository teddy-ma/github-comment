import * as React from 'react';
import { fetchComments, CommentType, fetchAuth, AuthType } from './api';

import { Loading } from './components/Loading';
import Form from './components/Form';
import Login from './components/Login';
import Comment from './components/Comment';

// data-server-url="localhost:5000"
// data-username="teddy-ma"
// data-repo="github-comment"
// data-page-id="blablablabla">
// {login_url, authed}: {login_url: string, authed: boolean}
const App = () => {
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [auth, setAuth] = React.useState<AuthType>({
    auth: false,
    user_name: '',
    avatar_url: '',
    login_url: '',
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // fetch comments
    loadingComments()

    // fetch auth
    fetchAuth().then((auth) => setAuth(auth))
  }, []);

  const loadingComments = () => {
    fetchComments().then((comments) => setComments(comments));
    setLoading(false);
  }

  const appendComment = (comment: CommentType) => {
    setComments([...comments, comment]);
  }

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <main>
        <section>
          {comments.map((comment, index) => (
            <Comment key={index} avatar_url={comment.user.avatar_url} comment={comment.body} />
          ))}
        </section>
        {auth.auth ? <Form appendComment={appendComment} avatar_url={auth.avatar_url} /> : <Login login_url={auth.login_url} />}
      </main>
    );
  }
};

export default App;
