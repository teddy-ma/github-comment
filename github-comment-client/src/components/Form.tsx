import * as React from 'react';

const Form = () => {
  const [content, setContent] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('submit')
  };

  // const handleInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setContent(event.target.value);
  // };

  return (
    <form onSubmit={handleSubmit}>

    <input type="text" value={content} onChange={(event) => setContent(event.target.value)} />
    <input type="submit" value="Comment" />
    </form>
  );
};


export default Form;
