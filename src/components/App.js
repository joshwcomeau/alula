import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter } from 'react-router-redux'
import configureStore from '../store';

import Intro from './Intro';
import Main from './Main';
import DevTools from './DevTools';
import {FullHeight} from './utility-components';


const history = createHistory();

const store = configureStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <FullHeight>
            <Route exact path="/" component={Intro} />
            <Route path="/create" component={Main} />

            <DevTools />
          </FullHeight>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
