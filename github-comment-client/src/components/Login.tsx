import * as React from 'react';

const Login = ({login_url}: {login_url: String}) => {
  return (
    <a href="{login_url}" target="_blank" >Login via github </a>
  );
};

export default Login;
