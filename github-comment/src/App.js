import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './components/Message';
import CommentList from './components/CommentList';
import CommentFooter from './components/CommentFooter';
import {
  Card,
  Box,
  BackgroundImage,
  Subhead,
  Small,
  Input,
  Button
} from 'rebass'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Message />
        <CommentList />
        <CommentFooter />
        <Card width={256}>
        	<Box p={2}>
        		<Subhead>Card</Subhead>
        		<Small>Small meta text</Small>
        	</Box>
        </Card>
        <Input
        	defaultValue='Hello'
        	placeholder='Input'
        />
        <Button
        	children='Hello'
        />
      </div>
    );
  }
}

export default App;
