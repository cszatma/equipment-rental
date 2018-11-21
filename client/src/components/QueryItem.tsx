import React, { Component } from 'react';

import { Result } from '@/types';
import { Alert, Container } from 'reactstrap';
import SqlText from '@components/SqlText';
import { server } from '@/utils';
import ResultTable from '@components/ResultTable';

interface Props {
  query: string;
  route: string;
}

interface State {
  result?: Result;
  error?: any;
}

export default class QueryItem extends Component<Props, State> {
  public state: Readonly<State> = {
    result: undefined,
  };

  public handleExecute = () => {
    server
      .post(this.props.route)
      .then(result => {
        if (Array.isArray(result)) {
          throw new TypeError(
            'Result is an array but it should be a single result.',
          );
        }
        this.setState({ result });
      })
      .catch(error => this.setState({ error }));
  };

  public renderResult() {
    const { result, error } = this.state;
    if (error) {
      return <Alert color="danger">{error.error.message}</Alert>;
    }

    if (!result) {
      return null;
    }

    return <ResultTable result={result} />;
  }

  public render() {
    return (
      <Container>
        <SqlText sql={this.props.query} onExecute={this.handleExecute} />
        {this.renderResult()}
      </Container>
    );
  }
}
