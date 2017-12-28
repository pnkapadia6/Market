import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainApp from './components/Page';
import items from './reducers';
import './index.scss';

const store = createStore(items, {});

ReactDOM.render(
 	<Provider store={store}>
    	<MainApp />
  	</Provider>,
  	document.getElementById('root')
);
