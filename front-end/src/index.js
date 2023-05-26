import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './componenets/root/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'alertifyjs/build/css/alertify.min.css'
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './redux/reducers/configureStore';

const store = configureStore();

const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
   <App />
  </Provider>
  </BrowserRouter>

   
  
);


