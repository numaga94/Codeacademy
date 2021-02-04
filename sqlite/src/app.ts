import express, { Application, Response, Request, NextFunction } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ person: { name: 'Hello', age: 20, sex: 'male' } });
});

const PORT: number | string = process.env.PORT || 4000;

app.listen(PORT, () => {
  `Server is listening on port ${PORT}`;
});
