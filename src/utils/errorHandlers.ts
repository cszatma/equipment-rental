import { Request, Response, NextFunction, RequestHandler } from 'express';

const oracleErrors = {
  TABLE_EXISTS: 955,
  TABLE_DOES_NOT_EXIST: 942,
};

export const catchErrors = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => fn(req, res, next).catch(next);

export const handleOracleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err.errorNum) {
    return next(err);
  }

  switch (err.errorNum) {
    case oracleErrors.TABLE_EXISTS:
      res.status(550);
      res.statusMessage = 'Table already exists';
      break;
    case oracleErrors.TABLE_DOES_NOT_EXIST:
      res.status(551);
      res.statusMessage = 'Table does not exist';
      break;
    default:
      return next(err);
  }

  res.json({ error: err });
};

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => res.status(500).json({ error: err });
