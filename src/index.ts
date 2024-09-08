import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import apiRouter from './routes/api';
import botRouter from './routes/bot';

dotenv.config();

AppDataSource.initialize().then(async () => {
  const app = express();
  const PORT = process.env.SERVER_PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/bot', botRouter);
  app.use('/api', apiRouter);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' });
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}).catch((error) => console.log(error));
