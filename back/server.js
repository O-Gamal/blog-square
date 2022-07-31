import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('API is running ...');
});

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
