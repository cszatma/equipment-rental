import React, { Component } from 'react';
import { Container } from 'reactstrap';

import server from '@utils/server';
import ensureArray from '@utils/ensureArray';
import renderSql from '@utils/renderSql';

const BASE_ROUTE = '/create';
const TABLES_ROUTE = `${BASE_ROUTE}/tables`;

interface State {
  createTables?: string[];
}

export default class Create extends Component<{}, State> {
  public state: Readonly<State> = {
    createTables: undefined,
  };

  public componentDidMount() {
    server
      .get(TABLES_ROUTE)
      .then(results => this.setState({ createTables: ensureArray(results) }));
  }

  public render() {
    return (
      <Container>
        <h1>Create</h1>
        <Container className="py-3">
          <h3>Create Tables</h3>
          {renderSql(TABLES_ROUTE, 'Table Created.', this.state.createTables)}
        </Container>
      </Container>
    );
  }
}
