// import { runWithAdal } from 'react-adal';
// import { authContext } from './components/utils';

// const DO_NOT_LOGIN = false;

// runWithAdal(authContext, () => {

//   // eslint-disable-next-line
//   require('./indexApp.js');

// }, DO_NOT_LOGIN);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <App />, document.getElementById('root'));

serviceWorker.unregister();
