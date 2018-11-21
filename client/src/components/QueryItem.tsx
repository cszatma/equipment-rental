import React, { Component } from 'react';

import { Result, Optional } from '@/types';
import { Container } from 'reactstrap';
import SqlText from '@components/SqlText';
import { server } from '@/utils';
import ResultTable from '@components/ResultTable';

interface Props {
  query: string;
  route: string;
}

interface State {
  result: Optional<Result>;
}

export default class QueryItem extends Component<Props, State> {
  public state: Readonly<State> = {
    result: undefined,
  };

  public handleExecute = () => {
    server.post(this.props.route).then(result => {
      if (Array.isArray(result)) {
        throw new TypeError(
          'Result is an array but it should be a single result.',
        );
      }
      this.setState({ result });
    });
  };

  public render() {
    return (
      <Container>
        <SqlText sql={this.props.query} onExecute={this.handleExecute} />
        {this.state.result ? <ResultTable result={this.state.result} /> : null}
      </Container>
    );
  }
}
