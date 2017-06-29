import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components';

import Intro from './Intro';
import Main from './Main';

class App extends Component {
  state = {
    image: null,
  }

  handleImageChange = (image) => {
    this.setState({ image })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Intro} />
          <Route path="/create" component={Main} />
        </div>
      </Router>
    );
  }
}

export default App;
