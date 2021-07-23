import * as React from 'react';
import { fetchComments, CommentType } from './comment-hooker';

import { Loading } from './Loading';


const Comment = ({ comment }: { comment: string }) => {
  return (
    <article className="">
      <p>{comment}</p>
    </article>
  );
};

const App = () => {
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
      </main>
    );
  }
};

export default App;
