import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ratelimit from 'express-rate-limit';
import compression from 'compression';
import errorhandler from 'errorhandler';
import 'dotenv/config';

// import api router
import apiRouter from './api/api';

const app: Application = express();

// custom rate limit settings
const limiter = ratelimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 // 5 requests,
});

// use middleware
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(errorhandler());

// mount apiRoute
app.use('/', apiRouter);

// port of server
const PORT: number = Number(process.env.PORT);

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
