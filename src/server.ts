import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

