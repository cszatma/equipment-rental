import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { server } from '@/utils';
import { Optional } from '@/types';
import getResultsArray from '@utils/ensureArray';
import QueryItem from '@components/QueryItem';

interface State {
  simpleQueries: Optional<string[]>;
  advancedQueries: Optional<string[]>;
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
      .then(results =>
        this.setState({ simpleQueries: getResultsArray(results) }),
      );

    server
      .get(ADVANCED_QUERY_ROUTE)
      .then(results =>
        this.setState({ advancedQueries: getResultsArray(results) }),
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
        <h3>Simple Queries</h3>
        {this.renderQueries(SIMPLE_QUERY_ROUTE, simpleQueries)}
        <h3>Advanced Queries</h3>
        {this.renderQueries(ADVANCED_QUERY_ROUTE, advancedQueries)}
      </Container>
    );
  }
}
