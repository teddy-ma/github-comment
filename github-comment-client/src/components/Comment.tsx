const Comment = ({ comment }: { comment: string }) => {
  return (
    <article className="">
      <p>{comment}</p>
    </article>
  );
};
export default Comment;
