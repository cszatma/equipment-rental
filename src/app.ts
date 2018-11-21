if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import createRoutes from './routes/create';
import deleteRoutes from './routes/delete';
import populateRoutes from './routes/populate';
import queryRoutes from './routes/query';
import { handleErrors, handleOracleErrors } from './utils/errorHandlers';

const app = express();

app.use(bodyParser.json());

app.use('/api/create', createRoutes);
app.use('/api/delete', deleteRoutes);
app.use('/api/populate', populateRoutes);
app.use('/api/query', queryRoutes);

app.use(handleOracleErrors);
app.use(handleErrors);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Express will server up production assets from the client
  app.use(express.static(path.resolve(__dirname, 'client')));

  // Express will serve up the index.html file if it doesn't recognize the route
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });
}

export default app;
