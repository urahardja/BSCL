import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { useAuth } from '../../hooks/use-auth';
import Navbar from '../../layouts/Navbar';
import Sidebar from '../../layouts/Sidebar';
import Main from '../../layouts/Main';
import Profile from './Profile';
import Validate from './Validate';

const Home = () => {
  const auth = useAuth();

  const link = auth.role === 'admin' ? '/students' : '/profile';
  return <Redirect to={link} />;
};

const Dashboard = () => {
  document.body.classList.toggle('bg-gray-100', false);
  document.body.classList.toggle('bg-green-600', true);

  const auth = useAuth();

  return (
    <>
      <Sidebar />
      <Navbar />
      <Main>
        <Switch>
          {auth.role === 'admin' ? (
            <Route exact path="/students" component={Validate} />
          ) : (
            <Route exact path="/profile" component={Profile} />
          )}
          <Route exact path="/validate" component={Validate} />
          <Route path="/" component={Home} />
        </Switch>
      </Main>
    </>
  );
};

export default Dashboard;
