import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import styled from 'styled-components';
import createHistory from 'history/createBrowserHistory'

import configureStore from '../store';

import Intro from './Intro';
import Main from './Main';
import DevTools from './DevTools';


const history = createHistory();

const store = configureStore(history);

class App extends Component {
  state = {
    image: null,
  }

  handleImageChange = (image) => {
    this.setState({ image })
  }

  render() {
    console.log('Render app')
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact path="/" component={Intro} />
            <Route path="/create" component={Main} />

            <DevTools />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
