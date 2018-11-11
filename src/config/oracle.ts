import { IConnectionAttributes } from 'oracledb';

if (!process.env.ORACLE_CONNECT_STRING) {
  throw new Error('ORACLE_CONNECT_STRING is undefined');
}

const config: IConnectionAttributes = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING,
};

export default config;
