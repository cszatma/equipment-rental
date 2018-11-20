import express, { Request, Response } from 'express';

import dropTables from '../sql/dropTables';
import executeSql from '../utils/executeSql';
import { catchErrors } from '../utils/errorHandlers';
import formatResult from '../utils/formatResult';

const router = express.Router();

// Handle dropping tables
router.get('/tables', (req: Request, res: Response) => {
  res.json(dropTables);
});

router.get('/tables/:index', (req: Request, res: Response) => {
  res.json(dropTables[req.params.index]);
});

router.post(
  '/tables',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(dropTables);
    res.json(results.map(formatResult));
  }),
);

router.post(
  '/tables/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(dropTables[req.params.index]);
    res.json(formatResult(result));
  }),
);

export default router;
