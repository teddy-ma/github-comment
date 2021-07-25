const Comment = ({ comment, avatar_url }: { comment: string, avatar_url:string }) => {
  return (
    <section className="">
      {/* TODO react typescript css impl <img src={avatar_url} /> */}
      <p>{comment}</p>
    </section>
  );
};
export default Comment;
