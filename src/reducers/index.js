import {combineReducers} from 'redux';
import { routerReducer as router } from 'react-router-redux'

import image from './image.reducer';


export default combineReducers({ image, router });
