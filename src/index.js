import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import App from './App';
import Store from './store/Store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()


ReactDOM.render(
    <Provider store={Store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event has fired')
    e.prompt()
});
