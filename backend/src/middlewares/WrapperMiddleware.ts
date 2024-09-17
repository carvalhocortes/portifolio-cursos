import { Request, Response } from 'express';

// const showLogs = process.env.SHOW_LOGS === 'true'

export default (fn: Function, httpCode = 200) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await fn(req, res);
      return res.status(httpCode).send(response);
    } catch (error) {
      if (process.env.SHOW_LOGS === 'true') console.error(error)
      if (error.httpCode) {
        return res.status(error.httpCode).send(error);
      }
      return res.status(500).send({ message: 'Internal server error!' });
    }
  };
}
