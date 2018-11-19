import express, { Request, Response } from 'express';

import createTables from '../sql/createTables';
import createViews from '../sql/createViews';
import executeSql from '../utils/executeSql';
import { catchErrors } from '../utils/errorHandlers';

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
    res.json(results);
  }),
);

router.post(
  '/tables/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(createTables[req.params.index]);
    res.json(result);
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
    res.json(results);
  }),
);

router.post(
  '/views/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(createViews[req.params.index]);
    res.json(result);
  }),
);

export default router;
