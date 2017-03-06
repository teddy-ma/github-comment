import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../styles/Footer';
import CommentSubmit from './CommentSubmit';
import CommentLogin from './CommentLogin';


export default class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnClick(e) {
    const itemText = this.state.value;
    this.props.createComment(itemText);
    this.setState({value: ''});
  }
  _handleOnChange(e) {
    this.setState({value: e.target.value});
  }
  _handleOnFocus(e) {
    this.props.authRequest();
  }
  render() {
    return (
      <Footer>
        <input className="new-comment"
               onChange={ this._handleOnChange.bind(this) }
               onFocus={ this._handleOnFocus.bind(this) }
               type="text" />
        {
          this.props.login.get('auth') ?
          <CommentSubmit click_function={ this._handleOnClick.bind(this) } />
          :
          <CommentLogin url={this.props.login.get('url')} />
        }
      </Footer>
    )
  }
};
