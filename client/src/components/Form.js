import React, { Component } from 'react';
import InputArea from '../styles/InputArea.js'
import SharpButton from '../styles/SharpButton.js'


class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {current_text: ''};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (evt) => {
    const val = evt.target.value
    this.setState({
      current_text: val
    });
  }

  handleClick = (evt) => {
    const data = {
      body: this.state.current_text,
      repo: this.props.config.repo,
      page_id: this.props.config.page_id,
      user_name: this.props.config.user_name
    }
    const request_body = JSON.stringify(data);

    fetch( this.props.create_comment_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: request_body,
      credentials: 'include'
    }).then(res => res.json())
      .then(
        (result) => {
          this.props.append_comment(result.body);
          this.setState({current_text: ''});
        },
        (error) => {
          console.log('create comment error');
        }
      );
  }

  render() {
    return (
      <div>
        <InputArea type="text" value={this.state.current_text} onChange={this.handleInputChange} />
        <SharpButton type="button" onClick={this.handleClick}>Comment</SharpButton>
      </div>
    );
  }
}

export default Form;
