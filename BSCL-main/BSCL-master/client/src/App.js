import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import './index.css';

import { useAuth } from './hooks/use-auth';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Verify from './pages/Verify';

const App = () => {
  const auth = useAuth();

  if (auth.state === null)
    return (
      <main className="flex flex-row justify-center p-24">
        <PuffLoader size={75} color="#059669" />
      </main>
    );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/verify" component={Verify} />
        <PrivateRoute path="/" redirectTo="/verify" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
