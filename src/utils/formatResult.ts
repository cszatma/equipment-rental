import { IExecuteReturn } from 'oracledb';

interface Result {
  columnNames: string[];
  rows: any[][];
}

export default (dbResult: IExecuteReturn): Result => {
  if (!dbResult.metaData || !dbResult.rows) {
    throw new Error('Result data is missing.');
  }

  const columnNames = dbResult.metaData.map(data => data.name);
  return { columnNames, rows: dbResult.rows };
};
