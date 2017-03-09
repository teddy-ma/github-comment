import React from 'react';

import styled from 'styled-components';

const LoginLink = styled.button`
  border-radius: 5px;
  padding: 4px 14px;
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  background: ${props => props.theme.main};
  border: 1px solid #fff;
`;

export default LoginLink;