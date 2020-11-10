import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router} from "react-router-dom";
import {UserStore} from "./stores";
import {Provider} from 'mobx-react';

const stores = {
    UserStore,
};

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
