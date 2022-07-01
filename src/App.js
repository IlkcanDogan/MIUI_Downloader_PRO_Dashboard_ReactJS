import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './core/auth';
import PrivateRoute from './core/private.route';
import PublicRoute from './core/public.route';
import Pages from './pages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {Pages.public.map((page, index) => { return (<PublicRoute key={index} exact {...page} />) })}
          {Pages.private.map((page, index) => { return (<PrivateRoute key={index} exact {...page} />) })}
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;