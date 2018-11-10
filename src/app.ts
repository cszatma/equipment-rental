import express from 'express';
import bodyParser from 'body-parser';

import helloRoutes from './routes/hello';

const app = express();

app.use(bodyParser.json());

app.use('/', helloRoutes);

export default app;
