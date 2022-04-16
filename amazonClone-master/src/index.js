import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reducer, { initialState } from './StateProvider/Reducer';

import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider/StateProvider';


import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      {reducer}
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
