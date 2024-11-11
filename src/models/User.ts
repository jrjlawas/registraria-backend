import mongoose, { Document, Schema } from 'mongoose';

interface User extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  usertype: string;
  enabledStatus : string;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  usertype: { type: String, required: true },
  enabledStatus: { type: String, required: true }
});

const UserModel = mongoose.model<User>('User', userSchema,'users');
export default UserModel;
