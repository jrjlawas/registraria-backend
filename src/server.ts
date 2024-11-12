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


app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', 'https://production.dgf531cc17jnd.amplifyapp.com');
  response.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  response.header('Access-Control-Allow-Credentials', 'true');
  next();
});



export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


