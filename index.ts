import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes/routes';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

const dbUrl: string = process.env.DATABASE_URL || '';

const database = mongoose.connect(dbUrl);

database.then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/api', router);
