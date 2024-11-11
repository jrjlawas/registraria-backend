import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import { generateToken } from '../helpers/jwtHelper';

export const register = async (req: Request, res: Response) => {
  const { username, 
          password,
          firstName,
          middleName,
          lastName,
          usertype,
          enabledStatus
        } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, password: hashedPassword, firstName, middleName, lastName, usertype, enabledStatus });
    const token = generateToken(user._id.toString());
    console.log('User registered');
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token
    });
  } catch (error) {
    console.log('User registration failed');
    res.status(400).json({ message: 'User registration failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id.toString());
      res.status(200).json({
        _id: user._id,
        username: user.username,
        token: token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
      console.log('invalid credentials');
    }
  } catch (error) {
    console.log('login error');
    res.status(400).json({ message: 'Login failed', error });
  }
};
