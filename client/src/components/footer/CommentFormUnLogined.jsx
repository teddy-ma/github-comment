import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../../styles/Footer';
import Input from '../../styles/Input';
import LoginLink from '../../styles/LoginLink';

export default class CommentFormUnLogined extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnClick(e) {
    this.props.click_function(this.props.login_url);
    window.location.href=this.props.login_url;
  }
  render() {
    return (
      <Footer>
        <Input disabled="true" type="text" />
        <LoginLink onClick={ this._handleOnClick.bind(this) }>Login with GitHub</LoginLink>
      </Footer>
    )
  }
};
