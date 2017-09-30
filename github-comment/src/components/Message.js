import React from 'react';
import {connect} from 'react-redux';
import Alert from '../styles/Alert';


const Message = ({message}) => (
  message
    ? <Alert>{message}</Alert>
    : null
)

export default connect(
  (state) => ({message: state.message})
)(Message)
