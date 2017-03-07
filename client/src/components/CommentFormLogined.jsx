import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../styles/Footer';
import Input from '../styles/Input';
import SubmitButton from '../styles/SubmitButton';

export default class CommentFormLogined extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnChange(e) {
    this.props.change_function();
  }
  _handleOnSubmit(e) {
    this.props.submit_function();
  }
  render() {
    return (
      <Footer>
        <Input onChange={ this._handleOnChange.bind(this) } type="text" />
        <SubmitButton onClick={ this.props.click_function }>Comment</SubmitButton>
      </Footer>
    )
  }
};
