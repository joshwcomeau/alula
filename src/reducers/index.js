import {combineReducers} from 'redux';
import { routerReducer as router } from 'react-router-redux'

import image from './image.reducer';
import history from './history.reducer';
import modal from './modal.reducer';


export default combineReducers({ image, history, modal, router });
