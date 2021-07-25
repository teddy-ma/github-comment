import * as React from 'react';

const Login = ({login_url}: {login_url: string}) => {
  return (
    <a href={login_url} target="_blank" >Login via github </a>
  );
};

export default Login;
