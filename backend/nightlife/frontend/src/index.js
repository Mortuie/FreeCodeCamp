import React from 'react';
import ReactDOM from 'react-dom';
import { UserStore } from './Stores';
import { TwitterLogin } from './User';
import DevTools from 'mobx-react-devtools';

const ObservableUserStore = new UserStore();

if ('geolocation' in navigator) {
  /* geolocation is available */
  console.log('Geolocation is here!');
  navigator.geolocation.getCurrentPosition(function(position) {
    const { latitude, longitude } = position.coords;
    ObservableUserStore.setCoords(latitude, longitude);

    ReactDOM.render(
      <div>
        <DevTools />
        <TwitterLogin store={ObservableUserStore} />
      </div>,
      document.getElementById('root')
    );
  });
} else {
  /* geolocation IS NOT available */
  console.log('Geolocation is not here!');
  ReactDOM.render(
    <div>Your browser doesn't support geolocation.</div>,
    document.getElementById('root')
  );
}
