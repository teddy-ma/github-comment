import {commentStyle, imageStyle, textStyle} from './CssStyle';

const Comment = ({ comment, avatar_url }: { comment: string, avatar_url:string }) => {
  return (
    <section style={commentStyle}>
      <img style={imageStyle} src={avatar_url} />
      <p style={textStyle}>{comment}</p>
    </section>
  );
};
export default Comment;
