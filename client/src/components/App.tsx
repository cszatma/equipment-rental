import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';

import '@styles/App.scss';
import MainMenu from './MainMenu';
import Create from './Create';
import Delete from './Delete';
import Populate from './Populate';
import Query from './Query';

import { BrowserRouter, Redirect, Route } from 'react-router-dom';

const redirectToMenu = () => <Redirect to="/" />;

const App: FunctionComponent = () => (
  <BrowserRouter>
    <Container>
      <Route exact path="/" component={MainMenu} />
      <Route path="/create" component={Create} />
      <Route path="/delete" component={Delete} />
      <Route path="/populate" component={Populate} />
      <Route path="/query" component={Query} />
      <Route path="/mainmenu" render={redirectToMenu} />
    </Container>
  </BrowserRouter>
);

export default App;
