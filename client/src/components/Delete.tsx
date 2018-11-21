import React, { Component } from 'react';
import { Container } from 'reactstrap';

import server from '@utils/server';
import ensureArray from '@utils/ensureArray';
import renderSql from '@utils/renderSql';

const BASE_ROUTE = '/delete';
const TABLES_ROUTE = `${BASE_ROUTE}/tables`;

interface State {
  deleteTables?: string[];
}

export default class MainMenu extends Component<{}, State> {
  public state: Readonly<State> = {
    deleteTables: undefined,
  };

  public componentDidMount() {
    server
      .get(TABLES_ROUTE)
      .then(results => this.setState({ deleteTables: ensureArray(results) }));
  }

  public render() {
    return (
      <Container>
        <h1>Delete</h1>
        <Container className="py-3">
          <h3>Delete Tables</h3>
          {renderSql(TABLES_ROUTE, 'Table Dropped.', this.state.deleteTables)}
        </Container>
      </Container>
    );
  }
}
