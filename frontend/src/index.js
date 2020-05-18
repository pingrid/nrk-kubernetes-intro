import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import create from './redux/store';
import {Provider} from 'react-redux';
const store = create();

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>), document.getElementById('app'));


if (module.hot) {
    module.hot.accept();
}

