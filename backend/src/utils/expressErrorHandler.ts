import express from 'express';

type ExpressErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

function createExpressErrorHandler(fn: ExpressErrorHandler) {
  return fn;
}

export default createExpressErrorHandler;
