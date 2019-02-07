import React, { Component } from 'react';


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
      content: this.state.current_text,
    }
    const request_body = JSON.stringify(data);

    fetch( this.props.create_comment_url, {
      method: 'POST',
      body: request_body,
      credentials: 'include'
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // this.setState({comments:[...this.state.comments, result]});
        },
        (error) => {
          console.log('create comment error');
        }
      );
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.current_text} onChange={this.handleInputChange} />
        <button type="button">Comment</button>
      </div>
    );
  }
}
