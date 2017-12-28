import { combineReducers } from 'redux';
import market from './market';

const mainApp = combineReducers({ 
	market
});

export default mainApp;
