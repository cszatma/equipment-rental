import React, { FunctionComponent } from 'react';
import { Table } from 'reactstrap';

import { Result } from '@/types';

interface Props {
  result: Result;
}

const ResultTable: FunctionComponent<Props> = ({ result }) => (
  <Table striped bordered>
    <thead>
      <tr>
        <th>#</th>
        {result.columnNames.map(column => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {result.rows.map((row, i) => (
        <tr key={i}>
          <th scope="row">{i}</th>
          {row.map((column, j) => (
            <td key={result.columnNames[j]}>{column}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ResultTable;
