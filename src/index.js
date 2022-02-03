import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UiContextProvider } from './store/ui-context';
import { WatchListContextProvider } from './store/watchlist-context';

ReactDOM.render(
  <UiContextProvider>
    <WatchListContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WatchListContextProvider>
  </UiContextProvider>,
  document.getElementById('root')
);
