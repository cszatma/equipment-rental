import React, { Component } from 'react';
import server from '@utils/server';
import ensureArray from '@utils/ensureArray';
import { Container } from 'reactstrap';
import renderSql from '@utils/renderSql';

const BASE_ROUTE = '/populate';

interface State {
  populateTables?: string[];
}

export default class Populate extends Component<{}, State> {
  public state: Readonly<State> = {
    populateTables: undefined,
  };

  public componentDidMount() {
    server
      .get(BASE_ROUTE)
      .then(results => this.setState({ populateTables: ensureArray(results) }));
  }

  public render() {
    return (
      <Container>
        <h1>Delete</h1>
        <Container className="py-3">
          <h3>Delete Tables</h3>
          {renderSql(BASE_ROUTE, 'Row Inserted.', this.state.populateTables)}
        </Container>
      </Container>
    );
  }
}
