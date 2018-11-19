import express, { Request, Response } from 'express';

import populateTables from '../sql/populateTables';
import executeSql from '../utils/executeSql';
import { catchErrors } from '../utils/errorHandlers';

const router = express.Router();

// Handle populating the tables
router.get('/', (req: Request, res: Response) => {
  res.json(populateTables);
});

router.get('/:index', (req: Request, res: Response) => {
  res.json(populateTables[req.params.index]);
});

router.post(
  '/',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(populateTables);
    res.json(results);
  }),
);

router.post(
  '/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(populateTables[req.params.index]);
    res.json(result);
  }),
);

export default router;
