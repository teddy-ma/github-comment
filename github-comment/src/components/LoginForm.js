import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCurrent, saveTodo} from '../reducers/todo';


class LoginForm extends Component {
  handleInputChange = (evt) => {
    const val = evt.target.value
    this.props.updateCurrent(val)
  }

  render() {
    console.log('Rendering Login Form')
    const {currentTodo} = this.props

    return (
      <form action={this.props.action_url}>
        <input type="submit" />
      </form>
    )
  }

}

export default connect(
  (state) => ({action_url: state.meta.login_url})
)(LoginForm)
