import React, {Component} from 'react';
import {connect} from 'react-redux';


class LoginForm extends Component {
  handleInputChange = (evt) => {
    const val = evt.target.value
    this.props.updateCurrent(val)
  }

  render() {
    const {currentTodo} = this.props
    return (
      <a href={this.props.login_url}>login via GitHub</a>
    )
  }

}

export default connect(
  (state) => ({action_url: state.meta.login_url})
)(LoginForm)
