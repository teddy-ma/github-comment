import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommentForm from './CommentForm';
import LoginForm from './LoginForm';
import {fetchAuth} from '../reducers/app';
import Footer from '../styles/Footer';



class CommentFooter extends Component {
  componentDidMount(){
    this.props.fetchAuth(this.props.auth_url)
  }
  render() {
    const content = this.props.is_login
                      ? <CommentForm />
                      : <LoginForm login_url={this.props.login_url}/>
    return (
      <Footer>
        {content}
      </Footer>
    )
  }
}



export default connect(
  (state) => ({is_login: state.meta.is_login, auth_url: state.meta.auth_url, login_url: state.meta.login_url}),
  {fetchAuth}
)(CommentFooter)