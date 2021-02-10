import express, { IRouter } from 'express';
import quoteRouter from './quotes';

const apiRouter: IRouter = express.Router();

// mount quote router
apiRouter.use('/api', quoteRouter);

export default apiRouter;
