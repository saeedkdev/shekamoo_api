import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes/routes';
// cors
import cors from 'cors';

// allow all origins
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

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
