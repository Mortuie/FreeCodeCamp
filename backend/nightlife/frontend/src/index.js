import React from 'react';
import ReactDOM from 'react-dom';
import { UserStore } from './Stores';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { Routes } from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

const ObservableUserStore = new UserStore();

if ('geolocation' in navigator) {
  console.log('Geolocation is here!');
  navigator.geolocation.getCurrentPosition(function(position) {
    const { latitude, longitude } = position.coords;
    ObservableUserStore.setCoords(latitude, longitude);
    // ObservableUserStore.getCity();

    ReactDOM.render(
      <Provider userStore={ObservableUserStore}>
        <Router>
          <div>
            <DevTools />
            <Routes />
          </div>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });
  // <TwitterLogin />
} else {
  console.log('Geolocation is not here!');
  ReactDOM.render(
    <div>Your browser doesn't support geolocation.</div>,
    document.getElementById('root')
  );
}
