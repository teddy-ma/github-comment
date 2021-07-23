import * as React from 'react';
import { fetchComments, CommentType } from './comment-hooker';

import { Loading } from './components/Loading';
import Form from './components/Form';
import Login from './components/Login';
import Comment from './components/Comment';

const App = ({login_url, authed}: {login_url: string, authed: boolean}) => {
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchComments(2).then((comments) => {
      setTimeout(() => {
        setComments(comments);
        setLoading(false);
      }, 5000);
    });
  }, []);

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <main>
        <section>
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment.body} />
          ))}
        </section>
        {authed ? <Form /> : <Login login_url={login_url} />}
      </main>
    );
  }
};

export default App;
