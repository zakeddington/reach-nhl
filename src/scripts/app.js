import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './containers/App';

import * as reducers from './store/reducers';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
// import reducer from './store/games/reducer';
// const store = createStore(reducer, applyMiddleware(thunk));

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false }); // turn off query params at end of hash url

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);
