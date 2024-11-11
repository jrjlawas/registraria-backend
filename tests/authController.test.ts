import request from 'supertest';
import app from '../src/server'; // Adjust the path if necessary
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import bcrypt from 'bcryptjs';

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;

beforeAll(async () => {
  await mongoose.connect(mongoURI, {});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication', () => {
//   beforeEach(async () => {
//     // Clear the users collection before each test
//     await User.deleteMany({});
//   });

  it('should login a user with valid credentials', async () => {
    //Create a test user
    // const newUser = new User({
    //   username: 'testuser',
    //   password: await bcrypt.hash('testpassword', 10),
    //   firstName: 'SampleJay';
    //   middleName: ;
    //   lastName: string;
    //   usertype: string;
    //   enabledStatus : string
    // });
    //await newUser.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin',
      });
    console.log(res.body.message);
    expect(res.status).toBe(200);
    expect(res.body.username).toBeDefined();
  });

  it('should return 400 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistentuser',
        password: 'wrongpassword',
      });
    
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
