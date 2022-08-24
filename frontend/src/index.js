import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import {
  BrowserRouter,
} from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  position: positions.TOP_CENTER,
  timeout: 50000,
  offset: '30px',
  transition: transitions.SCALE,
  zIndex: 10000
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


