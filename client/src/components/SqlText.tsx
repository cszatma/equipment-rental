import React, { FunctionComponent } from 'react';
import { Row, Button } from 'reactstrap';

interface Props {
  sql: string;
  onExecute: () => void;
}

const SqlText: FunctionComponent<Props> = ({ sql, onExecute }) => (
  <Row className="py-2">
    <p>{sql}</p>
    <div className="w-100" />
    <Button color="primary" onClick={onExecute}>
      Execute
    </Button>
  </Row>
);

export default SqlText;
