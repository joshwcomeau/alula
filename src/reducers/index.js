import {combineReducers} from 'redux';
import { routerReducer as router } from 'react-router-redux'

import image from './image.reducer';
import history from './history.reducer';


export default combineReducers({ image, history, router });
