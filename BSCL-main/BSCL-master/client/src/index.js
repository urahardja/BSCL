import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { initializeApp } from 'firebase/app';

import { ProvideAuth } from './hooks/use-auth';
import { ProvideSidebar } from './hooks/use-sidebar';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyDDr1wgcA_ouy0d1YwsEDi-UheuFQbjaPk',
  authDomain: 'blockchain-data-storage.firebaseapp.com',
  projectId: 'blockchain-data-storage',
  storageBucket: 'blockchain-data-storage.appspot.com',
  messagingSenderId: '767061332769',
  appId: '1:767061332769:web:9fde9443c16152eb44e460',
  measurementId: 'G-V3ZH6C0F61'
};
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <ProvideSidebar>
        <App />
      </ProvideSidebar>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
