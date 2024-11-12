import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

const corsOptions = {
  origin: 'https://production.dgf531cc17jnd.amplifyapp.com',  // Replace with your actual front-end domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Add other methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'],  // Include necessary headers
  credentials: true,
};


dotenv.config();
connectDB();

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);



export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


