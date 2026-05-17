import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectMongoDB}  from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import { errors } from 'celebrate';

dotenv.config();
const PORT = process.env.PORT || 3000;

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.use('/notes', notesRouter);

  app.use(notFoundHandler);

  app.use(errors());

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

await connectMongoDB();
setupServer();
