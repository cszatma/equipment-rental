import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { server } from '@/utils';
import ensureArray from '@utils/ensureArray';
import QueryItem from '@components/QueryItem';

interface State {
  simpleQueries?: string[];
  advancedQueries?: string[];
}

const BASE_ROUTE = '/query';
const SIMPLE_QUERY_ROUTE = `${BASE_ROUTE}/simple`;
const ADVANCED_QUERY_ROUTE = `${BASE_ROUTE}/advanced`;

export default class Query extends Component<{}, State> {
  public state: Readonly<State> = {
    simpleQueries: undefined,
    advancedQueries: undefined,
  };

  public componentDidMount() {
    server
      .get(SIMPLE_QUERY_ROUTE)
      .then(results => this.setState({ simpleQueries: ensureArray(results) }));

    server
      .get(ADVANCED_QUERY_ROUTE)
      .then(results =>
        this.setState({ advancedQueries: ensureArray(results) }),
      );
  }

  public renderQueries(route: string, queries?: string[]) {
    if (!queries) {
      return null;
    }

    return queries.map((query, i) => (
      <QueryItem
        key={query}
        query={query}
        route={`${SIMPLE_QUERY_ROUTE}/${i}`}
      />
    ));
  }

  public render() {
    const { simpleQueries, advancedQueries } = this.state;
    return (
      <Container>
        <h1>Query</h1>
        <Container className="py-3">
          <h3>Simple Queries</h3>
          {this.renderQueries(SIMPLE_QUERY_ROUTE, simpleQueries)}
        </Container>
        <Container className="py-3">
          <h3>Advanced Queries</h3>
          {this.renderQueries(ADVANCED_QUERY_ROUTE, advancedQueries)}
        </Container>
      </Container>
    );
  }
}
