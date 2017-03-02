import React from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './LoginButton';
import SubmitButton from './SubmitButton';


export default class CommentFooter extends React.Component {
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
      <footer>
        <input className="new-comment"
               onChange={ this._handleOnChange.bind(this) }
               onFocus={ this._handleOnFocus.bind(this) }
               type="text" />
        {
          this.props.login.get('auth') ?
          <SubmitButton callback={ this._handleOnClick(this) } />
          :
          <LoginButton url={this.props.login.get('url')} />
        }
      </footer>
    )
  }
};
