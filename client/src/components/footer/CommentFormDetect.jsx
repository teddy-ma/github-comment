import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../../styles/Footer';
import Input from '../../styles/Input';


export default class CommentFormDetect extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnFocus(e) {
    this.props.click_function(this.props.auth_url);
  }
  render() {
    return (
      <Footer>
        <Input onFocus={ this._handleOnFocus.bind(this) } type="text" />
        <span>菊花</span>
      </Footer>
    )
  }
};
