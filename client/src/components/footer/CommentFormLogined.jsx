import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../../styles/Footer';
import Input from '../../styles/Input';
import SubmitButton from '../../styles/SubmitButton';

export default class CommentFormLogined extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnChange(e) {
    this.setState({value: e.target.value});
  }
  _handleOnSubmit(e) {
    this.props.submit_function(this.props.create_comment_url,
                               this.state.value, this.props.user_name,
                               this.props.repo, this.props.page_id);
  }
  render() {
    return (
      <Footer>
        <Input onChange={ this._handleOnChange.bind(this) } type="text" />
        <SubmitButton onClick={ this._handleOnSubmit.bind(this) }>Comment</SubmitButton>
      </Footer>
    )
  }
};
