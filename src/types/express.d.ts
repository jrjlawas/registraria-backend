import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; // You can adjust the type according to your needs
    }
  }
}
