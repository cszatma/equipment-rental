import React, { FunctionComponent } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import '@styles/App.scss';
import Menu from './Menu';
import Create from './Create';
import Delete from './Delete';
import Populate from './Populate';
import Query from './Query';
import Navbar from '@components/Navbar';

const redirectToMenu = () => <Redirect to="/" />;

const App: FunctionComponent = () => (
  <BrowserRouter>
    <Container className="d-flex">
      <Navbar items={['menu', 'create', 'delete', 'populate', 'query']} />
      <Route exact path="/" component={Menu} />
      <Route path="/create" component={Create} />
      <Route path="/delete" component={Delete} />
      <Route path="/populate" component={Populate} />
      <Route path="/query" component={Query} />
      <Route path="/menu" render={redirectToMenu} />
    </Container>
  </BrowserRouter>
);

export default App;
