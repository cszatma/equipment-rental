import oracledb, { IConnection, IExecuteReturn } from 'oracledb';

import oracleConfig from '../config/oracle';

const doRelease = (connection: IConnection) =>
  connection.close(err => {
    if (err) {
      console.error(err.message);
    }
  });

const single = (sql: string, commit?: boolean): Promise<IExecuteReturn> =>
  new Promise(async (resolve, reject) => {
    let connection: IConnection | undefined;

    try {
      connection = await oracledb.getConnection(oracleConfig);
      const result = await connection.execute(sql, [], {
        outFormat: oracledb.OBJECT,
      });
      resolve(result);

      if (commit) {
        await connection.commit();
      }
    } catch (err) {
      reject(err);
    } finally {
      if (connection) {
        doRelease(connection);
      }
    }
  });

const batch = (
  sqlStatements: string[],
  commit?: boolean,
): Promise<IExecuteReturn[]> =>
  new Promise(async (resolve, reject) => {
    let connection: IConnection | undefined;

    try {
      connection = await oracledb.getConnection(oracleConfig);
      const executionPromises = sqlStatements.map(sql =>
        connection!.execute(sql, [], { outFormat: oracledb.OBJECT }),
      );
      // @ts-ignore
      const results = await Promise.all(executionPromises);
      resolve(results);

      if (commit) {
        await connection.commit();
      }
    } catch (err) {
      reject(err);
    } finally {
      if (connection) {
        doRelease(connection);
      }
    }
  });

export default { single, batch };
