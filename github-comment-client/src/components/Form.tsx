import * as React from 'react';
import {createComment, fetchComments} from '../api';
import {commentStyle, imageStyle, textStyle} from './CssStyle';

const Form = ({avatar_url, appendComment}: {avatar_url: string, appendComment: Function}) => {
  const [content, setContent] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createComment({
      body: content,
      repo: "github-comment",
      page_id: "v3",
      user_name: "teddy-ma"
    }).then((newComment) => handleNewComment(newComment))
  };

  const handleNewComment = (newComment: Response) => {
    appendComment(newComment.body);
    setContent('');
  }

  // const handleInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setContent(event.target.value);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <img style={imageStyle} src={avatar_url} />
      <input type="text" value={content} onChange={(event) => setContent(event.target.value)} />
      <input type="submit" value="Comment" />
    </form>
  );
};


export default Form;
