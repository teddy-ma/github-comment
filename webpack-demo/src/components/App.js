import styles from './App.css';

import React, { Component } from 'react';

import Logo from './0-Logo/Logo';
import ScopedSelectorsDemo from './1-ScopedSelectors/ScopedSelectorsDemo';

export default class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <Logo />

        <ScopedSelectorsDemo />
    );
  }

};
