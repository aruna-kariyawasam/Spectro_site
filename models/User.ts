import mongoose, { Schema, Document, models } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'user' | 'researcher'
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'researcher'], required: true },
  studentId: { type: String, required: false },
})

export default models.User || mongoose.model<IUser>('User', UserSchema)
