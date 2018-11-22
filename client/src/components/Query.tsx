import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';

import { server } from '@/utils';
import ensureArray from '@utils/ensureArray';
import { Result } from '@/types';
import renderQueries from '@utils/renderQueries';

interface State {
  simpleQueries?: string[];
  advancedQueries?: string[];
  simpleResults?: Result[];
  simpleErrors?: any[];
  advancedResults?: Result[];
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

  public handleExecuteSimple = () => {
    server
      .post(SIMPLE_QUERY_ROUTE)
      .then(results => this.setState({ simpleResults: ensureArray(results) }));
  };

  public handleExecuteAdvanced = () => {
    server
      .post(ADVANCED_QUERY_ROUTE)
      .then(results =>
        this.setState({ advancedResults: ensureArray(results) }),
      );
  };

  public render() {
    const {
      simpleQueries,
      advancedQueries,
      simpleResults,
      simpleErrors,
      advancedResults,
    } = this.state;
    return (
      <Container>
        <h1>Query</h1>
        <Container className="py-3">
          <h3>Simple Queries</h3>
          <Button color="danger" onClick={this.handleExecuteSimple}>
            Execute All
          </Button>
          {renderQueries(
            SIMPLE_QUERY_ROUTE,
            simpleQueries,
            simpleResults,
            simpleErrors,
          )}
        </Container>
        <Container className="py-3">
          <h3>Advanced Queries</h3>
          <Button color="danger" onClick={this.handleExecuteAdvanced}>
            Execute All
          </Button>
          {renderQueries(
            ADVANCED_QUERY_ROUTE,
            advancedQueries,
            advancedResults,
          )}
        </Container>
      </Container>
    );
  }
}
