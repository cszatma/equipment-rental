import express, { Request, Response } from 'express';

import createTables from '../sql/createTables';
import createViews from '../sql/createViews';
import executeSql from '../utils/executeSql';
import { catchErrors } from '../utils/errorHandlers';
import formatResult from '../utils/formatResult';

const router = express.Router();

// Handle creating tables
router.get('/tables', (req: Request, res: Response) => {
  res.json(createTables);
});

router.get('/tables/:index', (req: Request, res: Response) => {
  res.json(createTables[req.params.index]);
});

router.post(
  '/tables',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(createTables);
    res.json(results.map(formatResult));
  }),
);

router.post(
  '/tables/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(createTables[req.params.index]);
    res.json(formatResult(result));
  }),
);

// Handle creating views
router.get('/views', (req: Request, res: Response) => {
  res.json(createViews);
});

router.get('/views/:index', (req: Request, res: Response) => {
  res.json(createViews[req.params.index]);
});

router.post(
  '/views',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(createViews);
    res.json(results.map(formatResult));
  }),
);

router.post(
  '/views/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(createViews[req.params.index]);
    res.json(formatResult(result));
  }),
);

export default router;
