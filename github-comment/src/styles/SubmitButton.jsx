import React from 'react';

import styled from 'styled-components';

const SubmitButton = styled.button`
  border-radius: 5px;
  padding: 4px 14px;
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.theme.bgcolor};
  border: 1px solid #fff;
`;

export default SubmitButton;
