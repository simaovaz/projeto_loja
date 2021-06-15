import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './signin';
import reportWebVitals from './reportWebVitals';
import Cenas from "./cena";

import reducer from "./reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer);


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
        <Cenas />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
