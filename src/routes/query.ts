import express, { Request, Response } from 'express';

import simpleQueries from '../sql/simpleQueries';
import advancedQueries from '../sql/advancedQueries';
import executeSql from '../utils/executeSql';
import queryViews from '../sql/queryViews';
import { catchErrors } from '../utils/errorHandlers';

const router = express.Router();

// Handle simple queries
router.get('/simple', (req: Request, res: Response) => {
  res.json(simpleQueries);
});

router.get('/simple/:index', (req: Request, res: Response) => {
  res.json(simpleQueries[req.params.index]);
});

router.post(
  '/simple',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(simpleQueries);
    res.json(results.map(result => result.rows));
  }),
);

router.post(
  '/simple/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(simpleQueries[req.params.index]);
    res.json(result.rows);
  }),
);

// Handle advanced queries
router.get('/advanced', (req: Request, res: Response) => {
  res.json(advancedQueries);
});

router.get('/advanced/:index', (req: Request, res: Response) => {
  res.json(advancedQueries[req.params.index]);
});

router.post(
  '/advanced',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(advancedQueries);
    res.json(results.map(result => result.rows));
  }),
);

router.post(
  '/advanced/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(advancedQueries[req.params.index]);
    res.json(result.rows);
  }),
);

// Handle querying views
router.get('/views', (req: Request, res: Response) => {
  res.json(queryViews);
});

router.get('/views/:index', (req: Request, res: Response) => {
  res.json(queryViews[req.params.index]);
});

router.post(
  '/views',
  catchErrors(async (req: Request, res: Response) => {
    const results = await executeSql.batch(queryViews);
    res.json(results.map(result => result.rows));
  }),
);

router.post(
  '/views/:index',
  catchErrors(async (req: Request, res: Response) => {
    const result = await executeSql.single(queryViews[req.params.index]);
    res.json(result.rows);
  }),
);

export default router;
