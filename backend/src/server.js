import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectMongoDB from './config/db.js';
import habitRoutes from './routes/habitRoutes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/habit', habitRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running..',
  });
});

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error(`Server connection failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
