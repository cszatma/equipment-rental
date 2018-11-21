import React, { Component } from 'react';
import { Alert, Container } from 'reactstrap';

import server from '@utils/server';
import SqlText from '@components/SqlText';

interface Props {
  sql: string;
  route: string;
  successMsg: string;
}

interface State {
  result?: object;
  error?: any;
}

export default class SqlContainer extends Component<Props, State> {
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

    return <Alert color="primary">{this.props.successMsg}</Alert>;
  }

  public render() {
    return (
      <Container>
        <SqlText sql={this.props.sql} onExecute={this.handleExecute} />
        {this.renderResult()}
      </Container>
    );
  }
}
